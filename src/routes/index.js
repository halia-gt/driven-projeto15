import express from "express";
import categoriesRouter from "./categories.routers.js";
import gamesRouter from "./games.routers.js";
import customersRouter from "./customers.routers.js";
import rentalsRouter from "./rentals.routers.js";

const router = express.Router();
router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;