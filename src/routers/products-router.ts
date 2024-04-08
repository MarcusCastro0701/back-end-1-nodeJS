import { createProduct, deleteData, getAllProducts, updateData } from '@/controllers/products-controller'
import { Router } from 'express'

const productsRouter = Router()

productsRouter
    .post("/", createProduct)
    .get("/", getAllProducts)
    .put("/:productId", updateData)
    .delete("/:productId", deleteData)


export { productsRouter }

