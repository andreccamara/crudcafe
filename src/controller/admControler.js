// importando
const login = require('../Model/login');
const produto = require('../Model/produto')
const compras = require('../Model/compras')

// exportando
module.exports = {

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
            // Deletar o produto e obter o nome da imagem
            const imagem = await login.deletarFuncionario(id_funcionario);
            return res.redirect('/main');
        } catch (error) {
            console.error('Erro ao deletar o funcionario:', error);
            return res.status(500).send('Erro ao deletar o funcionario');
        }
    },

    formCadastrarAdministrador: (_, res) => {
        res.render('formCadastrarAdministrador', { mensagem: null });
    },

    cadastrarAdmin: async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            const resultado = await login.verificarCadastrarAdministrador(nome, email, senha);
            // console.log('cadastrar usuario controler')
            if (resultado.sucesso) {
                res.redirect('/main'); // Redireciona para a página de login após o registro bem-sucedido
            } else {
                res.render('formCadastrarAdministrador', { mensagem: resultado.mensagem }); // Renderiza a página de registro com a mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao registrar administrador:', error);
            res.render('formCadastrarAdministrador', { mensagem: 'Erro ao registrar administrador.' });
        }
    },

    listarTodasAsCompras: async (req, res) => {
        const lista_de_compras = await compras.buscarTodasAsCompras()
        const nome = req.session.nome
        res.render('administracao/todasCompras', { lista_de_compras, nome })
    },


    formEstadoCompra: async (req, res) => {
        let id_venda = req.params.id_venda;
        try {
            const compra = await compras.verCompra(id_venda);
            res.render('compras/formCompraEstado', { compra });
        }
        catch (error) {
            console.error('Erro ao editar compra:', error);
            let erro = 'Erro ao editar compra';
            res.render('home2', { erro: erro });
        }
    },

    alterarEstadoCompra: async (req, res) => {
        let id_venda = req.params.id_venda
        const estado = req.body.estado;
        await compras.alterarEstado(id_venda, estado)

        return res.redirect("/compras/listar/todas")
    },

}