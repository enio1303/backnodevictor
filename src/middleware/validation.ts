import Joi from 'joi';
import { NextFunction, Request, Response  } from 'express';

export const rotaValidada = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const validateSchema = Joi.object(schema);

        const validate = validateSchema.validate(req.body, 
            { allowUnknown: true },
          );

        if (validate.error) return res.status(400).json({ 
            mensagem: validate.error.details[0].message
        })

        return next();
    }
};