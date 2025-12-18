import * as charactersController from "../controllers/charactersController.js";
import { Router } from "express";

const router = Router();

router.get("/", charactersController.getAllCharacters);

export default router;