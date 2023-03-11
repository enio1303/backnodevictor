import { RequestHandler  } from 'express';
import jwt from 'jsonwebtoken';


export const rotaAutenticada: RequestHandler = (req, res, next) => {
    const token: any = req.headers["x-access-token"];
        if (!token) {
        return res.status(403).send({ "mensagem": "Usuário não autenticado." });
    }
    try {
        const user = jwt.verify(token, process.env.SECRET!);
        req.body.user = user;
    } catch (err) {
        return res.status(401).send({ "mensagem": "Usuário não autenticado." });
    }
    return next();
};
