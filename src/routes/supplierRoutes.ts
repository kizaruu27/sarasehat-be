import { Router } from "express";
import { getAllSupplier } from "../controllers/supplierController";
const routes = Router();

routes.get("/", getAllSupplier);

export default routes;
