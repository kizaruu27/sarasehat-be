import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { itemId, infoStockId, totalPrice, paymentTypeId, statusId } = req.body;
    const newTransaction = await prisma.transaction.create({
      data: { itemId, infoStockId, totalPrice, paymentTypeId, statusId },
    });

    res
      .status(201)
      .json({ status: 201, messege: "Transaction successfull!", data: newTransaction });
  } catch (error: any) {
    res.status(500).json({ messege: error.messege });
  }
};
