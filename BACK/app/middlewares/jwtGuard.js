import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

dotenv.config();

export const jwtGuard = async (req, res, next) => {
    try {
        const tokenAuth = req.headers.authorization;

        // 1- Récupérer le token dans les headers de la requête (authorization) un if avec deux fonctionnalité
        if (!tokenAuth || !tokenAuth.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Accès non autorisé - Token manquant ou incorrect' });
        }

        // et vérifier qu'il commence bien par 'Bearer'
        // if (!tokenAuth.startsWith('Bearer ')) {
        //     // //si le token ne commence pas par 'bearer'renvoyer tokken incorrect
        //     throw new InvalidTokenError('Token incorrect');
        // }

    
        const token = tokenAuth.split(' ')[1];

        // 4- Vérifier que le token est correct (jwt.verify),
        const payload = await jwt.verify(token, process.env.SECRET);

        // si mon admin ou mon provider est retirer de la liste des authorisés alors il n'a plus accès au site/à son compte.
        // en fonction de l'id qui est dans le token ce qui posait problème de sécurité
        const user = await User.findByPk(payload.userId, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(401).json({ message: 'Accès non autorisé - Token non valide' });
        }

        req.user = user;

        // Si tout va bien on passe au middleware suivant
        next();
    } catch (error) {
        if (error instanceof MissingTokenError) {
            res.status(401).json({ message: error.message });
        } else if (error instanceof InvalidTokenError) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(401).json({ message: 'Accès non autorisé - Erreur inattendue' });
        }
    }
}

class MissingTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingTokenError';
    }
}

class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidTokenError';
    }
}
