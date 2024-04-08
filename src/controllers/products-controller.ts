import { AuthenticatedAdminRequest } from "@/middlewares/authenticationAdmin-middlerare";
import { productSCHEMA } from "@/schemas/products-schema";
import productsService from "@/services/products-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createProduct(req: Request, res: Response){
    try {    

        const isValid = productSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const posting = await productsService.createProduct(
            req.body.nome,
            req.body.descricao,
            req.body.preco,
            req.body.data_atualizado
        )

        return res.status(httpStatus.OK).send(posting)

    } catch (error) {
        if (error.name === 'CreationError') {
            return res.status(httpStatus.BAD_REQUEST).send(error);
          }
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
}

export async function getAllProducts(req: Request, res: Response){
    try {    
        const getting = await productsService.getAllProducts();

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
        const id = Number(req.params.productId);

        const updating = await productsService.upadateProduct(
            Number(id), 
            body.nome,
            body.descricao,
            body.preco,
            body.data_atualizado
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
        
        
        const id = Number(req.params.productId);

        const updating = await productsService.deleteProduct(Number(id))

        res.status(httpStatus.OK).send(updating)
        

    } catch (error) {
        console.log(error)
        if(error.name === 'NotFoundError'){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}