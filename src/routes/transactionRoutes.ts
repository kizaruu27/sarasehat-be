import { Router } from "express";
import {
  createCart,
  createTransaction,
  getAllCart,
} from "../controllers/transactionController";
const routes = Router();

routes.get("/cart", getAllCart).post("/", createTransaction).post("/cart", createCart);

export default routes;
