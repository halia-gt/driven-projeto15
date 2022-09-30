import express from "express";
import { createGame, readGames } from "../controllers/games.controllers.js";
import { gameBodyValidation } from "../middlewares/games.middlewares.js";

const router = express.Router();

router.get("/games", readGames);
router.post("/games", gameBodyValidation, createGame);

export default router;