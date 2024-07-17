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
    }
}
