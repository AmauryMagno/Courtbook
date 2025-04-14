export function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, 'seu_segredo');
        req.user = decoded;
        next();  
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido.' });
    }
}

