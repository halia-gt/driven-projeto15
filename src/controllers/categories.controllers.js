import { connection } from "../database/db.js";

async function readCategories(req, res) {
    const categories = (await connection.query("SELECT * FROM categories;")).rows;

    res.send(categories);
}

async function createCategorie(req, res) {
    const { name } = res.locals;

    try {
        await connection.query("INSERT INTO categories (name) VALUES ($1);", [name]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    readCategories,
    createCategorie
};