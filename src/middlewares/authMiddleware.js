function isAuthenticated(req, res, next) {
    if (req.session && req.session.id_usuario) {
        return next();
    } else {
        res.redirect('/');
    }
}

function isAdmin(req, res, next) {
    if (req.session && (req.session.categoria === 1 || req.session.categoria === 3)) {
        return next();
    } else {
        res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');
    }
}

module.exports = {
    isAuthenticated,
    isAdmin
};
