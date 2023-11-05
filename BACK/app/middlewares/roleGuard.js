// Définir les rôles
const roles = ['admin', 'user', 'provider'];


// Middleware pour la gestion des rôles
const roleGuard = () => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).send({message: "Accès refusé : Vous n'avez pas les droits requis pour effectuer cette action."});
            return;
        }
        next();
    }
};

export default roleGuard;