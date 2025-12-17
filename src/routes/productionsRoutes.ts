import * as productionsControllers from "../controllers/productionsController.js";
import { Router } from "express";

const router = Router();

router.get("/", productionsControllers.getAllProductions);
router.get("/:id", productionsControllers.getProductionById);

export default router;