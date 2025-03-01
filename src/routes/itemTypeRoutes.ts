import { Router } from "express";
import {
  createItemType,
  deleteItemType,
  getAllItemType,
  updateItemType,
} from "../controllers/itemTypeControllers";
const routes = Router();

routes
  .get("/", getAllItemType)
  .post("/", createItemType)
  .patch("/:id", updateItemType)
  .delete("/:id", deleteItemType);

export default routes;
