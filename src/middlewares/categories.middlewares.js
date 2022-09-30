import { connection } from "../database/db.js";
import { categorySchema } from "../schemas/category.schemas.js";

async function nameCategoriesValidation (req, res, next) {
    const { name } = req.body;
    if (!name) {
        res.sendStatus(400);
        return;
    }

    const validation = categorySchema.validate({ name }, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(422).send({ message: errors });
        return;
    }
    
    try {
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