import { Router } from "express";
import { listarProdutos, detalharProduto, cadastrarProduto, atualizarProduto, excluirProduto, detalhar, listar } from "../controllers/produtos.controller";
import { rotaAutenticada } from "../middleware/auth";
import { rotaValidada } from "../middleware/validation";
import { upload } from "../utils/multer.file";
import { atualizaProdutoSchema, cadastraProdutoSchema } from "../validations/produtos.validation";


const ProdutosRoute = Router();

//produto

ProdutosRoute.get('/produtos', listar);
ProdutosRoute.get('/produtos/:id', detalhar);

ProdutosRoute.get('/admin/produtos', rotaAutenticada, listarProdutos);
ProdutosRoute.get('/admin/produtos/:id', rotaAutenticada, detalharProduto);
ProdutosRoute.post('/admin/produtos', rotaAutenticada, rotaValidada(cadastraProdutoSchema), cadastrarProduto);
ProdutosRoute.put('/admin/produtos/:id', rotaAutenticada, rotaValidada(atualizaProdutoSchema), atualizarProduto);
ProdutosRoute.delete('/admin/produtos/:id', rotaAutenticada, excluirProduto);

export default ProdutosRoute;