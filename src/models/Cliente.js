export class Cliente {
    #id;
    #nome;
    #cpf;
    #cep;
    #logradouro;
    #complemento;
    #bairro;
    #localidade;
    #uf;

    constructor(nome, cpf, endereco, id = null) {
        this.nome = nome;
        this.cpf = cpf;
        this.cep = endereco.cep;
        this.logradouro = endereco.logradouro;
        this.complemento = endereco.complemento;
        this.bairro = endereco.bairro;
        this.localidade = endereco.localidade;
        this.uf = endereco.uf;
        this.#id = id;
    }

    get id() { return this.#id; }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get nome() {
        return this.#nome;
    }

    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    }

    get cpf() {
        return this.#cpf;
    }

    set cep(value) {
        this.#validarCep(value);
        this.#cep = value;
    }
    get cep() {
        return this.#cep;
    }

    get logradouro() {
        return this.#logradouro;
    }

    set logradouro(value) {
        return this.#logradouro;
    }

    get complemento() {
        return this.#complemento;
    }

    set complemento(value) {
       return this.#complemento;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(value) {
       return this.#bairro;
    }

    get localidade() {
        return this.#localidade;
    }

    set localidade(value) {
        return this.#localidade;
    }

    get uf() {
        return this.#uf;
    }

    set uf(value) {
         return this.#uf;
    }


    #validarNome(value) {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome inválido");
        }
    }

    #validarCpf(value) {
        if (!value || value.length < 11) {
            throw new Error("CPF inválido");
        }
    }

    #validarCep(value) {
        if (!value || value.length < 8) {
            throw new Error("CEP inválido");
        }
    }

    static criar(dados, enderecoViaCep) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            enderecoViaCep,
        );
    }
}