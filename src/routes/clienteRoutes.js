import {Router} from "express";
import clienteController from '../controllers/clienteController.js';
const clienteRoutes = Router();

clienteRoutes.post('/', clienteController.criar);
clienteRoutes.get('/', clienteController.listar);
clienteRoutes.put('/:id', clienteController.atualizar);
clienteRoutes.delete('/:id', clienteController.deletar);

export default clienteRoutes;