import { Router } from "express";
import produtoController from "../controllers/produtoController.js";
import uploadImage from "../middlewares/uploadImage.middleware.js";

const produtoRoutes = Router();

produtoRoutes.post('/', uploadImage, produtoController.criar);
produtoRoutes.get('/', produtoController.selecionar);
produtoRoutes.delete('/:id', produtoController.deletar);
produtoRoutes.put('/', uploadImage, produtoController.atualizar);

export default produtoRoutes;