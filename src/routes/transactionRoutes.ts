import { Router } from "express";
import {
  createCart,
  createTransaction,
  deleteCart,
  editCart,
  getAllCart,
  getAllTransaction,
} from "../controllers/transactionController";
const routes = Router();

routes
  .get("/", getAllTransaction)
  .get("/cart", getAllCart)
  .post("/", createTransaction)
  .post("/cart", createCart)
  .delete("/cart/:id", deleteCart)
  .patch("/cart/qty/:id", editCart);

export default routes;
