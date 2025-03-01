import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCateogry,
} from "../controllers/categoryControllers";
const routes = Router();

routes
  .get("/", getAllCategory)
  .post("/", createCategory)
  .delete("/:id", deleteCategory)
  .patch("/:id", updateCateogry);

export default routes;
