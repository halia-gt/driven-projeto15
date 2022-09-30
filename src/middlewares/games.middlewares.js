import { connection } from "../database/db.js";
import { gamesSchema, searchGameSchema } from "../schemas/games.schemas.js";

async function gameSearchValidation(req, res, next) {
    const { name } = req.query;
    
    if (!name) {
        next();
        return;
    }

    const validation = searchGameSchema.validate({ name }, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(422).send({ message: errors });
        return;
    }

    res.locals.name = name;
    next();
}

async function gameBodyValidation(req, res, next) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    const validation = gamesSchema.validate({
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay
    }, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(400).send({ message: errors });
        return;
    }

    try {
        const repeatedGame = (await connection.query(
            "SELECT * FROM games WHERE name = $1;",
            [name]
        )).rows[0];

        if (repeatedGame) {
            res.sendStatus(409);
            return;
        }

        const category = (await connection.query(
            "SELECT * FROM categories WHERE id = $1;",
            [categoryId]
        )).rows[0];

        if (!category) {
            res.sendStatus(400);
            return;
        }

        res.locals.body = {
            name,
            image,
            stockTotal,
            categoryId,
            pricePerDay
        };
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

export {
    gameSearchValidation,
    gameBodyValidation
}