
const conexao = require('../infraestrutura/conexao');
const session = require('express-session');


module.exports = {
    inserirProdutos: (descricao, nome, valor, imagem) => {
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

    alterarApenasProduto: (id_produto, nome, descricao,valor,imagem) => {
        console.log('ert')
        console.log(nome, descricao, valor, imagem, id_produto)
        return new Promise((resolve, reject) => {

        let query = 'UPDATE produtos SET nome = ? , descricao = ? , valor = ? ' 
        let queryWhere ='WHERE id_produtos = ?';
        let values = [nome, descricao, valor]

        // Verifica se imagem foi fornecida
        if (imagem) {
            query += ', imagem = ? ';
            values.push(imagem);
        } else { }
        query += queryWhere
        values.push(id_produto)
        conexao.query(query, values, (error, results) => {
            
            if (error) {reject(new Error('Erro ao editar produto no banco de dados:')); return;}

            console.log("Sucesso ao editar!!");
            resolve(results);
        });

        });
    },

    alterarProdutoseVendasNaoConfirmadas: (id_produto, nome, descricao, valor, imagem) => {
        console.log('Alterando produto e atualizando vendas');
        console.log(nome, descricao, valor, imagem, id_produto);
        return new Promise((resolve, reject) => {
            // Iniciar uma transação para garantir que todas as operações sejam atômicas
            // beginTransaction inicia uma transação que permite agrupar múltiplas operações SQL
            // em uma única unidade de trabalho. Se uma operação falhar, todas as mudanças
            // feitas desde o início da transação podem ser revertidas.
            conexao.beginTransaction(err => {
                if (err) {
                    // Se houver um erro ao iniciar a transação, rejeita a promessa
                    return reject(new Error('Erro ao iniciar transação: ' + err));
                }
    
                // Consulta SQL para atualizar o produto
                let queryProduto = 'UPDATE produtos SET nome = ?, descricao = ?, valor = ?';
                let valuesProduto = [nome, descricao, valor];
    
                if (imagem) {
                    // Se uma imagem foi fornecida, adiciona-a à consulta e aos valores
                    queryProduto += ', imagem = ?';
                    valuesProduto.push(imagem);
                }
    
                // Finaliza a consulta adicionando a cláusula WHERE
                queryProduto += ' WHERE id_produtos = ?';
                valuesProduto.push(id_produto);
    
                // Executa a consulta para atualizar o produto
                conexao.query(queryProduto, valuesProduto, (error, results) => {
                    if (error) {
                        // Se houver um erro na atualização do produto, faz rollback da transação e rejeita a promessa
                        // rollback reverte todas as mudanças feitas durante a transação, garantindo que
                        // o banco de dados retorne ao seu estado original antes da transação.
                        return conexao.rollback(() => {
                            reject(new Error('Erro ao editar produto no banco de dados: ' + error));
                        });
                    }
    
                    // Consulta SQL para atualizar as vendas associadas ao produto
                    const queryVendas = `
                        UPDATE vendas 
                        SET valor_unitario = ?, valor_total = quantidade * ? 
                        WHERE id_produtos = ? AND estado = 'nao confirmado'
                    `;
                    const valuesVendas = [valor, valor, id_produto];
    
                    // Executa a consulta para atualizar as vendas
                    conexao.query(queryVendas, valuesVendas, (error, results) => {
                        if (error) {
                            // Se houver um erro na atualização das vendas, faz rollback da transação e rejeita a promessa
                            // rollback é chamado novamente se a atualização das vendas falhar, garantindo que
                            // nenhuma mudança parcial seja aplicada ao banco de dados.
                            return conexao.rollback(() => {
                                reject(new Error('Erro ao atualizar vendas no banco de dados: ' + error));
                            });
                        }
    
                        // Se tudo deu certo, faz commit da transação
                        // commit finaliza a transação e aplica todas as mudanças feitas durante ela,
                        // garantindo que todas as operações sejam confirmadas no banco de dados.
                        conexao.commit(err => {
                            if (err) {
                                // Se houver um erro ao fazer commit, faz rollback da transação e rejeita a promessa
                                // rollback é chamado se o commit falhar, garantindo que nenhuma mudança seja aplicada
                                // se o commit não puder ser concluído.
                                return conexao.rollback(() => {
                                    reject(new Error('Erro ao fazer commit da transação: ' + err));
                                });
                            }
                            // Sucesso ao editar produto e atualizar vendas, resolve a promessa
                            console.log("Sucesso ao editar produto e atualizar vendas!");
                            resolve(results);
                        });
                    });
                });
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
                // console.log("Sucesso ao listar produtos!!");
                resolve(results);
            });
        });
    },

     ver: (id_produtos) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM produtos WHERE id_produtos = ?',
                [id_produtos],
                (error, results) => {
                    if (error) { reject(error); return; }
                    resolve(results[0])
                });
        });
    },
    

    delete: (id_produto) => {
        return new Promise((resolve, reject) => {
            // Iniciar uma transação para garantir que todas as operações sejam atômicas
            // beginTransaction inicia uma transação que permite agrupar múltiplas operações SQL
            // em uma única unidade de trabalho. Se uma operação falhar, todas as mudanças
            // feitas desde o início da transação podem ser revertidas.
            conexao.beginTransaction((err) => {
                if (err) {
                    // Se houver um erro ao iniciar a transação, rejeita a promessa
                    return reject(new Error('Erro ao iniciar transação: ' + err));
                }
    
                // Buscar a imagem do produto pelo ID
                conexao.query('SELECT imagem FROM produtos WHERE id_produtos = ?', [id_produto], (error, results) => {
                    if (error) {
                        // Se houver um erro ao buscar o produto, faz rollback da transação e rejeita a promessa
                        return conexao.rollback(() => {
                            reject(new Error('Erro ao buscar produto no banco de dados: ' + error));
                        });
                    }
                    
                    const imagem = results[0].imagem;
    
                    // Deletar o produto pelo ID
                    conexao.query('DELETE FROM produtos WHERE id_produtos = ?', [id_produto], (error, results) => {
                        if (error) {
                            // Se houver um erro ao deletar o produto, faz rollback da transação e rejeita a promessa
                            return conexao.rollback(() => {
                                reject(new Error('Erro ao deletar produto no banco de dados: ' + error));
                            });
                        }
    
                        // Se tudo deu certo, faz commit da transação
                        conexao.commit((err) => {
                            if (err) {
                                // Se houver um erro ao fazer commit, faz rollback da transação e rejeita a promessa
                                return conexao.rollback(() => {
                                    reject(new Error('Erro ao fazer commit da transação: ' + err));
                                });
                            }
                            // Sucesso ao excluir produto e pegar imagem, resolve a promessa
                            console.log("Sucesso ao excluir produto e pegar imagem!");
                            resolve(imagem);
                        });
                    });
                });
            });
        });
    },
    
}