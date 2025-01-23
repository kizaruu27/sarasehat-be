import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { stat } from "fs";
const prisma = new PrismaClient();

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { paymentTypeId, statusId, cartIds } = req.body;

    const carts = await prisma.cart.findMany({
      where: {
        id: {
          in: cartIds,
        },
        statusId: 2,
      },
      select: {
        qty: true,
        item: true,
      },
    });

    if (!carts || carts.length === 0)
      res.status(404).json({ status: 404, messege: "Cart not found!" });

    // Calculate total price
    const cartsPrice = carts.map((data) => ({
      price: data.item ? data.qty * data.item?.sellingPrice : 0,
    }));
    const totalPrice = cartsPrice.reduce((total, cart) => total + cart.price, 0);

    // Create new transaction
    const newTransaction = await prisma.transaction.create({
      data: {
        totalPrice,
        paymentTypeId,
        statusId,
      },
    });

    // Assign carts to new transaction
    const updateCarts = await prisma.cart.updateMany({
      where: {
        id: {
          in: cartIds,
        },
      },
      data: {
        transactionId: newTransaction.id,
        statusId,
      },
    });

    // Update stock
    const updateStock = carts.map(async (data) => {
      if (data.item?.id) {
        const item = await prisma.item.findUnique({
          where: { id: data.item.id },
          select: { currentStock: true },
        });

        if (item) {
          return prisma.item.update({
            where: { id: data.item.id },
            data: {
              currentStock: {
                decrement: data.qty,
              },
              lastStock: item.currentStock,
            },
          });
        }
      }
      return null;
    });

    await Promise.all(updateStock.filter(Boolean));

    // Get new updated stock
    const newCarts = await prisma.cart.findMany({
      where: {
        id: {
          in: cartIds,
        },
      },
      select: {
        qty: true,
        item: true,
      },
    });
    const itemIds = newCarts.map((data) => (data.item ? data.item.id : 0));

    // Update info stock detail
    const updatedInfoStock = newCarts.map(async (data) => {
      if (data.item) {
        return prisma.infoStock.create({
          data: {
            itemId: data.item.id,
            startStock: data.item.lastStock,
            endStock: data.item.currentStock,
            startAmmount: data.item.lastStock * data.item.wacc,
            stockIn: 0,
            stockInAmmount: 0,
            stockOut: data.qty,
            stockOutAmmount: data.qty * data.item.wacc,
            stockTotal: data.item.currentStock,
            ammountTotal: data.item.currentStock * data.item.wacc,
          },
        });
      }
      return null;
    });

    await Promise.all(updatedInfoStock.filter(Boolean));

    // Show the updated item
    const updatedItem = await prisma.item.findMany({
      where: {
        id: {
          in: itemIds,
        },
      },
      select: {
        id: true,
        lastStock: true,
        currentStock: true,
        wacc: true,
        infoStock: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // Show new transaction data
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: newTransaction.id,
      },
      select: {
        id: true,
        totalPrice: true,
        createdAt: true,
        updatedAt: true,
        payment: {
          select: {
            type: true,
          },
        },
        status: {
          select: {
            status: true,
          },
        },
        carts: true,
      },
    });

    res.status(201).json({
      status: 201,
      messege: "Transaction Success!",
      transaction,
      updatedItem,
    });
    // .json({ status: 201, messege: "Transaction successfull!", data: newTransaction });
  } catch (error: any) {
    res.status(500).json({ messege: error.messege });
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const { qty, itemId } = req.body;

    const cart = await prisma.cart.create({
      data: {
        qty,
        statusId: 2,
        itemId,
      },
    });

    res
      .status(201)
      .json({ status: 201, messege: "Successfully add item to cart!", data: cart });
  } catch (error) {
    res.status(500).json({ messege: error });
  }
};

export const getAllCart = async (req: Request, res: Response) => {
  try {
    const carts = await prisma.cart.findMany({
      select: {
        id: true,
        qty: true,
        status: {
          select: {
            status: true,
          },
        },
        transaction: true,
        item: true,
      },
    });

    res
      .status(200)
      .json({ status: 200, messege: "Successfull get carts data", data: carts });
  } catch (error) {
    res.status(500).json({ messege: error });
  }
};
