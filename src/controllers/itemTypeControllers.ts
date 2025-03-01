import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllItemType = async (req: Request, res: Response) => {
  try {
    const itemTypes = await prisma.itemType.findMany({ orderBy: { id: "desc" } });
    res.status(200).json({
      status: 200,
      messege: "Successfully get all item types",
      total: itemTypes.length,
      data: itemTypes,
    });
  } catch (error) {
    res.status(500).json({ messege: error });
    console.log(error);
  }
};

export const createItemType = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;

    const newItemType = await prisma.itemType.create({ data: { type } });
    res
      .status(201)
      .json({
        status: 201,
        messege: "Successfully add new item type",
        data: newItemType,
      });
  } catch (error) {
    res.status(500).json({ messege: error });
    console.log(error);
  }
};

export const updateItemType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const itemType = await prisma.itemType.update({
      where: { id: Number(id) },
      data: { type },
    });

    res
      .status(200)
      .json({ status: 200, messege: "Successfully updated item type", data: itemType });
  } catch (error) {
    res.status(500).json({ messege: error });
    console.log(error);
  }
};

export const deleteItemType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const itemType = await prisma.itemType.delete({ where: { id: Number(id) } });

    res
      .status(200)
      .json({ status: 200, messege: "Successfully delete item type", data: itemType });
  } catch (error) {
    res.status(500).json({ messege: error });
    console.log(error);
  }
};
