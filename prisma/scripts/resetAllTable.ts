import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const resetDB = async () => {
  try {
    await prisma.infoStock.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.item.deleteMany();

    console.log("Successfully delete all records");
  } catch (error) {
    console.log(error);
  }
};

resetDB();
