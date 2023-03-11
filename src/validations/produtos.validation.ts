import Joi from 'joi';
import { joiMessage } from '../utils/joi.message';

export const cadastraProdutoSchema = {
    titulo: Joi.string().required().messages(joiMessage('titulo')),
    descricao: Joi.string().required().messages(joiMessage('descricao')),
    preco: Joi.number().required().messages(joiMessage('preco')),
    estoque: Joi.number().required().messages(joiMessage('estoque')),
    categoria: Joi.string().required().messages(joiMessage('categoria')),
}

export const atualizaProdutoSchema = {
    titulo: Joi.string(),
    descricao: Joi.string(),
    preco: Joi.number(),
    estoque: Joi.number(),
    categoria: Joi.string()
}