import { clientSCHEMA } from "@/schemas/clients-schema";
import clientsService from "@/services/clients-service";
import debug from "debug";
import { Request, Response } from "express";
import httpStatus from "http-status";

const logger = debug('app:controller');

export async function createClient(req: Request, res: Response){
    try {    

        const isValid = clientSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        logger("Cliente sendo criado...")

        const posting = await clientsService.createClient(
            req.body.nome,
            req.body.sobrenome,
            req.body.email,
            req.body.idade
        )

        logger("Cliente criado com sucesso.")

        return res.status(httpStatus.OK).send(posting)

    } catch (error) {
        logger("Erro ao criar cliente: ", error)
        if (error.name === 'CreationError') {
            return res.status(httpStatus.BAD_REQUEST).send(error);
          }
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
}

export async function getAllClients(req: Request, res: Response){
    try {    

        console.log(Date.now())

        logger("Buscando todos os clientes...");

        const getting = await clientsService.getAllClients();

        logger("Todos os clientes inseritos foram encontrados.")

        return res.status(httpStatus.OK).send(getting)

    } catch (error) {

        logger("Erro ao buscar clientes: ", error)

        if (error.status === 400) {
            return res.status(httpStatus.BAD_REQUEST).send(error);
          }
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
}

export async function updateData(req: Request, res: Response){
    try {        
        
        const body = req.body;
        const id = Number(req.params.clientIdId);

        logger("Atualizando novas informações...")

        const updating = await clientsService.updateClient(
            Number(id), 
            body.nome,
            body.sobrenome,
            body.email,
            body.idade
        )

        logger("Informações atualizadas.")

        res.status(httpStatus.OK).send(updating)
        

    } catch (error) {

        logger("Erro ao atualizar informação: ", error)

        if(error.name === 'NotFoundError'){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteData(req: Request, res: Response){
    try {        
        
        const id = Number(req.params.clientId);

        logger("Deletando cliente...")

        const updating = await clientsService.deleteClient(Number(id))

        logger("Cliente deletado com sucesso.")

        res.status(httpStatus.OK).send(updating)
        

    } catch (error) {
        logger("Erro ao deletar cliente: ", error)
        if(error.name === 'NotFoundError'){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}