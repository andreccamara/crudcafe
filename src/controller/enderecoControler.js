const compras = require('../Model/compras');
const produto = require('../Model/produto');


module.exports = {

confirmarEndereco: async (req, res) => {
    const id_usuario = req.session.id_usuario;
    const id_vendas = req.params.id_vendas;
    try {
        // Procurando se o usuário já cadastrou outro endereço
        const endereco_usuario = await compras.EnderecosDoUsuario(id_usuario);
        if (endereco_usuario && endereco_usuario.length > 0) {
            // Pegando os dados da compra
            const compra = await compras.verCompra(id_vendas);
            console.log(compra);
            console.log(endereco_usuario);
            // Redireciona para a lista de compras
            
            return res.render("enderecos/selecionarEndereco",{compra, endereco_usuario});
        } else {
            console.log('cadastrar primeiro');
            // Renderiza o formulário de cadastro de endereço
            res.render('enderecos/CadastrarEnderecoForm', { id_usuario });
        }
    } catch (error) {
        console.log('deu ruim qual o erro?');
        console.error('Erro:', error);
        let erro = 'Erro';
        res.redirect('/main2/?erro=' + encodeURIComponent(erro));
    }
},



CadastrarEndereco: async (req, res) => {
    let { cep, estado, cidade, bairro, rua, numero, complemento } = req.body
    let id_usuario = req.session.id_usuario
    let endereco = [cep, estado, cidade, bairro, rua, numero, complemento, id_usuario]
    await compras.cadastrarEndereco(endereco)
    return res.redirect('/compras/listar')
},

SelecionarEndereco: async (req, res) => {
    let id_venda = req.params.id_venda
    let id_endereco = req.params.id_endereco
    console.log('primeiro',id_endereco,id_venda)
    let redirecionar= '/compra/ver/'+ id_venda
    console.log(redirecionar)
    try {
        await compras.selecionarEndereco(id_endereco, id_venda)
            return res.redirect(redirecionar)

    } catch (error) {
        console.error('Erro ao editar compra:', error);
        let erro = 'Erro ao editar compra';
        res.render('/main2', { erro: erro });
    }
},

formCadastrarEndereco:  (_,res) => res.render('enderecos/CadastrarEnderecoForm'),


BuscarEndereco: async (req, res) => {
    let id_usuario = req.session.id_usuario
    const lista_de_Endereco = await compras.buscarEndereco(id_usuario)
    const nome = req.session.nome
    res.render('compras/compras', { lista_de_Endereco, nome })
},
}