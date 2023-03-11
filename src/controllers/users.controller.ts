import { RequestHandler } from 'express';
import Str from '@supercharge/strings';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { knex } from '../db/conexao';
import { Usuario, UsuarioPerfil } from '../tipos/usuario';

export const login: RequestHandler = async (req, res) => {

    const { email, senha } = req.body;

    try {
        const user: Usuario | undefined = await knex<Usuario>('usuarios')
            .where({ email: email })
            .first();
        if (user && await bcrypt.compare(senha, user.senha)){
            const userRetorno: UsuarioPerfil = {
                id: user.id,
                nome: user.nome,
                email: user.email,
            };
    
            const token = jwt.sign(userRetorno, process.env.SECRET!);
            return res.send({token});
        }
        return res.status(404).send({ "mensagem": 'Usuário ou senha incorretos.' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const cadastro: RequestHandler = async (req, res) => {
    const { nome, email, senha, confirmeSenha } = req.body;

    if(senha !== confirmeSenha){
        return res.status(404).send({ "mensagem": 'Senha e Confirmação de Senha devem ser iguais.' });
    }

    const user: Usuario | undefined = await knex<Usuario>('usuarios')
        .where({ email: email })
        .first();
    
    if (user){
        return res.status(404).send({ "mensagem": 'Email já existe.' });
    } else {
        const senhaEncriptada = await bcrypt.hash(senha, 10); 
        const novoUsuario: Usuario = { id: Str.random(24), nome, email, senha: senhaEncriptada };
        try {
            const usuario = await knex<Omit<Usuario, 'id'>>('usuarios').insert({
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                senha: novoUsuario.senha
            }).returning('*')
    
            return res.status(201).send({ "mensagem": 'Usuário cadastrado.' });
        } catch(error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
        }
    } 
}

export const perfil: RequestHandler = async (req, res) => {
    const { user } = req.body;
    if (user){
        return res.send(user);
    } else {
        return res.send("Error");
    }
}