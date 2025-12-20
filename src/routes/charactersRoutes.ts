import * as charactersController from "../controllers/charactersController.js";
import { Router } from "express";

const router = Router();

router.get("/", charactersController.getAllCharacters);
router.get("/:id", charactersController.getCharacterById);
router.post("/", charactersController.postCharacter);
router.delete("/:id", charactersController.deleteCharacter);

export default router;