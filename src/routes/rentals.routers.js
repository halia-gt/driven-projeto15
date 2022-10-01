import express from "express";
import { createRental } from "../controllers/rentals.controllers.js";
import { rentalBodyValidation, rentalCustomerValidation, rentalGameValidation, rentalsPossibilityValidation } from "../middlewares/rentals.middlewares.js";

const router = express.Router();

router.post("/rentals", rentalBodyValidation, rentalCustomerValidation, rentalGameValidation, rentalsPossibilityValidation, createRental);

export default router;