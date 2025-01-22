import { Router } from "express";
import {
  addNewItem,
  addStock,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/itemsController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const routes = Router();
routes
  .get("/", getAllItems)
  .get("/:id", getItemById)
  .post("/", addNewItem)
  .patch("/:id", updateItem)
  .patch("/add/:id", addStock)
  .delete("/:id", deleteItem);
export default routes;
