import { connection } from "../database/db.js";

async function gameSearchValidation(req, res, next) {
    const { name } = req.params;
    if (!name) {
        next();
    }

    try {
        
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    gameSearchValidation,
}