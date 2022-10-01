import express from "express";
import { createRental, readRentals } from "../controllers/rentals.controllers.js";
import { customerIdSearchValidation } from "../middlewares/customers.middlewares.js";
import { gameIdSearchValidation } from "../middlewares/games.middlewares.js";
import { rentalBodyValidation, rentalCustomerValidation, rentalGameValidation, rentalsPossibilityValidation } from "../middlewares/rentals.middlewares.js";

const router = express.Router();

router.post("/rentals", rentalBodyValidation, rentalCustomerValidation, rentalGameValidation, rentalsPossibilityValidation, createRental);
router.get("/rentals", customerIdSearchValidation, gameIdSearchValidation, readRentals);

export default router;