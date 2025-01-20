const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
dotenv.config();

const itemsRoutes = require("./routes/itemsRoutes");

const PORT = process.env.PORT;

// Update later
app.use(cors());

app.use("/items", itemsRoutes);

app.get("/", (req, res) => {
  return res.json({
    messege: "Halo Dunia!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
