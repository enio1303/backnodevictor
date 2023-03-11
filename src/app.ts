import express from 'express';
import ProdutosRoute from './routes/produtos.route';
import UsersRoute from './routes/users.route';
import cors from 'cors';
import { upload } from './utils/multer.file';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(upload.any())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))

app.use('/uploads', express.static('src/uploads'));

//rotas
app.use(UsersRoute);
app.use(ProdutosRoute);

export default app;
