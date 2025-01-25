import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const { itemCode, itemCategoryId, itemName } = req.query;

    let filters: any = {};
    if (itemCode) filters.itemCode = itemCode;
    if (itemCategoryId) filters.itemCategoryId = Number(itemCategoryId);
    if (itemName) filters.itemName = { contains: itemName, mode: "insensitive" };

    const itemsData = await prisma.item.findMany({
      where: filters,
      include: {
        infoStock: true,
        itemCategory: true,
        itemType: true,
        supplier: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const sanitizedItems = itemsData.map(
      ({ itemCategoryId, itemTypeId, supplierId, ...rest }) => rest
    );

    res.status(200).json({
      status: 200,
      messege: "Succesfully get all items",
      totalData: itemsData.length,
      data: sanitizedItems,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ messege: error.messege });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        itemName: true,
        itemCode: true,
        createdAt: true,
        updatedAt: true,
        minStock: true,
        maxStock: true,
        lastStock: true,
        currentStock: true,
        wacc: true,
        sellingPrice: true,
        itemCategory: {
          select: {
            category: true,
          },
        },
        itemType: {
          select: {
            type: true,
          },
        },
        supplier: {
          select: {
            supplierName: true,
          },
        },
        infoStock: true,
      },
    });

    if (item) {
      res
        .status(200)
        .json({ status: 200, messege: "Successfull get item data", data: item });
    } else {
      res.status(404).json({ status: 404, messege: "Data item not found" });
    }
  } catch (error: any) {
    res.status(500).json({ status: 500, messege: error });
  }
};

export const addNewItem = async (req: Request, res: Response) => {
  try {
    const {
      itemName,
      minStock,
      maxStock,
      stockIn,
      wacc,
      itemCategoryId,
      itemTypeId,
      supplierId,
      supplierName,
    } = req.body;

    // Validate current stock with min and max stock
    if (Number(stockIn) < Number(minStock)) {
      res
        .status(400)
        .json({ status: 400, messege: "Stock can't be lower than minimum stock" });
      return;
    }

    if (Number(stockIn) > Number(maxStock)) {
      res
        .status(400)
        .json({ status: 400, messege: "Stock can't be more than max stock" });
      return;
    }

    // Selling Price
    const percentage = 18 / 100;
    const sellingPrice = Number(wacc) * percentage;

    // Item Code
    const prefix = Number(itemCategoryId) === 1 ? "OBT" : "ALK";
    const lastItem = await prisma.item.findFirst({
      where: {
        itemCode: { startsWith: prefix },
      },
      orderBy: {
        itemCode: "desc",
      },
    });
    const nextNumber = lastItem ? parseInt(lastItem.itemCode.replace(prefix, "")) + 1 : 1;
    const itemCode = `${prefix}${nextNumber.toString().padStart(4, "0")}`;

    // Validate supplier
    const newSupplier = !supplierId
      ? await prisma.supplier.create({
          data: {
            supplierName,
          },
        })
      : undefined;

    // Create new item
    const postItem = await prisma.item.create({
      data: {
        itemName,
        itemCode,
        lastStock: 0,
        minStock: Number(minStock),
        maxStock: Number(maxStock),
        currentStock: Number(stockIn),
        wacc: Number(wacc),
        sellingPrice,
        itemCategoryId: Number(itemCategoryId),
        itemTypeId: Number(itemCategoryId) === 1 ? Number(itemTypeId) : null,
        supplierId: newSupplier ? newSupplier.id : Number(supplierId),
      },
    });

    // Create new info stock
    const postInfoStock = await prisma.infoStock.create({
      data: {
        itemId: postItem.id,
        startStock: 0,
        endStock: Number(stockIn),
        startAmmount: 0,
        stockIn: Number(stockIn),
        stockInAmmount: Number(stockIn) * Number(wacc),
        stockOut: 0,
        stockOutAmmount: 0,
        stockTotal: Number(stockIn),
        ammountTotal: Number(stockIn) * Number(wacc),
      },
    });

    const newItem = await prisma.item.findUnique({
      where: {
        id: postItem.id,
      },
      select: {
        id: true,
        itemName: true,
        itemCode: true,
        minStock: true,
        lastStock: true,
        currentStock: true,
        wacc: true,
        sellingPrice: true,
        itemCategory: {
          select: {
            category: true,
          },
        },
        itemType: {
          select: {
            type: true,
          },
        },
        supplier: {
          select: {
            supplierName: true,
          },
        },
        infoStock: true,
      },
    });

    res
      .status(201)
      .json({ status: 201, messege: "New item created successfull", data: newItem });
  } catch (error: any) {
    res.status(500).json({ messege: error });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const removeItem = await prisma.item.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ status: 200, messege: "Successfully delete item" });
  } catch (error) {
    res.status(500).json({ messege: error });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { itemName, minStock, maxStock, itemCategoryId, itemTypeId, supplierId } =
      req.body;

    const { id } = req.params;

    // Find data
    const findItem = await prisma.item.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        itemCategoryId: true,
        currentStock: true,
        sellingPrice: true,
        infoStock: true,
      },
    });

    // Validate data
    if (!findItem) res.status(404).json({ status: 404, messege: "Item data not found!" });

    // Item code
    const prefix = Number(itemCategoryId) === 1 ? "OBT" : "ALK";
    const lastItem = await prisma.item.findFirst({
      where: {
        itemCode: { startsWith: prefix },
      },
      orderBy: {
        itemCode: "desc",
      },
    });
    const nextNumber = lastItem ? parseInt(lastItem.itemCode.replace(prefix, "")) + 1 : 1;
    const itemCode =
      itemCategoryId && itemCategoryId !== findItem?.itemCategoryId
        ? `${prefix}${nextNumber.toString().padStart(4, "0")}`
        : undefined;

    // Update item
    const updateItem = await prisma.item.update({
      where: {
        id: Number(id),
      },
      data: {
        itemName,
        ...(itemCode ? { itemCode: itemCode } : {}),
        minStock,
        maxStock,
        ...(itemCategoryId ? { itemCategoryId: itemCategoryId } : {}),
        itemTypeId,
        supplierId,
      },
    });

    res.status(200).json({
      status: 200,
      messege: "Successfully update item",
      data: updateItem,
    });
  } catch (error) {
    res.status(500).json({ messege: error });
  }
};

export const addStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stockIn } = req.body;

    // Find coresponded item
    const previousItemData = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!previousItemData)
      res.status(404).json({ status: 404, messege: "Data not found" });

    if (
      previousItemData &&
      stockIn + previousItemData.currentStock > previousItemData.maxStock
    )
      res
        .status(400)
        .json({ status: 400, messege: "Total stock can't be more than max stock" });

    const newItemData = await prisma.item.update({
      where: { id: previousItemData?.id },
      data: {
        lastStock: previousItemData?.currentStock,
        currentStock: previousItemData?.currentStock + stockIn,
      },
    });

    // Add new info stock
    const newInfoStockData = await prisma.infoStock.create({
      data: {
        itemId: newItemData.id,
        startStock: previousItemData ? previousItemData.currentStock : 0,
        endStock: previousItemData?.currentStock + stockIn,
        startAmmount: previousItemData
          ? previousItemData.currentStock * previousItemData.wacc
          : 0,
        stockIn,
        stockInAmmount: stockIn * newItemData.wacc,
        stockOut: 0,
        stockOutAmmount: 0,
        stockTotal: newItemData.currentStock,
        ammountTotal: newItemData.currentStock * newItemData.wacc,
      },
    });

    res.status(200).json({
      status: 200,
      messege: `Successfully add stock to ${newItemData.itemName}`,
      data: { ...newItemData, newInfoStockData },
    });
  } catch (error) {
    console.dir(error);
    res.status(500).json({ messege: error });
  }
};
