
const conexao = require('../infraestrutura/conexao');
const session = require('express-session');


module.exports = {
    selecionarproduto: (id_produto) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM produtos WHERE id_produtos = ?',
                [id_produto],
                (error, results) => {
                    if (error) { reject(error); return; }
                    resolve(results[0])
                });
        });
    },
    comprar: (id_produto, quantidade, valor, id_usuario) => {
        return new Promise((resolve, reject) => {
            let total = valor * Number(quantidade)
            conexao.query('INSERT into vendas (id_produtos, quantidade, valor_total ,valor_unitario, id_usuarios) values(?,?,?,?,?)',
                [id_produto, quantidade, total, valor, id_usuario],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao cadastrar!!")
                    resolve(results)
                });
        });
    },

    // cadastrar Endereco
    EnderecosDoUsuario: (id_usuario) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM enderecos WHERE id_usuarios = ?',
                [id_usuario],
                (error, results) => {
                    if (error) { reject(error); return; }
                    resolve(results)
                });
        });
    },

    cadastrarEndereco: (endereco) => {
        return new Promise((resolve, reject) => {
            [cep, estado, cidade, bairro, rua, numero, complemento, id_usuario] = endereco
            conexao.query('INSERT into enderecos (CEP,estado,cidade,bairro,rua,numero,complemento,id_usuarios) values(?,?,?,?,?,?,?,?)',
                [cep, estado, cidade, bairro, rua, numero, complemento, id_usuario],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao cadastrar endereco!!")
                    resolve(results)
                });
        });
    },

    selecionarEndereco: (id_endereco, id_venda ) => {
        return new Promise((resolve, reject) => {
            conexao.query('UPDATE vendas SET id_endereco = ?  WHERE id_vendas = ?',
                [id_endereco, id_venda],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    console.log("Sucesso ao selecionar endereco!");
                    resolve(results);
                });
        });
    },
    compraEndereco: (id) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM vendas v join enderecos e on v.id_endereco = e.id_endereco WHERE id_vendas = ?',
                [id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    resolve(results[0])
                });
        });
    },
    buscarEndereco: (id_usuario) => {
        return new Promise((resolve, reject) => {
            console.log(id_usuario)
            conexao.query("SELECT * FROM enderecos where id_usuarios = ?", [id_usuario], (error, results) => {
                if (error) {
                    console.log(error)
                    reject(new Error('Something went wrong'));
                    return;
                }
                console.log("Sucesso ao listar compras!!");
                resolve(results);
            });
        });
    },

    // compras
    buscarCompras: (id_usuario) => {
        return new Promise((resolve, reject) => {
            console.log(id_usuario)
            conexao.query("SELECT *, DATE_FORMAT(data, '%d/%m/%Y') AS data_formatada FROM vendas v left join produtos p on v.id_produtos=p.id_produtos where id_usuarios = ?", [id_usuario], (error, results) => {
                if (error) {
                    console.log(error)
                    reject(new Error('Something went wrong'));
                    return;
                }
                console.log("Sucesso ao listar compras!!");
                resolve(results);
            });
        });
    },

    buscarTodasAsCompras: () => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT u.nome, vendas_produtos.* FROM (SELECT p.nome as nome_produto, p.imagem, v.quantidade, v.valor_total, v.estado, v.id_usuarios, v.id_vendas FROM vendas v  JOIN produtos p ON v.id_produtos = p.id_produtos) AS vendas_produtos JOIN usuarios u ON u.id_usuarios = vendas_produtos.id_usuarios;', (error, results) => {
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

            conexao.query('UPDATE vendas SET estado = ?, data =NOW() WHERE id_vendas = ?',
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

    compraProduto: (id) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM vendas v join produtos p on v.id_produtos = p.id_produtos WHERE id_vendas = ?',
                [id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    resolve(results[0])
                });
        });
    },


    verCompra: (id) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT u.nome, vendas_produtos.* FROM (SELECT p.nome as nome_produto, p.imagem, v.quantidade, v.valor_total, v.estado, v.id_usuarios, v.id_vendas FROM vendas v  JOIN produtos p ON v.id_produtos = p.id_produtos) AS vendas_produtos JOIN usuarios u ON u.id_usuarios = vendas_produtos.id_usuarios where id_vendas = ?;',
                [id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    resolve(results[0])
                });
        });
    },


    alterarcompra: (id, quantidade) => {
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

    alterarEstado: (id, estado) => {
        return new Promise((resolve, reject) => {
            conexao.query('UPDATE vendas SET estado = ? WHERE id_vendas = ?',
                [estado, id],
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