import { prisma } from '@/config';
import { badRequestError, notFoundError } from '@/errors';
import NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 30 });


export async function getAllClients() {
    const cachedClients = cache.get('allClients');
  
    if (cachedClients) {
      console.log('Servindo do cache');
      return cachedClients;
    }
  
    const result = await prisma.clientes.findMany();
    console.log('Servindo do banco de dados');
    cache.set('allClients', result);
  
    return result;
  }
  
  export async function createClient(nome: string, sobrenome: string, email: string, idade: number) {
    const result = await prisma.clientes.create({
      data: {
        nome,
        sobrenome,
        email,
        idade
      }
    });
  
    if (!result) {
      throw badRequestError('CreationError');
    }
  
    cache.del('allClients');
    return result;
  }
  
  export async function updateClient(id: number, nome: string, sobrenome: string, email: string, idade: number) {
    const clienteExistente = await prisma.clientes.findUnique({
      where: { id },
    });
  
    if (!clienteExistente) {
      throw notFoundError();
    }
  
    const dadosAtualizados = {
      nome,
      sobrenome,
      email,
      idade
    };
  
    const dadosMesclados = { ...clienteExistente, ...dadosAtualizados };
  
    const updatedClient = await prisma.clientes.update({
      where: { id },
      data: dadosMesclados,
    });
  
    console.log('Atualizando dados no caching');
    cache.del('allClients');
    cache.del(`client_${id}`); 
  
    return updatedClient;
  }
  
  export async function deleteClient(id: number) {
    const result = await prisma.clientes.delete({
      where: { id }
    });
  
    if (!result) {
      throw notFoundError();
    }
  
    cache.del('allClients');
    cache.del(`client_${id}`);
  
    return result;
  }
  
  export async function findClientById(id: number) {
    const cachedClient = cache.get(`client_${id}`);
  
    if (cachedClient) {
      console.log('Servindo do cache');
      return cachedClient;
    }
  
    const find = await prisma.clientes.findUnique({
      where: { id }
    });
  
    if (!find) {
      throw notFoundError();
    }
  
    console.log('Servindo do banco de dados');
    cache.set(`client_${id}`, find);
  
    return find;
  }

const clientsService = {
    getAllClients,
    createClient,
    updateClient,
    deleteClient,
    findClientById
}

export default clientsService