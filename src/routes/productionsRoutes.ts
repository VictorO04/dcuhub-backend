import * as productionsControllers from "../controllers/productionsController.js";
import { Router } from "express";

const router = Router();

router.get("/", productionsControllers.getAllProductions);
router.get("/:id", productionsControllers.getProductionById);
router.post("/", productionsControllers.postProduction);
router.delete("/:id", productionsControllers.deleteProduction);
router.patch("/:id", productionsControllers.patchProduction);

export default router;