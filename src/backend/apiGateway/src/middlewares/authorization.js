import { config } from 'dotenv';
config();

import jwt, { decode } from 'jsonwebtoken'

export function verificarToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer', '').trim();
    if (!token) {
        return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();  
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido.' });
    }
}

