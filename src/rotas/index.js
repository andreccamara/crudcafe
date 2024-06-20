const {Router} = require("express")
const router = Router()

const homeController = require('../controller/homeControler')
const loginController = require('../controller/loginControler')
const produtoController = require('../controller/produtoControler')
const clienteController = require('../controller/clienteControler')

const produto = require("../Model/produto")

// login
router.get('/', homeController.home)
router.post('/login', loginController.autenticacao)
router.get('/logout', loginController.logout)
router.get('/main', loginController.main)
// login cliente
router.get('/main2', loginController.main2)

// form
router.get('/produto/form', produtoController.form)

// produto
// criar
router.post('/produto/createProduto', produtoController.createProduto)

//editar
router.get('/produto/editar/:id_produto', produtoController.editarProduto)
router.post('/produto/alterar/:id_produto', produtoController.alterarProduto) 

//deletar
router.get('/produto/deletar/:id_produto', produtoController.deletarProduto)

// comprar
router.get('/comprar/form/:id_produto', clienteController.comprarform)
router.post('/comprar/comprar/:id_produto', clienteController.comprarProduto)
//listar compras
router.get("/compras/listar", clienteController.comprasListar)
//confirmar compra
router.get('/compra/confirmar/:id',clienteController.confirmarCompra)
//editar compras
router.get('/compra/editar/:id_venda', clienteController.editarCompra)
router.post('/compra/alterar/:id_venda', clienteController.alterarCompra) 

//excluir compras
router.get('/compra/deletar/:id_venda', clienteController.deletarCompra)


module.exports = router 

