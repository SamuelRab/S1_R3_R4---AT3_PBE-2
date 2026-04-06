export class Produto {
    #id;
    #idCliente;
    #numero;

    constructor(pIdCliente, pNumero, pId = null) {
        this.#idCliente = pIdCliente;
        this.#numero = pNumero;
        this.#id = pId;
    }

    get id() {
        return this.#id;
    }

    set id(valor) {
        this._id = valor;
    }

    get pIdCliente() {
        return this.#idCliente;
    }

    set pIdCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get pNumero() {
        return this.#numero;
    }

    set pNumero(value) {
        this.#validarNumero(value);
        this.#numero = value;
    }

    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('Cliente inválido, tente novamente!');
        }
    }

    #validarNumero(value) {
        if (!value || value.trim().length == 0 || value < 11) {
            throw new Error('Número inválido, tente novamente!');
        }
    }


    static criar(dados) {
        return new Produto(
            dados.pIdCliente,
            dados.pNumero,
        );
    }
}