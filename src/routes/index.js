import express from "express";
import categoriesRouter from "./categories.routers.js";

const router = express.Router();
router.use(categoriesRouter);

export default router;