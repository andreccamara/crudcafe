// importando
const login = require('../Model/login');
const produto = require('../Model/produto')
const session = require('express-session');

// exportando
module.exports = {
    // essa função vai pesquisar no BD para ver se as informações encontram correspondencia
    autenticacao: async (req, res) => {
        const email = req.body.email;
        const senha = req.body.senha;
        try {
            // login.verificacao(email, senha) procura no BD se há dados com as informações do email e da senha fornecidos
            const usuario = await login.verificacao(email, senha);
// aqui, se der certo encontrar um usuario com as informações fornecidas, redireciona-se para a pagina correspondente a sua categoria
            if (usuario) {
                req.session.id_usuario = usuario.id_usuarios; // Armazene na sessão
                req.session.nome = usuario.nome; // Armazene na sessão
                req.session.categoria = usuario.categoria; // Armazene a categoria na sessão

                if (usuario.categoria == 1) {
                    res.redirect('/main');
                } else if (usuario.categoria == 0) {
                    res.redirect('/main2');
                } else if (usuario.categoria == 3) {
                    res.redirect('main')
                } else {
                    let erro = 'categoria desconhecida';
                    res.render('home2', { erro: erro });
                }
            } else {
                let erro = 'Email ou senha incorretos';
                res.render('home2', { erro: erro });
            }
        } catch (error) {
            console.error('Erro na autenticação:', error);
            let erro = 'Erro na autenticação';
            res.render('home2', { erro: erro });
        }
    },

    logout: (req, res) => {
        // aqui é o logout para sair da sessao
        // console.log('Sessão antes de destruir:', req.session);
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
        try {
            // aqui se faz uma pesquisa sql para pegar informações de todos os produtos
            const produtos = await produto.buscarProdutos();
            // aqui devolve-se as informações para o frontend que as renderizará
            res.render('administracao/administracao', { nome: req.session.nome, produtos, categoria: req.session.categoria });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).send('Erro ao carregar a página principal.');
        }
    },
    
    funcionarios: async (req, res) => {
        try {

            const funcionarios = await login.buscarFuncionarios();
            res.render('funcionarios', { nome: req.session.nome, funcionarios, categoria: req.session.categoria });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).send('Erro ao carregar a página principal.');
        }
    },

    deletarFuncionario: async (req, res) => {
        let id_funcionario = req.params.id_funcionario;

        try {
            // o model vai Deletar o cadastro do funcionario selecionado
            const funcionario = await login.deletarFuncionario(id_funcionario);
            return res.redirect('/main');
        } catch (error) {
            console.error('Erro ao deletar o funcionario:', error);
            return res.status(500).send('Erro ao deletar o funcionario');
        }
    },
// entrando no form de cadastro:
    formCadastrarUsuario: (req, res) => {
        res.render('formCadastrarUsuario', { mensagem: null});
    },
    formCadastrarAdministrador: (_, res) => {
        res.render('administracao/formCadastrarAdministrador', { mensagem: null});
    },

    cadastrarusuario: async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            // antes de cadastrar o model vai verificar se o email já não está cadastrado
            const resultado = await login.verificarCadastrarUsuario(nome, email, senha);
            if (resultado.sucesso) {
                // Redireciona para a página de login após o registro bem-sucedido
                res.redirect('/'); 
            } else {
                res.render('formCadastrarUsuario', { mensagem: resultado.mensagem }); // Renderiza a página de registro com a mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.render('formCadastrarUsuario', { mensagem: 'Erro ao registrar usuário.' });
        }
    },
    cadastrarAdmin: async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            const resultado = await login.verificarCadastrarAdministrador(nome, email, senha);
            // console.log('cadastrar usuario controler')
            if (resultado.sucesso) {
                res.redirect('/main'); // Redireciona para a página de login após o registro bem-sucedido
            } else {
                res.render('administracao/formCadastrarAdministrador', { mensagem: resultado.mensagem }); // Renderiza a página de registro com a mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao registrar administrador:', error);
            res.render('administracao/formCadastrarAdministrador', { mensagem: 'Erro ao registrar administrador.' });
        }
    },
//renderizar a pagina de catalogo de produtos para os compradores 
    main2: async (req, res) => {
        try {
            // pesquisa no model todos os produtos e retorna o resultado
            const produtos = await produto.buscarProdutos()
            // entrega as informações para o frontend ejs
            res.render('produtos/produtos', { nome: req.session.nome, produtos, erro: null });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).send('Erro ao carregar a página principal.');
        }
    },
    main2erro: async (req, res) => {
        try {
            // pesquisa no model todos os produtos e retorna o resultado
            const produtos = await produto.buscarProdutos()
            const erro = req.params.erro
            // entrega as informações para o frontend ejs
            res.render('produtos/produtos', { nome: req.session.nome, produtos, erro });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).send('Erro ao carregar a página principal.');
        }
    }
}