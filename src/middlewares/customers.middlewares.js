import { connection } from "../database/db.js";
import { customerSchema } from "../schemas/customers.schemas.js";

async function customerBodyValidation(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;

    const validation = customerSchema.validate({
        name,
        phone,
        cpf,
        birthday
    }, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(400).send({ message: errors });
        return;
    }

    try {
        const repeatedClient = (await connection.query("SELECT * FROM customers WHERE cpf = $1;", [cpf])).rows[0];
        if (repeatedClient) {
            res.status(409).send({ message: "Customer already registered" });
            return;
        }

        res.locals.body = {
            name,
            phone,
            cpf,
            birthday
        }
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { customerBodyValidation };