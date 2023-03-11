import Joi from 'joi';
import { joiMessage } from '../utils/joi.message';

export const loginSchema = {
    email: Joi.string().email().required().messages(joiMessage('email')),
    senha: Joi.string().required().messages(joiMessage('senha'))
}

export const cadastroSchema = {
    nome: Joi.string().required().messages(joiMessage('nome')),
    email: Joi.string().email().required().messages(joiMessage('email')),
    senha: Joi.string().required().messages(joiMessage('senha')),
    confirmeSenha: Joi.string().required().messages(joiMessage('confirmeSenha'))
}