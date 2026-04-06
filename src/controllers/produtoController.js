import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {

    criar: async (req, res) => {
        try {
            const { idCategoria, nome, valor } = req.body;
            const caminhoImagem = req.file?.path;

            const produto = Produto.criar({ idCategoria, nome, valor }, caminhoImagem);

            const result = await produtoRepository.criar(produto);
            res.status(201).json({
                message: "Produto criado com sucesso", produto, result
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Erro ao criar produto",
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

export default produtoController;