export class Endereco {
    #id;
    #idCliente;
    #cep;
    #logradouro;
    #complemento;
    #bairro;
    #numero;
    #localidade;
    #uf;

    constructor(idCliente, dadosViaCep, id = null) {
        this.#idCliente = idCliente;
        this.#cep = dadosViaCep.cep;
        this.#logradouro = dadosViaCep.logradouro;
        this.#complemento = dadosViaCep.complemento;
        this.#numero = dadosViaCep.numero;
        this.#bairro = dadosViaCep.bairro;
        this.#localidade = dadosViaCep.localidade;
        this.#uf = dadosViaCep.uf;
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    set id(valor) {
        this._id = valor;
    }

    get idCliente() {
        return this.#idCliente;
    }

    set idCliente(valor) {
        this._idCliente = valor;
    }

    get cep() {
        return this.#cep; 
    }

    get logradouro() {
         return this.#logradouro;
     }

    get complemento() {
        return this.#complemento;
    }

    get bairro() {
        return this.#bairro;
    }

    get numero() {
        return this.#numero;
    }

    set numero(value) {
        this.#validarNumero(value);
        this.#numero = value;
    }

    get localidade() {
        return this.#localidade; 
    }
    
    get uf() {
        return this.#uf;
    }

    #validarNumero(value) {
        if (!value) {
            throw new error('Por favor, digite um número!')
        }
    }

    static criar(idCliente, dadosViaCep) {
        return new Endereco(idCliente, dadosViaCep);
    }
}