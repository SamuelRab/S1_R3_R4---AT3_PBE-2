export class Cliente {
    #id;
    #nome;
    #cpf;
    #cep;
    #telefones;

    constructor(nome, cpf, cep, telefones, id = null) {
        this.nome = nome;
        this.cpf = cpf;
        this.cep = cep;
        this.telefones = telefones;
        this.#id = id;
    }

    get id() { return this.#id; }

    set nome(value) {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome inválido");
        }
        this.#nome = value;
    }

    get nome() { return this.#nome; }

    set cpf(value) {
        if (!value || value.length < 11) {
            throw new Error("CPF inválido");
        }
        this.#cpf = value;
    }

    get cpf() { return this.#cpf; }

    set cep(value) {
        if (!value || value.length < 8) {
            throw new Error("CEP inválido");
        }
        this.#cep = value;
    }

    get cep() { return this.#cep; }

    set telefones(value) {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error("Telefone inválido");
        }
        this.#telefones = value;
    }

    get telefones() { return this.#telefones; }

    static criar(dados) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            dados.cep,
            dados.telefones
        );
    }
}