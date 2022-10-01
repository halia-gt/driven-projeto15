import { connection } from "../database/db.js";

async function createRental(req, res) {
    const { customerId, gameId, daysRented } = res.locals.body;
    const { game } = res.locals;
    const date = new Date().toISOString();

    try {
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, date, daysRented, null, game.pricePerDay * daysRented, null]);

        res.sendStatus(201);        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function readRentals(req, res) {
    const { customer, game } = res.locals;
    let rentals;

    try {
        if (customer && game) {
            rentals = (await connection.query(`SELECT rentals.*, json_agg(customers.*) AS customer, json_agg(games.*) AS game, json_agg(categories.name) AS "categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."customerId" = $1 AND rentals."gameId" = $2 GROUP BY rentals.id;`, [customer.id, game.id])).rows;

        } else if (customer && !game) {
            rentals = (await connection.query(`SELECT rentals.*, json_agg(customers.*) AS customer, json_agg(games.*) AS game, json_agg(categories.name) AS "categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."customerId" = $1 GROUP BY rentals.id;`, [customer.id])).rows;

        } else if (!customer && game) {
            rentals = (await connection.query(`SELECT rentals.*, json_agg(customers.*) AS customer, json_agg(games.*) AS game, json_agg(categories.name) AS "categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."gameId" = $1 GROUP BY rentals.id;`, [game.id])).rows;

        } else {
            rentals = (await connection.query('SELECT rentals.*, json_agg(customers.*) AS customer, json_agg(games.*) AS game, json_agg(categories.name) AS "categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id GROUP BY rentals.id;')).rows;
        }

        const cleanRentals = rentals.map(obj => {
            const rental = {...obj,
                game: {
                    ...obj.game[0],
                    categoryName: obj.categoryName[0]
                },
                customer: {
                    ...obj.customer[0]
                }
            };
            delete rental.categoryName;
            delete rental. game.image;
            delete rental. game.stockTotal;
            delete rental. game.pricePerDay;
            delete rental.customer.phone;
            delete rental.customer.cpf;
            delete rental.customer.birthday;

            return rental;
        });

        res.send(cleanRentals);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    createRental,
    readRentals
};