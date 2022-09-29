import { connection } from "../database/db.js";

async function nameCategoriesValidation (req, res, next) {
    const { name } = req.body;

    try {
        if (!name) {
            res.sendStatus(400);
            return;
        }

        const repeatedName = (await connection.query("SELECT name FROM categories WHERE name = $1;", [name]))?.rows[0];
        if (repeatedName) {
            res.sendStatus(409);
            return;
        }

        res.locals.name = name;
        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { nameCategoriesValidation };