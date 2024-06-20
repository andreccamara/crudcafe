const login = require('../Model/login');
const produto = require('../Model/produto')
const session = require('express-session');


module.exports = {
    logout: (req, res) =>
    {
        req.session.destroy((err) =>
        {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    },
    autenticacao: async (req, res) => {
       // console.log('controlador')
        const email = req.body.email;
        const senha = req.body.senha;
        console.log(email, senha)
        try {
            const usuario = await login.verificacao(email, senha);

            if (usuario) {
                if (usuario.categoria == 1) {
                    res.redirect('/main');
                } else if (usuario.categoria == 0) {
                    session.id_cliente=usuario.id_usuarios
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


    main: async (_, res) => {  
        const produtos = await produto.buscarProdutos() 
        res.render('main', { nome: session.nome, produtos });
    },
    
    main2: async (_, res) => {  
        const produtos = await produto.buscarProdutos() 
        res.render('main2', { nome: session.nome, produtos });
    }

}