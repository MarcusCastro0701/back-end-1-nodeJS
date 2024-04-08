import { createClient, deleteData, getAllClients } from '@/controllers/clients-controller'
import { authenticateBody } from '@/middlewares/body-middlerare'
import { authenticateParams } from '@/middlewares/params-middlerare'
import { Router } from 'express'

const clientsRouter = Router()

clientsRouter
    .post("/", authenticateBody, createClient)
    .get("/", getAllClients)
    .put("/:clientId", authenticateParams, deleteData)
    .delete("/:clientId", authenticateParams, deleteData)


export { clientsRouter }

