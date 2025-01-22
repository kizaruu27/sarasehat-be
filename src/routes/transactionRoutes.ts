import { Router } from "express";
import { createCart, createTransaction } from "../controllers/transactionController";
const routes = Router();

routes.post("/", createTransaction).post("/cart", createCart);

export default routes;
