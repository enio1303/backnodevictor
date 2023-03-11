import { Router } from "express";
import { upload } from "../utils/multer.file";
import { rotaAutenticada } from "../middleware/auth";
import { login, cadastro, perfil } from "../controllers/users.controller";
import { rotaValidada } from "../middleware/validation";
import { cadastroSchema, loginSchema } from "../validations/usuarios.validation";

const UsersRoute = Router();

//usuario

UsersRoute.post('/login', rotaValidada(loginSchema), login);
UsersRoute.post('/cadastro', rotaValidada(cadastroSchema), cadastro);

UsersRoute.get('/admin/profile', rotaAutenticada, perfil);

export default UsersRoute;