
// o usuario foi autenticado? se sim prossegue, se não retorna ao login
function isAuthenticated(req, res, next) {
    if (req.session && req.session.id_usuario) {
        return next();
    } else {
        res.redirect('/');
    }
}

//o usuario é administrador?  se sim prossegue, se não manda mensagem de ausencia de permissão 
function isAdmin(req, res, next) {
    if (req.session && (req.session.categoria === 1 || req.session.categoria === 3)) {
        return next();
    } else {
        res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');
    }

//o usuario é o controlador da empresa?  se sim prossegue, se não manda mensagem de ausencia de permissão 
}function isControler(req, res, next) {
    if (req.session && (req.session.categoria === 3)) {
        return next();
    } else {
        res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');
    }
}
// exportando
module.exports = {
    isAuthenticated,
    isAdmin,
    isControler,
};
