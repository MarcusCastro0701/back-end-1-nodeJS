import { AuthenticatedAdminRequest } from "@/middlewares/authenticationAdmin-middlerare";
import { clientSCHEMA } from "@/schemas/clients-schema";
import clientsService from "@/services/clients-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createClient(req: Request, res: Response){
    try {    

        const isValid = clientSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const posting = await clientsService.createClient(
            req.body.nome,
            req.body.sobrenome,
            req.body.email,
            req.body.idade
        )

        return res.status(httpStatus.OK).send(posting)

    } catch (error) {
        if (error.name === 'CreationError') {
            return res.status(httpStatus.BAD_REQUEST).send(error);
          }
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
}

export async function getAllClients(req: Request, res: Response){
    try {    
        const getting = await clientsService.getAllClients();

        return res.status(httpStatus.OK).send(getting)

    } catch (error) {
        if (error.status === 400) {
            return res.status(httpStatus.BAD_REQUEST).send(error);
          }
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
}

export async function updateData(req: AuthenticatedAdminRequest, res: Response){
    try {        
        
        const body = req.body;
        const id = Number(req.params.clientIdId);

        const updating = await clientsService.updateClient(
            Number(id), 
            body.nome,
            body.sobrenome,
            body.email,
            body.idade
        )

        res.status(httpStatus.OK).send(updating)
        

    } catch (error) {
        console.log(error)
        if(error.name === 'NotFoundError'){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteData(req: AuthenticatedAdminRequest, res: Response){
    try {        
        
        const id = Number(req.params.clientId);

        const updating = await clientsService.deleteClient(Number(id))

        res.status(httpStatus.OK).send(updating)
        

    } catch (error) {
        console.log(error)
        if(error.name === 'NotFoundError'){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}