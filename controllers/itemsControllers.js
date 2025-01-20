const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res
      .status(200)
      .json({ status: 200, messege: "Get items data successfull", data: items });
  } catch (error) {
    res.status(500).json({ status: 501, messege: error.messege });
  }
};

module.exports = { getAllItems };
