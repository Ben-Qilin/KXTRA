const roles = {
    admin: 'admin',
    user: 'user',
    provider: 'provider'
};

//? fonction role (pour la gestion des rôles) 
//? qui attend en paramètre le role de l'admin qui créer d'un nouveau provider/admin.
function adminCheckRole(role) {
    return function (req, res, next) {

        // ? si le role fourni est admin
        if (req.user.role === roles.admin) {
            // ? alors il peut créer un provider 
            // ?(nom de la "const" modifiable selon evolution:éventuellement un autre admin ou user)
            const provider = new User();
            provider.create({
                role: roles
            });
        } else {
            res.status(403).send('Accès refusé');
        }
    }
}
export default adminCheckRole;