import { Router } from "express";
import { getAllItems } from "../controllers/itemsControllers";
const router = Router();

router.get("/", getAllItems);

export default router;
