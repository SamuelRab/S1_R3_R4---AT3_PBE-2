export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;
    #dataCad;

    constructor(pIdCategoria, pNome, pValor, pCaminhoImagem, pId = null) {
        this.idCategoria = pIdCategoria;
        this.nome = pNome;
        this.valor = pValor;
        this.caminhoImagem = pCaminhoImagem;
        this.#id = pId;
    }

    get id() {
        return this.#id;
    }

    set id(valor) {
        this._id = valor;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }

    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminhoImagem() {
        return this.#caminhoImagem;
    }

    set caminhoImagem(value) {
        this.#validarPathImagem(value);
        this.#caminhoImagem = value;
    }

    get dataCad() {
        return this.#dataCad;
    }

    #validarIdCategoria(value) {
        if (!value || value <= 0) {
            throw new Error('Categoria inválida, tente novamente!');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3) {
            throw new Error('Nome inválido, tente novamente!');
        }
    }

    #validarValor(value) {
        if (!value || value <= 0) {
            throw new Error('Valor inválido, tente novamente!');
        }
    }

    #validarPathImagem(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('Imagem obrigatória, tente novamente!');
        }
    }

    static criar(dados, caminhoImagem) {
        return new Produto(
            dados.idCategoria,
            dados.nome,
            dados.valor,
            caminhoImagem
        );
    }
}