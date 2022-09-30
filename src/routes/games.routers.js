import express from "express";
import { createGame, readGames } from "../controllers/games.controllers.js";
import { gameBodyValidation, gameSearchValidation } from "../middlewares/games.middlewares.js";

const router = express.Router();

router.get("/games", gameSearchValidation, readGames);
router.post("/games", gameBodyValidation, createGame);

export default router;