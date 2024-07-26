const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./infraestrutura/conexao');
const multer = require('multer');
// const flash = require('connect-flash');

const app = express();

const router = require('./rotas/index');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/')); 
        // Caminho absoluto até a pasta 'uploads'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware para configurar o Multer
app.use(upload.single('imagem'));

//Configurações do serviço
// app.use(bodyParser.json());


app.use(express.json());
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));

// flash
// app.use(flash());
// // Middleware para passar mensagens flash para todas as rotas
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     next();
//   });

// Configuração da sessão depois da configuração de serviço
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Altere para true se estiver usando HTTPS

}));

app.use(router)

app.listen(8080, () => {
    console.log('http://localhost:8080')
})



