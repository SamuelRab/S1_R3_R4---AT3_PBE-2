import { connection } from '../configs/Database.js';
const clienteRepository = {
    criar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlCli = `INSERT INTO clientes (nome, cpf) VALUES (?, ?)`;
            const [rowsCli] = await conn.execute(sqlCli, [cliente.nome, cliente.cpf]);
            
            const idCliente = rowsCli.insertId;
            const sqlTel = `INSERT INTO telefones (idCliente, telefone) VALUES (?, ?)`;
            const [rowsTel] = await conn.execute(sqlTel, [idCliente, telefone.telefone]);

            const sqlEnd = `INSERT INTO enderecos (idCliente, cep, logradouro, complemento, bairro, numero, localidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const valuesEnd = [idCliente, endereco.cep, endereco.logradouro, endereco.complemento, endereco.bairro, endereco.numero, endereco.localidade, endereco.uf];
            const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);

            await conn.commit();
            return { rowsCli, rowsTel, rowsEnd };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    atualizar: async (cliente, telefone, endereco) => {
    const conn = await connection.getConnection();
    try {
        await conn.beginTransaction();
        
        const sqlCli = `UPDATE SET clientes nome = ?, cpf = ? WHERE id = ?`;
            const [rowsCli] = await conn.execute(sqlCli, [cliente.nome, cliente.cpf, cliente.id]);
            
            const idCliente = rowsCli.insertId;
            const sqlTel = `UPDATE SET telefones SET telefone = ? WHERE idCliente = ?`;
            const [rowsTel] = await conn.execute(sqlTel, [telefone.telefone, cliente.id]);

            const sqlEnd = `UPDATE SET enderecos SET cep = ?, logradouro = ?, complemento = ?, bairro = ?, numero = ?, localidade = ?, uf = ? WHERE idCliente = ?`;
            const valuesEnd = [endereco.cep, endereco.logradouro, endereco.complemento, endereco.bairro, endereco.numero, endereco.localidade, endereco.uf, cliente.id];
            const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);

        await conn.commit();

        return {
            cliente,
            telefone: telefone.telefone, 
            endereco
        };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
},

    selecionar: async () => {
        const conn = await connection.getConnection();
        try {

        const sqlCli = 'SELECT * FROM clientes ;';
        const [rowsCli] = await connection.execute(sql);

        const sqlTel = 'SELECT * FROM telefones ;';
        const [rowsTel] = await connection.execute(sql);

        const sqlEnd = 'SELECT * FROM enderecos ;';
        const [rowsEnd] = await connection.execute(sql);
        return rowsCli, rowsTel, rowsEnd;
    
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            await conn.execute('DELETE FROM telefones WHERE idCliente = ?', [id]);
            await conn.execute('DELETE FROM enderecos WHERE idCliente = ?', [id]);
            const [rowsCli] = await conn.execute('DELETE FROM clientes WHERE id = ?', [id]);

            await conn.commit();
            return rowsCli;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default clienteRepository;