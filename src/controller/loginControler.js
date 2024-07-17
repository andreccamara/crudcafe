// importando
const login = require('../Model/login');
const produto = require('../Model/produto')
const session = require('express-session');

// exportando
module.exports = {
    autenticacao: async (req, res) => {
        const email = req.body.email;
        const senha = req.body.senha;
        try {
            const usuario = await login.verificacao(email, senha);

            if (usuario) {
                req.session.id_usuario = usuario.id_usuarios; // Armazene na sessão
                req.session.nome = usuario.nome; // Armazene na sessão
                req.session.categoria = usuario.categoria; // Armazene a categoria na sessão

                if (usuario.categoria == 1) {
                    res.redirect('/main');
                } else if (usuario.categoria == 0) {
                    res.redirect('/main2');
                } else {
                    let erro = 'Usuário errado';
                    res.render('home2', { erro: erro });
                }
            } else {
                let erro = 'Usuário não encontrado';
                res.render('home2', { erro: erro });
            }
        } catch (error) {
            console.error('Erro na autenticação:', error);
            let erro = 'Erro na autenticação';
            res.render('home2', { erro: erro });
        }
    },

    logout: (req, res) => {
        console.log('Sessão antes de destruir:', req.session); // Log correto
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao destruir a sessão:', err);
                return res.status(500).send('Erro ao encerrar a sessão');
            }
            // Limpa o cookie da sessão
            res.clearCookie('connect.sid');
            console.log('Sessão destruída');
            res.redirect('/');
        });
    },
    
    main: async (req, res) => {  
        const produtos = await produto.buscarProdutos(); 
        res.render('main', { nome: req.session.nome, produtos });
    },
    
    
    main2: async (req, res) => {  
        const produtos = await produto.buscarProdutos() 
        res.render('main2', { nome: req.session.nome, produtos });
    }

}