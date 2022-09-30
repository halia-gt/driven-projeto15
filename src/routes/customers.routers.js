import express from "express";
import { createCustomer, readSingleCustomer, readCustomers, updateCustomer } from "../controllers/customers.controllers.js";
import { customersSearchValidation, customerBodyValidation, uniqueCustomerValidation, customerIdValidation } from "../middlewares/customers.middlewares.js";

const router = express.Router();

router.get("/customers", customersSearchValidation, readCustomers);
router.get("/customers/:id", customerIdValidation, readSingleCustomer);
router.post("/customers", customerBodyValidation, uniqueCustomerValidation, createCustomer);
router.put("/customers/:id", customerBodyValidation, customerIdValidation, updateCustomer);

export default router;