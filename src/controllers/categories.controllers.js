import { connection } from "../database/db.js";

async function readCategories(req, res) {
    const categories = (await connection.query("SELECT * FROM categories")).rows;

    res.send(categories);
}

export {
    readCategories,
};