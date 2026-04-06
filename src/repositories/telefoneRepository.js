import { connection } from '../configs/Database.js';

const telefoneRepository = {

    criar: async (telefone) => {
        const sql = `INSERT INTO telefones (id, idCliente, numero) VALUES (?, ?, ?)`;
        const values = [telefone.id, telefone.idCliente, telefone.numero];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM telefones;';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM telefones WHERE id = ?';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    },

    atualizar: async (telefone) => {
    const sql = ` UPDATE telefones SET idCliente = ?, numero = ? WHERE id = ? `;
    const values = [ telefone.idCliente, cliente.numero, cliente.id ];
    const [rows] = await connection.execute(sql, values);
    return rows;
}
};

export default telefoneRepository;