
const conexao = require('../infraestrutura/conexao');
const session = require('express-session');


module.exports = {
    inserirProdutos: (descricao, nome, valor, imagem) => {
        console.log('model');
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO produtos (descricao, nome, valor';
            let values = [descricao, nome, valor];

            // Verifica se imagem foi fornecida
            if (imagem) {
                query += ', imagem) VALUES (?, ?, ?, ?)';
                values.push(imagem);
            } else {
                query += ') VALUES (?, ?, ?)';
            }

            conexao.query(query, values, (error, results) => {
                if (error) {
                    reject(new Error('Erro ao inserir produto no banco de dados:'));
                    return;
                }
                console.log("Sucesso ao cadastrar produto!!");
                resolve(results);
            });
        });
    },

    buscarProdutos: () => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM produtos', (error, results) => {
                if (error) {
                    reject(new Error('Something went wrong'));
                    return;
                }
                console.log("Sucesso ao listar produtos!!");
                resolve(results);
            });
        });
    },

    editar: (id_produtos) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM produtos WHERE id_produtos = ?',
                [id_produtos],
                (error, results) => {
                    if (error) { reject(error); return; }
                    resolve(results[0])
                });
        });
    },
    alterar: (id_produto, nome, descricao,valor) => {
        return new Promise((resolve, reject) => {
            conexao.query('UPDATE produtos SET nome = ? , descricao = ? , valor = ? WHERE id_produtos = ?',
                [nome, descricao, valor, id_produto],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao editar!!")
                    resolve(results)
                });
        });
    },

    delete: (id_produto) => 
    {
        return new Promise((resolve, reject) => 
        {
//beginTransaction para fazer 2 consultas e reverter 'rollback' se alguma estiver errada ou confirmar 'commit'
            conexao.beginTransaction((err) => 
            {
                if (err) { return reject(err); }
                // Buscar o produto pelo ID
                conexao.query('SELECT imagem FROM produtos WHERE id_produtos = ?', [id_produto], (error, results) => 
                {
                    if (error) 
                        {
                        return conexao.rollback(() => {reject(error);});
                    }
                    const imagem = results[0].imagem;
                    // Deletar o produto
                    conexao.query
                    ('DELETE FROM produtos WHERE id_produtos = ?', [id_produto], (error, results) => 
                    {
                        if (error) 
                        {
                            return conexao.rollback(() => {reject(error);});
                        }
                        // Commit da transação
                        conexao.commit
                        ((err) => 
                        {
                            if (err) 
                            {
                                return conexao.rollback(() => {reject(err);});
                            }
                            console.log("Sucesso ao excluir produto e pegar imagem!");
                            resolve(imagem);
                        });
                    });
                });
            });
        });
    }
}