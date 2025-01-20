import { Router } from "express";
import { addNewItem, getAllItems } from "../controllers/itemsController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const routes = Router();
routes.get("/", getAllItems);
routes.post("/", upload.none(), addNewItem);

export default routes;
