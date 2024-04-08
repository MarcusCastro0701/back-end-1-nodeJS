import { prisma } from '@/config';
import { badRequestError, notFoundError } from '@/errors';


async function getAllProducts(){
    const result = await prisma.produtos.findMany();

    return result
}

async function createProduct(nome: string, descricao: string, preco: number, data_atualizado: string){
    const result = await prisma.produtos.create({
        data: {
            nome,
            descricao,
            preco: preco.toFixed(2),
            data_atualizado
        }
    });

    if(!result){
        throw badRequestError('CreationError');
    }

    return result
}

async function upadateProduct(id: number, nome: string, descricao: string, preco: number, data_atualizado: string){

    const produtoExistente = await prisma.clientes.findUnique({
        where: { id },
      });

      const dadosAtualizados = {
        nome,
        descricao,
        preco,
        data_atualizado,
      }

      const dadosMesclados = { ...produtoExistente, ...dadosAtualizados };

      
    return await prisma.produtos.update({
        where: { id },
        data: dadosMesclados,
      });
}

async function deleteProduct(id: number){
    const result = await prisma.produtos.delete({
        where: {id}
    });

    if(!result){
        throw notFoundError()
    }

    return result
}

async function findProductById(id: number){

    const find = await prisma.produtos.findUnique({
        where: {id}
    });

    if(!find){
        throw notFoundError();
    }

    return find
}

const productsService = {
    getAllProducts,
    createProduct,
    upadateProduct,
    deleteProduct,
    findProductById
}

export default productsService