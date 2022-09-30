import express from "express";
import categoriesRouter from "./categories.routers.js";
import gamesRouter from "./games.routers.js";

const router = express.Router();
router.use(categoriesRouter);
router.use(gamesRouter);

export default router;