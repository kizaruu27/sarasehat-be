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

export const addNewItem = async (req: Request, res: Response) => {
  try {
    const {
      itemName,
      minStock,
      maxStock,
      currentStock,
      wacc,
      itemCategoryId,
      itemTypeId,
      supplierId,
    } = req.body;

    const sellingPrice = (wacc * 18) / 100;
    const itemCode = itemCategoryId === 1 ? 2211 : itemCategoryId === 2 ? 1122 : 5555;
    const newItem = await prisma.item.create({
      data: {
        itemName,
        itemCode,
        minStock: Number(minStock),
        maxStock: Number(maxStock),
        currentStock: Number(currentStock),
        wacc: Number(wacc),
        sellingPrice,
        itemCategoryId: Number(itemCategoryId),
        itemTypeId: Number(itemTypeId),
        supplierId: Number(supplierId),
      },
    });

    res
      .status(201)
      .json({ status: 201, messege: "New item created successfull", data: newItem });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ messege: error });
  }
};
