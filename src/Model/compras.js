
const conexao = require('../infraestrutura/conexao');
const session = require('express-session');


module.exports = {
    paginaComprar: (id_produto, id_cliente) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM produtos WHERE id_produtos = ?',
                [id_produto],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log('entrou no model')

                    resolve(results[0])
                });
        });
    },
    comprar: (id_produto, quantidade) => {
        return new Promise((resolve, reject) => {
            let valor = session.valor
            let total = valor * Number(quantidade)
            let id_usuarios = session.id_cliente
            conexao.query('INSERT into vendas (id_produtos, quantidade, valor_total ,valor_unitario, id_usuarios) values(?,?,?,?,?)',
                [id_produto, quantidade, total, valor, id_usuarios],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao cadastrar!!")
                    resolve(results)
                });
        });
    },
    buscarCompras: (id_usuario) => {
        return new Promise((resolve, reject) => {
            console.log(id_usuario)
            conexao.query('SELECT * FROM vendas v join produtos p on v.id_produtos=p.id_produtos where id_usuarios = ?', [id_usuario], (error, results) => {
                if (error) {
                    console.log(erro)
                    reject(new Error('Something went wrong'));
                    return;
                }
                console.log("Sucesso ao listar compras!!");
                resolve(results);
            });
        });
    },

    confirmarCompra: (id_compra) => {
        return new Promise((resolve, reject) => {
            const estado = 'confirmado'; // Declare estado com const
            id = Number(id_compra)
            console.log(id_compra);
            console.log(id);

            conexao.query('UPDATE vendas SET estado = ? WHERE id_vendas = ?',
                [estado, id],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    console.log("Sucesso ao editar!!");
                    resolve(results);
                });
        });
    },

    editar: (id) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM vendas v join produtos p on v.id_produtos = p.id_produtos WHERE id_vendas = ?',
                [id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    resolve(results[0])
                });
        });
    },
    alterar: (id, quantidade) => {
        return new Promise((resolve, reject) => {
            let qnt = Number(quantidade)
            console.log(qnt)
            conexao.query('UPDATE vendas SET quantidade = ? , valor_total = quantidade * valor_unitario  WHERE id_vendas = ?',
                [qnt, id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao editar!!")
                    resolve(results)
                });
        });
    },

    conferir: (id) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * from vendas WHERE id_vendas = ?',
                [id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao conferir!")
                    resolve(results)
                });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {

            conexao.query('DELETE from vendas WHERE id_vendas = ?',
                [id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao editar!!")
                    resolve(results)
                });
        });
    }
}