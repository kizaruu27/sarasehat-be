import { Router } from "express";
import { createSupplier, getAllSupplier } from "../controllers/supplierController";
const routes = Router();

routes.get("/", getAllSupplier).post("/", createSupplier);

export default routes;
