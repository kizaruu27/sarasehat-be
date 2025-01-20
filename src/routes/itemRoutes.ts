import { Router } from "express";
import { getAllItems } from "../controllers/itemsController";

const routes = Router();
routes.get("/", getAllItems);

export default routes;
