const compras = require('../Model/compras');
const produto = require('../Model/produto');


module.exports = {
    //comprar
    comprarform: async (req, res) => {
        const id_produto = req.params.id_produto
        try {
            const venda = await compras.selecionarproduto(id_produto);
            req.session.valor = venda.valor
            res.render('compras/formComprar', { venda })
        } catch (error) {
            console.error('Erro:', error);
            let erro = 'Erro';
            res.render('home2', { erro: erro });
        }
    },


    comprarProduto: async (req, res) => {
        let id_produto = req.params.id_produto
        let quantidade = req.body.quantidade
        let produtoinfo = await produto.ver(id_produto)
        let valor= produtoinfo.valor
        let id_usuario = req.session.id_usuario
        await compras.comprar(id_produto, quantidade, valor, id_usuario)
        return res.redirect('/compras/listar')
    },


    //confirmar a compra

    confirmarCompra: async (req, res) => {
        let id_compra = req.params.id
        await compras.confirmarCompra(id_compra)
        return res.redirect("/compras/listar")
    },

    // cadastrar o endereco

x: async (req, res) => {

    return res.redirect("/compras/listar")
},

  
    //listar compras
    comprasListar: async (req, res) => {
        let id_usuario = req.session.id_usuario
        const lista_de_compras = await compras.buscarCompras(id_usuario)
        const nome = req.session.nome
        res.render('compras/compras', { lista_de_compras, nome })
    },

    //editar a compra
    editarCompra: async (req, res) => {
        let id_venda = req.params.id_venda;
        console.log('idvenda= ', id_venda);
        try {
            const resultados = await compras.conferir(id_venda);
            const conferir = resultados[0];

            if (conferir.estado != 'nao confirmado' && req.session.categoria == 0) {
                console.log('nao pode editar')
                return res.redirect("/compras/listar")
            } else {
                const compra = await compras.compraProduto(id_venda);
                console.log('agora renderiza:')
                res.render('compras/formCompraEditar', { compra });
            }
        } catch (error) {
            console.error('Erro ao editar compra:', error);
            let erro = 'Erro ao editar compra';
            res.render('home2', { erro: erro });
        }
    },

    vercompra: async (req, res) => {
        let id_venda = req.params.id_venda;
        try {
            const compra = await compras.compraProduto(id_venda);
            const endereco = await compras.compraEndereco(id_venda);
            console.log(endereco)
            res.render('compras/verCompra', { compra, endereco});
        } catch (error) {
            console.error('Erro ao localizar compra:', error);
            let erro = 'Erro ao localizar compra';
            res.render('home2', { erro: erro });
        }
    },

    //alterar a compra
    alterarCompra: async (req, res) => {
        let id_venda = req.params.id_venda
        let quantidade = req.body.quantidade
        await compras.alterarcompra(id_venda, quantidade)

        return res.redirect("/compras/listar")
    },
    //excluir a compra
    deletarCompra: async (req, res) => {
        let id_venda = req.params.id_venda;
        try {
            const resultados = await compras.conferir(id_venda); const conferir = resultados[0];
            if (conferir.estado != 'nao confirmado') {
                // usuario comprador nao pode deletar
                return res.redirect("/compras/listar");
            } else {
                // Deletar o produto e obter o nome da imagem
                await compras.delete(id_venda);
                console.log('sucesso ao cancelar compra')
                return res.redirect("/compras/listar");
            }
        } catch (error) {
            console.error('Erro ao deletar a Compra:', error);
            return res.status(500).send('Erro ao excluir a Compra');
        }
    },


}