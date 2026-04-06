import { Cliente } from "../models/Cliente.js";
import clienteRepository from "../repositories/clienteRepository.js";
import telefoneRepository from "../repositories/telefoneRepository.js";

const clienteRepository = {

    criar: async (req, res) => {
        try {
            const { id, nome, cpf, cep} = req.body;
            const cliente = cliente.criar({ id, nome, cpf, cep });

            const result = await clienteRepository.criar(cliente);
            res.status(201).json({
                message: "Cliente criado com sucesso", cliente, result
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Erro ao criar ao cliente",
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            const { idCategoria, nome, valor } = req.body;
            const caminhoImagem = req.file?.path;

            const produto = Produto.criar({ idCategoria, nome, valor }, caminhoImagem);

            produto.id = id;
            const result = await produtoRepository.atualizar(produto);
            res.status(200).json({
                message: "Produto atualizado com sucesso",
                result
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Erro ao atualizar produto",
                errorMessage: error.message
            });
        }
    }
};

export default clienteRepository;