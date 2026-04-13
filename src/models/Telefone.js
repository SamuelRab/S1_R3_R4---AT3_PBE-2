export class Telefone {
    #id;
    #idCliente;
    #telefone;

    constructor(idCliente, telefone, id = null) {
        this.#idCliente = idCliente;
        this.#telefone = telefone;
        this.#id = id;
    }

    get telefone() {
        return this.#telefone;
    }

     set telefone(value) {
        if (!value || value.length < 10 || !Array.isArray(value) || value.length === 0) {
            throw new Error("Telefone inválido");
        }
        this.#telefone = value;
    }

    get idCliente() {
        return this.#idCliente;
    }

    set idCliente(valor) {
        this._idCliente = valor;
    }

    static criar(idCliente, telefone) {
        return new Telefone(idCliente, telefone);
    }
}