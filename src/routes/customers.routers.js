import express from "express";
import { createCustomer } from "../controllers/customers.controllers.js";
import { customerBodyValidation } from "../middlewares/customers.middlewares.js";

const router = express.Router();

router.post("/customers", customerBodyValidation, createCustomer);

export default router;