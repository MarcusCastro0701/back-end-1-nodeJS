import { createClient, deleteData, getAllClients } from '@/controllers/clients-controller'
import { Router } from 'express'

const clientsRouter = Router()

clientsRouter
    .post("/", createClient)
    .get("/", getAllClients)
    .put("/:clientId", deleteData)
    .delete("/:clientId", deleteData)


export { clientsRouter }

