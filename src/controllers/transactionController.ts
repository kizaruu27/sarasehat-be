import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { paymentTypeId, statusId } = req.body;

    res.status(201);
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
