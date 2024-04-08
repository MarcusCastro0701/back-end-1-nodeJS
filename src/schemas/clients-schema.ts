import joi from "joi";

const clientSCHEMA = joi.object({
    nome: joi.string().min(3).max(25).required(),
    sobrenome: joi.string().min(3).max(35).required(),
    email: joi.string().email().required(),
    idade: joi.number().min(18).required()
});


export { clientSCHEMA };

