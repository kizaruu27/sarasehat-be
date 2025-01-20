import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
    res
      .status(200)
      .json({ status: 200, messege: "Succesfully get all items", data: items });
  } catch (error: any) {
    res.status(500).json({ messege: error.messege });
  }
};
