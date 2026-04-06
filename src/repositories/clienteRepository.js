import { connection } from '../configs/Database.js';

const clienteRepository = {

    criar: async (cliente) => {
        const sql = `INSERT INTO clientes (nome, cpf, cep, dataCad) VALUES (?, ?, ?, NOW())`;
        const values = [cliente.nome, cliente.cpf, cliente.cep];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM clientes WHERE id = ?';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    },

    atualizar: async (cliente) => {
    const sql = ` UPDATE clientes  SET nome = ?, cpf = ?, cep = ?  WHERE id = ? `;
    const values = [ cliente.nome, cliente.cpf, cliente.cep, cliente.id ];
    const [rows] = await connection.execute(sql, values);
    return rows;
}
};

export default clienteRepository;