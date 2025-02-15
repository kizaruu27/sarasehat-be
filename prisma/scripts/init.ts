import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initDB = async () => {
  try {
    await prisma.itemCategory.createMany({
      data: [
        { id: 1, category: "obat" },
        { id: 2, category: "alkes" },
      ],
    });

    await prisma.paymentType.createMany({
      data: [
        { id: 1, type: "cash" },
        { id: 2, type: "transfer" },
      ],
    });

    await prisma.transactionStatus.createMany({
      data: [
        { id: 1, status: "cancel" },
        { id: 2, status: "pending" },
        { id: 3, status: "success" },
      ],
    });

    await prisma.itemType.createMany({
      data: [
        { id: 1, type: "tablet" },
        { id: 2, type: "sirup" },
      ],
    });

    console.log("Successfully add records");
  } catch (error) {
    console.log(error);
  }
};

initDB();
