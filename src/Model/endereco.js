 
 
const conexao = require('../infraestrutura/conexao');
const session = require('express-session');


module.exports = {
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
}