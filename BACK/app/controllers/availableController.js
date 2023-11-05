import * as models from '../models/index.js';

export const availableController = {
    // ! il faut un get pour récuperer la quantité actuelle du package
    availabilityManagement: async (req, res) => {
        try {

            // ! Démarche pour décrémenter le stock (name - PurchaseController)
            // j'appuis sur le bouton
            // je regarde en bdd si l'id correspond à un id qui correspond à un package
            // Récupérer l'ID du package depuis les paramètres de la requête
            const packageId = req.params.id;
            console.log(req.params)
            if (!packageId) {
                return res.status(400).json({ message: "ID invalide - requis" });
            }
            // Vérifier si c'est un nombre valide
            if (isNaN(packageId)) {
                return res.status(400).json({ message: "Ce n'est pas un nombre valide" });
            }

            // Rechercher le package dans la base de données
            const packageFound = await models.Package.findByPk(packageId);

            if (!packageFound) {
                return res.status(404).json({ message: "Package non trouvé" });
            }

            // si il nous retour un package il existe

            // Récupérer la quantité demandée par l'utilisateur depuis le corps de la requête
            const purchaseQuantity = req.body.quantity;

            // Vérifier si la quantité en stock est suffisante
            if (packageFound.quantity < purchaseQuantity) {
                return res.status(404).json({ message: "La quantité demandée n'est pas disponible" });
            }
            // Mettre à jour la quantité en stock
            packageFound.quantity -= purchaseQuantity;

            // Sauvegarder la mise à jour dans la base de données
            await packageFound.save();

            if (packageFound.quantity === 0) {
                await packageFound.destroy();
            }



            // Répondre avec la nouvelle quantité en stock
            return res.status(200).json({ newQuantity: packageFound.quantity });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: error.message });
        }
    },
}

export default availableController;
