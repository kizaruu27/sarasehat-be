import { Router } from "express";
import {
  addNewItem,
  deleteItem,
  getAllItems,
  getItemById,
} from "../controllers/itemsController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const routes = Router();
routes
  .get("/", getAllItems)
  .get("/:id", getItemById)
  .post("/", addNewItem)
  .delete("/:id", deleteItem);
// routes.get("/:id", getItemById);
export default routes;
