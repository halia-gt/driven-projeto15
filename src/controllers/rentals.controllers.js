import { connection } from "../database/db.js";

async function createRental(req, res) {
    const { customerId, gameId, daysRented } = res.locals.body;
    const { game } = res.locals;
    const date = new Date();
    date.setHours(0, 0, 0, 0);

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

async function updateRental(req, res) {
    const { rental } = res.locals;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = (today - rental.rentDate) / (1000 * 60 * 60 * 24);
    let delayFee = 0;

    if (diffDays > rental.daysRented) {
        delayFee = rental.originalPrice * (diffDays - rental.daysRented);
    }

    console.log({
        rentDate: rental.rentDate,
        originalPrice: rental.originalPrice,
        daysRented: rental.daysRented,
        today,
        diffDays,
        delayFee
    })

    try {
        await connection.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;', [today, delayFee, rental.id]);
        
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function deleteRental(req, res) {
    const { rental } = res.locals;

    try {
        await connection.query("DELETE FROM rentals WHERE id = $1", [rental.id]);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    createRental,
    readRentals,
    updateRental,
    deleteRental
};