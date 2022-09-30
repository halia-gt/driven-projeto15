import express from "express";
import { createGame, readGames } from "../controllers/games.controllers.js";

const router = express.Router();

router.get("/games", readGames);
router.post("/games", createGame);

export default router;