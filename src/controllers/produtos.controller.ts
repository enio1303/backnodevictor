import Str from '@supercharge/strings';
import fs from 'fs';
import { Request, RequestHandler, Response } from 'express';
import { NovoProduto, Produto } from '../tipos/produto';
import { knex } from '../db/conexao';
import { exec } from 'child_process';

export const listar: RequestHandler = async (_: Request, res: Response) => {
    try {
        let produtos = await knex<Produto>('produtos')

        produtos = produtos.map(produto => {
            produto.foto = `${process.env.BASE_URL}/src/uploads/${produto.foto}`;
            return produto;
        })
        return res.json(produtos);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const detalhar: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        let produto = await knex<Produto>('produtos')
            .where({id: id})
            .first()
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }   
        produto!.foto = `${process.env.BASE_URL}/src/uploads/${produto!.foto}`;
        
        return res.json(produto);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const listarProdutos: RequestHandler = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        let produtos = await knex<Produto>('produtos')
            .where({ usuario_id: user.id })

        produtos = produtos.map(produto => {
            produto.foto = `${process.env.BASE_URL}/src/uploads/${produto.foto}`;
            return produto;
        })
        return res.json(produtos);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const detalharProduto: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    const { user } = req.body
    try {
        let produto = await knex<Produto>('produtos')
            .where({id: id, usuario_id: user.id})
            .first()
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }   
        produto!.foto = `${process.env.BASE_URL}/src/uploads/${produto!.foto}`;
        
        return res.json(produto);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const cadastrarProduto: RequestHandler = async (req: Request, res: Response) => {
    const { titulo, descricao, preco, estoque, categoria, user } = req.body
    const foto = JSON.parse(JSON.stringify(req.files))[0].filename;

    try {
        const produto: NovoProduto = { 
            titulo, descricao, preco, estoque, foto, categoria, usuario_id: user.id
        }

        const novoProduto = await knex<Produto>('produtos').insert({
            titulo: produto.titulo,
            descricao: produto.descricao,
            preco: produto.preco,
            estoque: produto.estoque,
            foto: produto.foto,
            categoria: produto.categoria,
            usuario_id: produto.usuario_id
        }).returning('*')

        exec('ls ./', (err, output) => {
            // once the command has completed, the callback function is called
            if (err) {
                // log and return if we encounter an error
                console.error("could not execute command: ", err)
                return
            }
            // log the output received from the command
            console.log("ls ./: \n", output)
        })
        
        exec('ls ./src/uploads', (err, output) => {
            // once the command has completed, the callback function is called
            if (err) {
                // log and return if we encounter an error
                console.error("could not execute command: ", err)
                return
            }
            // log the output received from the command
            console.log("ls ./src/uploads: \n", output)
        })

        exec('ls ./uploads', (err, output) => {
            // once the command has completed, the callback function is called
            if (err) {
                // log and return if we encounter an error
                console.error("could not execute command: ", err)
                return
            }
            // log the output received from the command
            console.log("ls ./src/uploads: \n", output)
        })

        return res.status(201).json(produto);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const atualizarProduto: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    const { titulo, descricao, preco, estoque, categoria, user } = req.body
    const foto = JSON.parse(JSON.stringify(req.files))[0]?.filename;
    
    try {
        const produto = await knex<Produto>('produtos')
        .where({ id: id })
        .first()

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }
        
        if (foto){
            const pathToFile = produto.foto;
            try {
                fs.unlinkSync("uploads/"+pathToFile!)
                console.log("Successfully deleted the file.")
            } catch(err) {
                throw err
            }
        }

        await knex<Produto>('produtos')
        .where({ id: id })
        .update({ titulo, descricao, preco, estoque, foto, categoria, usuario_id: user.id })

        return res.status(204).send()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const excluirProduto: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const produto = await knex<Produto>('produtos')
        .where({ id: id })
        .first()

        if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }

        const pathToFile = produto.foto;
        try {
            fs.unlinkSync("uploads/"+pathToFile!)
            console.log("Successfully deleted the file.")
        } catch(err) {
            throw err
        }

        await knex<Produto>('produtos')
        .where({ id: id })
        .del()

        return res.status(204).json();
    } catch (error){
        return res.status(500).json({ mensagem: 'Erro interno do servidor.', error })
    }
}