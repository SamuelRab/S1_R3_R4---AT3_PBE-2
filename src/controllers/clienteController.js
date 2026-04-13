import axios from 'axios';
import clienteRepository from '../repositories/clienteRepository.js';
import { validarCPF } from '../utils/validarCpf.js';
import { limparNumero } from '../utils/limparNumero.js';
import { Telefone } from '../models/Telefone.js';

const clienteController = {

    criar: async (req, res) => {        
        try {
            let { nome, cpf, telefone, cep, numero, complemento } = req.body;

            cpf = limparNumero(cpf);
            telefone = limparNumero(telefone);
            cep = limparNumero(cep);

            if (!nome || !cpf || !telefone || !cep || !numero) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Preencha todos os campos obrigatórios'
                });
            }

            if (!validarCPF(cpf)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'CPF inválido'
                });
            }

            const dadosCep = await consultaCep(cep);

            const endereco = {
                cep: dadosCep.cep,
                logradouro: dadosCep.logradouro,
                complemento: complemento || dadosCep.complemento,
                bairro: dadosCep.bairro,
                numero,
                localidade: dadosCep.localidade,
                uf: dadosCep.uf
            };

            const cliente = { nome, cpf };
            const ObjTelefone = Telefone.criar(null, telefone)

            const resultado = await clienteRepository.criar(
                cliente,
                ObjTelefone,
                endereco
            );

            res.status(201).json({
                sucesso: true,
                mensagem: 'Cliente criado com endereço via ViaCEP',
                dados: resultado
            });

        } catch (error) {
            throw error
            res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    },

    atualizar: async (req, res) => {
    try {
        const { id } = req.params;
        let { nome, cpf, telefone, cep, numero, complemento } = req.body;

        cpf = limparNumero(cpf);
        telefone = limparNumero(telefone);
        cep = limparNumero(cep);

        const dadosCep = await consultaCep(cep);

        const endereco = {
            cep: dadosCep.cep,
            logradouro: dadosCep.logradouro,
            complemento: complemento || dadosCep.complemento,
            bairro: dadosCep.bairro,
            numero,
            localidade: dadosCep.localidade,
            uf: dadosCep.uf
        };

        const cliente = { id, nome, cpf };
        const ObjTelefone = Telefone.criar(id, telefone);

        const resultado = await clienteRepository.atualizar(cliente, ObjTelefone, endereco);

        res.status(200).json({
            sucesso: true,
            mensagem: 'Atualizado com sucesso',
            dados: resultado 
        });

    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: error.message
        });
    }
},
    listar: async (req, res) => {
        try {
            const resultado = await clienteRepository.selecionar();

            res.status(200).json({
                sucesso: true,
                dados: resultado
            });

        } catch (error) {
            res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    },


    deletar: async (req, res) => {
        try {
            const { id } = req.params;

            const resultado = await clienteRepository.deletar(id);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Cliente deletado com sucesso',
                dados: resultado
            });

        } catch (error) {
            res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    }

};

 async function consultaCep(cep){
        try {
            const resApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (resApi.data.erro) {
                throw new Error('CEP não encontrado');
            }

            return resApi.data;

        } catch (error) {
            throw new Error(error.message || "Erro ao buscar o CEP");  
        }
    };

export default clienteController;