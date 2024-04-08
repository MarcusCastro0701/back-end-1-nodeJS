import joi from "joi";

const productSCHEMA = joi.object({
    nome: joi.string().min(3).max(25).required(),
    descricao: joi.string().min(3).max(150).required(),
    preco: joi.number().precision(2).required(),
});


export { productSCHEMA };

