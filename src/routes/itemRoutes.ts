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
  .post("/", upload.none(), addNewItem)
  .patch("/:id", upload.none(), updateItem)
  .patch("/add/:id", addStock)
  .delete("/:id", deleteItem);
export default routes;
