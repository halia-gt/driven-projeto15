import joi from "joi";

const searchCustomerSchema = joi.object({
    cpf: joi.string()
        .empty("")
        .trim()
});

const customerSchema = joi.object({
    name: joi.string()
        .min(3)
        .empty("")
        .trim()
        .required(),
    phone: joi.string()
        .min(10)
        .max(11)
        .required(),
    cpf: joi.string()
        .length(11)
        .required(),
    birthday: joi.date()
        .less("now")
        .required()
});

export {
    searchCustomerSchema,
    customerSchema
};