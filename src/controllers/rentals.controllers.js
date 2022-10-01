import { connection } from "../database/db.js";

async function createRental(req, res) {
    const { customerId, gameId, daysRented } = res.locals.body;
    const { game } = res.locals;
    const date = new Date().toISOString().slice(0, 10);

    try {
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, date, daysRented, null, game.pricePerDay * daysRented, null]);

        res.sendStatus(201);        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    createRental,
};