import { connection } from "../database/db.js";

async function readGames(req, res) {
    const { name } = req.params;

    try {
        const games = await connection.query(`SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id${ name ? ` WHERE name LIKE $1%;` : `;`}`);

        console.log(games.rows);

        res.send(games);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = res.locals;

    try {
        await connection.query("INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay) VALUES ($1, $2, $3, $4, $5);", [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    readGames,
    createGame
}