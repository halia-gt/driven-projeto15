import express from "express";
import { readCategories } from "../controllers/categories.controllers.js";

const router = express.Router();

router.get("/categories", readCategories);

export default router;