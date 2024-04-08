import { prisma } from '@/config';
import { badRequestError, notFoundError } from '@/errors';


async function getAllClients(){
    const result = await prisma.clientes.findMany();

    return result
}

async function createClient(nome: string, sobrenome: string, email: string, idade: number){
    const result = await prisma.clientes.create({
        data: {
            nome,
            sobrenome, 
            email,
            idade
        }
    });

    if(!result){
        throw badRequestError('CreationError');
    }

    return result
}

async function updateClient(id: number, nome: string, sobrenome: string, email: string, idade: number){

    const clienteExistente = await prisma.clientes.findUnique({
        where: { id },
      });

      const dadosAtualizados = {
        nome,
        sobrenome,
        email,
        idade
      }

      const dadosMesclados = { ...clienteExistente, ...dadosAtualizados };

      
    return await prisma.clientes.update({
        where: { id },
        data: dadosMesclados,
      });
}

async function deleteClient(id: number){
    const result = await prisma.clientes.delete({
        where: {id}
    });

    if(!result){
        throw notFoundError()
    }

    return result
}

async function findClientById(id: number){

    const find = await prisma.clientes.findUnique({
        where: {id}
    });

    if(!find){
        throw notFoundError();
    }

    return find
}

const clientsService = {
    getAllClients,
    createClient,
    updateClient,
    deleteClient,
    findClientById
}

export default clientsService