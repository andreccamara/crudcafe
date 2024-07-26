const { Router } = require("express");
const router = Router();

// controlers
const homeController = require('../controller/homeControler');
const loginController = require('../controller/loginControler');
const produtoController = require('../controller/produtoControler');
const compraController = require('../controller/compraControler');
const admController = require('../controller/admControler');
const enderecoController = require('../controller/enderecoControler');

// middlewares
const { isAuthenticated, isAdmin, isControler } = require('../middlewares/authMiddleware');

// Rotas

// Rotas públicas
// login
router.get('/', homeController.home);
router.post('/login', loginController.autenticacao);


// cadastrar novo usuario
 router.get('/formCadastrarNovoUsuario', loginController.formCadastrarUsuario);

 router.post('/cadastrar/usuario', loginController.cadastrarusuario);


// Rotas de login
router.get('/logout', loginController.logout);
router.get('/main', isAuthenticated, isAdmin, loginController.main);

// Rota protegida por autenticação
router.get('/main2', loginController.main2);
router.get('/main2/:erro', loginController.main2erro);



// Rotas protegidas por autenticação e autorização de administrador


// Rota de crud produto
router.get('/produto/form', isAuthenticated, isAdmin, produtoController.form);
router.post('/produto/createProduto', isAuthenticated, isAdmin, produtoController.createProduto);
router.get('/produto/editar/:id_produto', isAuthenticated, isAdmin, produtoController.editarProduto);
router.post('/produto/alterar/:id_produto', isAuthenticated, isAdmin, produtoController.alterarProduto);
router.get('/produto/deletar/:id_produto', isAuthenticated, isAdmin, produtoController.deletarProduto);

// Rotas protegidas por autenticação

// Rotas de crud compra
router.get('/compras/listar', compraController.comprasListar);
router.get('/compra/form/:id_produto', isAuthenticated, compraController.comprarform);
router.post('/compra/compra/:id_produto', isAuthenticated, compraController.comprarProduto);
router.get('/compra/confirmar/:id', isAuthenticated, compraController.confirmarCompra);
router.get('/compra/editar/:id_venda', isAuthenticated, compraController.editarCompra);
router.post('/compra/alterar/:id_venda', isAuthenticated, compraController.alterarCompra);
router.get('/compra/deletar/:id_venda', isAuthenticated, compraController.deletarCompra);
router.get('/compra/ver/:id_venda', compraController.vercompra);


// endereço da entrega da compra

router.get('/compra/selecionarEndereco/:id_vendas', isAuthenticated, enderecoController.confirmarEndereco);

router.get('/endereco/formCadastrar', isAuthenticated, enderecoController.formCadastrarEndereco);

router.post('/endereco/cadastrar', isAuthenticated, enderecoController.CadastrarEndereco);
// selecionar o endereço da compra
router.get('/compra/EnderecoConfirmar/:id_venda/:id_endereco', isAuthenticated, enderecoController.SelecionarEndereco);


// router.get('/compra/confirmada/deletar/:id_venda', isAuthenticated, compraController.deletarCompraconfirmada);

// Rotas protegidas por autenticação e autorização de controlador
// Rota de crud de funcionarios
router.get('/funcionario/formCadastrarNovoAdmin', isAuthenticated, isAdmin, isControler, admController.formCadastrarAdministrador);
router.post('/funcionario/CadastrarNovoAdmin', isAuthenticated, isAdmin, isControler, admController.cadastrarAdmin);
router.get('/funcionario/VerAdmin', isAuthenticated, isAdmin, isControler, admController.funcionarios);
router.get('/funcionario/deletar/:id_funcionario', isAuthenticated, isAdmin, isControler, admController.deletarFuncionario);

// Rotas de crud de pedidos/compras
router.get('/compras/listar/todas', isAuthenticated, isAdmin, admController.listarTodasAsCompras);
router.post('/compra/alterarestado/:id_venda', isAuthenticated, isAdmin, admController.alterarEstadoCompra);
router.get('/compra/estado/form/:id_venda', isAuthenticated, isAdmin, admController.formEstadoCompra);

module.exports = router;
