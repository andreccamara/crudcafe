const conexao = require('../infraestrutura/conexao');
const session = require('express-session');


module.exports = {
    verificacao: (email, senha) => {
        return new Promise((resolve, reject) => {
            console.log(email, senha)    
            conexao.query('SELECT * FROM usuarios WHERE email = ? and senha = ?', [email, senha], (error, results) => {
                if (error) {
                    console.log('x')
                    reject(new Error('sistema indisponivel'));
                    return;
                }
                if (results.length === 0) {
                    results = [{ id_usuarios: '0', nome: '0' }];
                    session.id_usuario = results.id_usuarios;
                    session.nome = results.nome;
                    resolve(results);
                    return;
                }
                const usuario = results[0];
                // Store user details in session 
                session.id_usuario = usuario.id_usuarios;
                session.nome = usuario.nome;
                console.log("Sucesso ao entrar !!");
                resolve(usuario);
            });
        });
    }
}
