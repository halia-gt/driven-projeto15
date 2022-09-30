import express from "express";
import { createCustomer, readCustomers } from "../controllers/customers.controllers.js";
import { customersSearchValidation, customerBodyValidation } from "../middlewares/customers.middlewares.js";

const router = express.Router();

router.get("/customers", customersSearchValidation, readCustomers);
router.post("/customers", customerBodyValidation, createCustomer);

export default router;