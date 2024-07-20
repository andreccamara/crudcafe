const fs = require('fs');
const path = require('path');
const produto = require('../Model/produto');
module.exports = {

    form: (_, res) => {
        res.render('formProdutoCadastrar')
    },

    createProduto: async (req, res) => {
        try {

            let descricao = req.body.descricao;
            let nome = req.body.nome;
            let valor = req.body.valor;
            let imagem = req.file ? req.file.filename : null
            // console.log('Controller de Produto - Criar Produto');
            // console.log(nome, descricao, valor, imagem);

            // Chama a função do modelo para inserir o produto no banco de dados
            await produto.inserirProdutos(descricao, nome, valor, imagem);

            console.log("Produto cadastrado com sucesso");
            return res.redirect('/main');
        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
            res.status(500).send('Erro ao cadastrar o produto');
        }
    },

    alterarProduto: async (req, res) => {
        try {
            let id_produto = req.params.id_produto
            let nome = req.body.nome
            let descricao = req.body.descricao
            let valor = req.body.valor
            let imagem = req.file ? req.file.filename : null            
            console.log("controle2");

            await produto.alterar(id_produto, nome, descricao, valor, imagem)
            console.log("Produto editado com sucesso");

            return res.redirect('/main');
        } catch (error) {
            console.error('Erro ao editar o produto:', error);
            res.status(500).send('Erro ao editar o produto');
        }
    },

    editarProduto: async (req, res) => {
        let id_produto = req.params.id_produto
        const produtos = await produto.editar(id_produto)
        //console.log(turma)
        res.render('formProdutoEditar', { produtos })
    },


    deletarProduto: async (req, res) => {
        let id_produto = req.params.id_produto;

        try {
            // Deletar o produto e obter o nome da imagem
            const imagem = await produto.delete(id_produto);
            console.log(imagem)
            if (imagem) {
                // Caminho da imagem
                const imagemPath = path.resolve(__dirname, '../../src/uploads', imagem);
                console.log(imagemPath)
                // Deletar a imagem do diretório uploads
                fs.unlink(imagemPath, (err) => {
                    if (err) {
                        console.error('Erro ao deletar a imagem:', err);
                        // Note que não retornamos um erro aqui para não interromper o fluxo de deletar o produto
                    } else {
                        console.log('Imagem deletada com sucesso');
                    }
                });
            }

            return res.redirect('/main');
        } catch (error) {
            console.error('Erro ao deletar o produto:', error);
            return res.status(500).send('Erro ao deletar o produto');
        }
    }
}
