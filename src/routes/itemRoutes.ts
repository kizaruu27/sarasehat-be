import { Router } from "express";
import {
  addNewItem,
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
  .delete("/:id", deleteItem);
export default routes;
