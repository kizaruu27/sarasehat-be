import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    const newCategory = await prisma.itemCategory.create({
      data: {
        category,
      },
    });

    res.status(201).json({
      status: 201,
      messege: "Successfully create new category",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({ messege: error });
    console.log(error);
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.itemCategory.findMany({
      orderBy: { id: "desc" },
    });
    res.status(200).json({
      status: 200,
      messege: "Successfully get category list",
      total: category.length,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ messege: error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await prisma.itemCategory.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      status: 200,
      messege: "Successfully deleted category",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({ messege: error });
  }
};

export const updateCateogry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    const updatedCategory = await prisma.itemCategory.update({
      where: { id: Number(id) },
      data: { category },
    });

    res
      .status(200)
      .json({
        status: 200,
        messege: "Successfully update category name",
        data: updatedCategory,
      });
  } catch (error) {
    res.status(500).json({ messege: error });
  }
};
