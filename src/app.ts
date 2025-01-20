import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes";

const app: Application = express();
dotenv.config();

const PORT: string | number = process.env.PORT || 8000;

// Update later
app.use(cors());

app.use("/items", itemRoutes);

// Endpoint you'll always need for
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ messege: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
