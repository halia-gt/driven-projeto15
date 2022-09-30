import joi from "joi";

const gamesSchema = joi.object({
    name: joi.string()
        .min(3)
        .empty()
        .trim()
        .required(),
    image: joi.string()
        .uri()
        .required(),
    stockTotal: joi.number()
        .integer()
        .min(1)
        .required(),
    categoryId: joi.number()
        .integer()
        .required(),
    pricePerDay: joi.number()
        .integer()
        .min(1)
        .required()
});

export { gamesSchema };