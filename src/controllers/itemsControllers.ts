import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
    res
      .status(200)
      .json({ status: 200, messege: "Success get all items data", data: items });
  } catch (error: any) {
    res.status(500).json({ status: 501, messege: error.messege });
  }
};
