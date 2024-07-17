const { Router } = require("express");
const router = Router();

// controlers
const homeController = require('../controller/homeControler');
const loginController = require('../controller/loginControler');
const produtoController = require('../controller/produtoControler');
const compraController = require('../controller/compraControler');
// middlewares
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', homeController.home);
router.post('/login', loginController.autenticacao);


// Rotas protegidas por autenticação
// Rotas de login
router.get('/logout', loginController.logout);
router.get('/main', loginController.main);
router.get('/main2', isAuthenticated, loginController.main2);

// Rota de compra
router.get('/compras/listar', isAuthenticated, compraController.comprasListar);

// Rotas protegidas por autenticação e autorização de administrador
// Rota de produto
router.get('/produto/form', isAuthenticated, isAdmin, produtoController.form);
router.post('/produto/createProduto', isAuthenticated, isAdmin, produtoController.createProduto);
router.get('/produto/editar/:id_produto', isAuthenticated, isAdmin, produtoController.editarProduto);
router.post('/produto/alterar/:id_produto', isAuthenticated, isAdmin, produtoController.alterarProduto);
router.get('/produto/deletar/:id_produto', isAuthenticated, isAdmin, produtoController.deletarProduto);

// Rotas protegidas por autenticação
// compras
router.get('/compra/confirmar/:id', isAuthenticated, compraController.confirmarCompra);
router.get('/compra/editar/:id_venda', isAuthenticated, compraController.editarCompra);
router.post('/compra/alterar/:id_venda', isAuthenticated, compraController.alterarCompra);
router.get('/compra/deletar/:id_venda', isAuthenticated, compraController.deletarCompra);
// router.get('/compra/confirmada/deletar/:id_venda', isAuthenticated, compraController.deletarCompraconfirmada);

module.exports = router;
