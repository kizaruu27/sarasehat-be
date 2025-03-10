import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import itemTypeRoutes from "./routes/itemTypeRoutes";

const app: Application = express();
dotenv.config();

const PORT = process.env.PORT;

// Update later
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemRoutes);
app.use("/transaction", transactionRoutes);
app.use("/supplier", supplierRoutes);
app.use("/category", categoryRoutes);
app.use("/item-types", itemTypeRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Sarasehat API");
});

// Endpoint you'll always need for
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ messege: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
