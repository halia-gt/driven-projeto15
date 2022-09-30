import express from "express";
import { createCustomer, readSingleCustomer, readCustomers } from "../controllers/customers.controllers.js";
import { customersSearchValidation, customerBodyValidation } from "../middlewares/customers.middlewares.js";

const router = express.Router();

router.get("/customers", customersSearchValidation, readCustomers);
router.get("/customers/:id", readSingleCustomer);
router.post("/customers", customerBodyValidation, createCustomer);

export default router;