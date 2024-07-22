// importando conexao
const conexao = require('../infraestrutura/conexao');
// exportando verificação
module.exports = {
    verificacao: (email, senha) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM usuarios WHERE email = ? and senha = ?', [email, senha], (error, results) => {
                if (error) {
                    reject(new Error('sistema indisponivel'));
                    return;
                }
                if (results.length === 0) {
                    resolve(null); // Retorne null se o usuário não for encontrado
                    return;
                }
                resolve(results[0]); // Retorne o usuário encontrado
            });
        });
    },

    verificarCadastrarUsuario: (nome,email,senha) => {
        return new Promise((resolve, reject) => {
            // verificando emial
            console.log('model inicio')
            conexao.query('SELECT * FROM usuarios WHERE email = ?',[email],
                (error, results) => {
                    console.log('modelverificou')
                    if (error) {
                        consolr.log('verificou mas deu erro')
                        return reject(new Error('Erro ao verificar o email: ' + error));
                    }
                    if (results.length > 0) {
                        console.log('emailexiste')
                        // Email já existe
                        return resolve({ sucesso: false, mensagem: 'Email já cadastrado' });
                    } else {
                        // Email não existe, inserir novo usuário
                        console.log('emailnaoexiste')
                        conexao.query('INSERT INTO usuarios (nome, email, senha, categoria) VALUES (?, ?, ?, 0)', [nome, email, senha], (error, results) => {
                            if (error) {

                                return reject(new Error('Erro ao inserir o usuário: ' + error));
                            }
                            resolve({ sucesso: true, mensagem: 'Usuário registrado com sucesso!' });
                        });
                    }
                });
            });
        },
        verificarCadastrarAdministrador: (nome,email,senha) => {
            return new Promise((resolve, reject) => {
                // verificando emial
                console.log('model inicio')
                conexao.query('SELECT * FROM usuarios WHERE email = ?',[email],
                    (error, results) => {
                        console.log('modelverificou')
                        if (error) {
                            consolr.log('verificou mas deu erro')
                            return reject(new Error('Erro ao verificar o email: ' + error));
                        }
                        if (results.length > 0) {
                            console.log('emailexiste')
                            // Email já existe
                            return resolve({ sucesso: false, mensagem: 'Email já cadastrado' });
                        } else {
                            // Email não existe, inserir novo usuário
                            console.log('emailnaoexiste')
                            conexao.query('INSERT INTO usuarios (nome, email, senha, categoria) VALUES (?, ?, ?, 1)', [nome, email, senha], (error, results) => {
                                if (error) {
    
                                    return reject(new Error('Erro ao inserir o usuário: ' + error));
                                }
                                resolve({ sucesso: true, mensagem: 'Usuário registrado com sucesso!' });
                            });
                        }
                    });
                });
            },
            
            buscarFuncionarios: () => {
                return new Promise((resolve, reject) => {
                    conexao.query('SELECT * FROM usuarios where categoria= 1', (error, results) => {
                        if (error) {
                            reject(new Error('Something went wrong'));
                            return;
                        }
                        // console.log("Sucesso ao listar produtos!!");
                        resolve(results);
                    });
                });
            },

            deletarFuncionario: (id_funcionario) => {
                    return new Promise((resolve, reject) => {
                        conexao.query
                        ('DELETE FROM usuarios WHERE id_usuarios = ?', [id_funcionario], (error, results) => {
                                if (error) {
                                    reject(new Error('Something went wrong'));
                                    return;
                                }
                                // console.log("Sucesso ao listar produtos!!");
                                resolve(results);
                            });
                        });
                    },
}
