"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getAllItems = async (req, res) => {
    try {
        const items = await prisma.item.findMany();
        res
            .status(200)
            .json({ status: 200, messege: "Success get all items data", data: items });
    }
    catch (error) {
        res.status(500).json({ status: 501, messege: error.messege });
    }
};
exports.getAllItems = getAllItems;
