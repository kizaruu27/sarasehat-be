import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllSupplier = async (req: Request, res: Response) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res
      .status(200)
      .json({ status: 200, messege: "Successfully get supplier data", data: suppliers });
  } catch (error) {
    res.status(500).json({ status: 500, messege: error });
  }
};
