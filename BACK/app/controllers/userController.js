import { calculatePrice } from '../../utils/CalculatePrice.js';
import * as models from '../models/index.js';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer'
// import availableController from './availableController.js';

export const userController = {

    profile: async (req, res) => {
        // Vous pouvez directement renvoyer l'objet de l'utilisateur en réponse
        res.json(req.user);
    },

    addPurchase: async (req, res) => {

        const {
            quantity,
            price,
            date_start,
            date_end,
            hour_start,
            hour_end,
            package_id
        } = req.body;
        const user_id = req.user.id;
        const user_mail = req.user.email
        try {
            const purchase = await models.Purchase.create({
                quantity,
                price,
                date_start,
                date_end,
                hour_start,
                hour_end,
                user_id
            })
            

            //si la quantité dasn le panier est supérieur à 1 
            if (purchase.quantity > 1) {
                //je crée une constante updatePrice dans laquelle je stocke la fonction calculatePrice permettant de calcule le prix * la quantité du forfait sélectionné
                const updatePrice = calculatePrice(price, quantity);
                console.log(`Le prix total est de ${updatePrice} euros.`);
            }
            //si la quantité est inférieur à 1 
            else if (purchase.quantity < 1) {
                console.log("La quantité doit être supérieure à 1 pour calculer le prix.");
                //je renvoie une erreur
                return res.status(404).json({ message: "La quantité doit être supérieure à 1 pour calculer le prix." });
            }
            
            res.status(201).json({ message: "The purchase is created.", purchase: purchase });
            

        } catch (error) {
            res.status(401).json({ errorMessage: error.message })
        }
        //!
        const pkg = await models.Package.findOne({ 
            where: { id: package_id },
            include: [
                {
                    as: 'services',
                    model: models.Service,
                    include: [
                        {
                            as: 'institution',
                            model: models.Institution
                        }
                    ]
                }
            ]
        });
        const sendEmail = async function (to, subject, text, html) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: process.env.SMTP_SECURE === 'true', // Utilisez "secure: true" pour activer TLS
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            })

            // Options de l'e-mail
            const mailOptions = {
                from: process.env.SMTP_EMAIL,
                to: to,
                subject: subject,
                text: text,
                html: html,
            }

            // Envoyer l'e-mail de validation
            try {
                let info = await transporter.sendMail(mailOptions);
                console.log('E-mail de validation de commande envoyé : ' + info.response);
            } catch (error) {
                console.log('Erreur lors de l\'envoi de l\'e-mail : ' + error);
            }
        };

        // Exemple d'utilisation
        const recipients = [user_mail, 'alain.provistdu69@gmail.com'];
        const iconMail = "https://drive.google.com/uc?export=view&id=1rJfMEmfZfhthAzqikaWqG66jLxkhMU4P";

        recipients.forEach((recipient) => {
            const subject = 'Validation de commande chez Qualiextra ';
            
            const text = 'Cet e-mail est envoyé automatiquement pour vous faire le récapitulatif de votre commande passée chez Qualiextra.';
            const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Validation de commande passée chez Qualiextra</title>
        </head>
        <body style="display: flex; flex-direction: column; align-items: center; gap: 3rem; font-family:'Segoe UI', sans-serif; background-color: #241e4e; padding: 1rem;">
<div style="display: flex; flex-direction: column; align-items: center;">
    <img class="logo" src=${iconMail} alt="Logo qualiextra" style="width: 6rem; object-fit: cover; display: block; border-radius: 1rem; margin:1rem; text-align: center;"></img>
    <h1 style="color: orangered; text-align: start;">Commande validée</h1>
</div>
<div style="background-color: white; border-radius: 1rem; padding: 1rem; border: 3px solid  rgba(255, 255, 255, 0.373); margin:1rem;" >
    <img src=${pkg.services[0].institution.cover} style="height:8rem; width:100%; border-radius: 0.7rem; object-fit: cover; display: block; object-position: center;"></img>
    <div style="background-color: #241e4e; border-radius: 0.7rem; padding: 1rem; color: white; margin-top: 1rem;">
    <p>Voici le récapitulatif de votre commande :</p>
    
    <p>Package choisi: ${pkg.name_pkg}</p>
    <p>Etablissement: ${pkg.services[0].institution.name_ins}</p>
    <p>Adresse: ${pkg.services[0].institution.adress_ins},${pkg.services[0].institution.city_ins}${pkg.services[0].institution.cp_ins}</p>
    <p>Quantité : ${quantity}</p>
    <p>Prix : ${price} €</p>
    <p>Date de début : ${date_start}</p>
    <p>Date de fin : ${date_end}</p>
    <p>Services inclus dans le package: ${pkg.services[0].name_serv}</p>
    ${pkg.service && pkg.service[1] ? "<p>" + pkg.service[1].name_serv + "</p>" : ''}

    <p>Heure de début : ${pkg.services[0].hour_start}</p>
    <p>Heure de fin : ${pkg.services[1] ? pkg.services[1].hour_end : pkg.services[0].hour_end}</p>
    </div>
</div>
<div style="">
        <p style="color: white;">Cet e-mail est envoyé automatiquement pour vous faire le récapitulatif de votre commande passée chez Qualiextra.</p>
        <p style="color: orangered;">Merci de nous faire confiance !</p>
</div>
</body>
        
        </html>
        `;


            sendEmail(recipient, subject, text, html, price, date_end, date_start, quantity);
        });
        //!
    },
    addPackageToPurchase: async (req, res) => {
        const {
            purchaseId,
            packageId

        } = req.body;

        try {
            if (!packageId || !purchaseId) {
                return res.status(404).json({ message: "Le package ou le service n'a pas été trouvé." });
            }

            if (!parseInt(packageId) || !parseInt(purchaseId)) {
                return res.status(403).json({ message: "Données non valides" });
            }
            const purchaseFound = await models.Purchase.findByPk(purchaseId);
            const packageFound = await models.Package.findByPk(packageId);


            if (!packageFound || !purchaseFound) {
                res.status(404).json({ message: "Package ou service non trouvé" });
            }

            await purchaseFound.addPackage(packageFound);
            res.status(201).json('Le service a été ajouté au package avec succès');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllPurchases: async (req, res) => {
        try {
            const purchases = await models.Purchase.findAll({
                include: [{
                    model: models.User,
                    as: 'user'
                }, {
                    as: 'packages',
                    model: models.Package,
                    include: [{
                        model: models.Service,
                        as: 'services',
                        include: [{
                            model: models.Institution,
                            as: 'institution'
                        }]
                    }]
                }]
            });
            res.json(purchases);
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    getAllPurchasesByUserId: async (req, res) => {
        try {
            const userId = req.user.id;
            if (!userId) {
                return res.status(401).json({ message: "L'utilisateur n'a pas été trouvé" });
            }

            const purchases = await models.Purchase.findAll({
                where: {
                    user_id: userId,
                },
                // Vous pouvez utiliser simplement "include" pour charger l'utilisateur associé
                include: {
                    as: "user",
                    model: models.User,
                },
                include: {
                    as: "packages",
                    model: models.Package,
                    include: {
                        as: "services",
                        model: models.Service,
                        include: {
                            as: 'institution',
                            model: models.Institution
                        }
                    }
                },

            });

            res.json(purchases);
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    getOnePurchaseByUserId: async (req, res) => {
        try {
            const userId = req.user.id;
            if (!userId) {
                return res.status(401).json({ message: "L'utilisateur n'a pas été trouvé" });
            }

            const purchaseId = req.params.purchaseId; // Obtenez l'ID de l'achat à partir des paramètres d'URL

            const purchase = await models.Purchase.findOne({
                where: {
                    id: purchaseId,
                    user_id: userId,
                },
                include: {
                    as: "user",
                    model: models.User,
                },
            });

            res.json(purchase);
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    getOnePurchase: async (req, res) => {
        try {
            const purchaseId = req.params.purchaseId; // Obtenez l'ID de l'achat à partir des paramètres d'URL

            const purchase = await models.Purchase.findByPk(purchaseId);

            if (!purchase) {
                return res.status(404).json({ message: "L'achat n'a pas été trouvé." });
            }

            res.json(purchase);
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    updatePurchase: async (req, res) => {
        //je récupère le purchaseId dans les paramètres
        const { purchaseId } = req.params;
        //je récupère les 
        const {
            price,
            quantity,
            date_start,
            date_end,
            hour_start,
            hour_end,
        } = req.body;

        try {

            const purchase = await models.Purchase.findByPk(purchaseId);

            if (!purchase) {
                return res.status(404).json({ message: "The purchase is not found." });
            }

            // Récupérer les forfaits associés à l'achat
            // const packages = await models.Package.getPackages();

            // Vérifier la disponibilité des forfaits
            // const availablePackage = await availabilityManagement(req, res, packages);
            // console.log(availablePackage);

            purchase.price = price;
            purchase.quantity = quantity;
            purchase.date_start = date_start;
            purchase.date_end = date_end;
            purchase.hour_start = hour_start;
            purchase.hour_end = hour_end;

            // Enregistrez les modifications dans la base de données
            await purchase.save();

            return res.status(200).json({ message: "L'achat a été modifié." });

        } catch (error) {
            return res.status(401).json({ errorMessage: error.message });
        }
    },

    deletePurchase: async (req, res) => {
        const { purchaseId } = req.params;
        try {
            // Recherchez le client dans la base de données
            const purchase = await models.Purchase.findByPk(purchaseId);

            if (!purchase) {
                return res.status(404).json({ message: "The purchase is not found." });
            }

            // supprimer dans la base de données
            //!methode destroy et pas delete
            await purchase.destroy();

            // Répondez avec le client est supprimé
            return res.status(200).json({ message: "The purchase is deleted." });
        } catch (error) {
            return res.status(500).json({ errorMessage: error.message });
        }
    },

    // Déclaration de la fonction de recherche. C'est une fonction asynchrone qui prend en paramètre une requête (req) et une réponse (res).
    search: async (req, res) => {
        // Extraction des paramètres de la requête. Ces paramètres sont passés dans l'URL de la requête.
        const { arrivalDate, leaveDate, members, keywords } = req.query;

        // Bloc try...catch pour gérer les erreurs potentielles qui peuvent se produire lors de l'exécution du code à l'intérieur du bloc try.
        try {
            const dateStart = new Date(arrivalDate);
            const dateEnd = new Date(leaveDate);

            if (isNaN(dateStart) || isNaN(dateEnd)) {
                return res.status(400).json({ message: "Les dates fournies ne sont pas valides." });
            }

            if (dateEnd < dateStart) {
                return res.status(404).json({ message: "La date de fin de séjour doit être supérieure ou égale à la date de début de séjour." });
            }

            // Recherche dans la base de données des forfaits qui correspondent aux critères spécifiés dans l'objet where.
            const results = await models.Package.findAll({
                where: {
                    // La date de début du forfait doit être supérieure ou égale à la date de départ spécifiée.
                    date_start: {
                        [Op.lte]: dateStart
                    },
                    // La date de fin du forfait doit être inférieure ou égale à la date de fin spécifiée.
                    date_end: {
                        [Op.gte]: dateEnd
                    },
                    // La quantité doit être supérieure à 0.
                    quantity: {
                        [Op.gt]: 0
                    },
                    // La capacité doit être égale au nombre de membres spécifié.
                    capacity: {
                        [Op.eq]: members,
                    },
                    available: true,
                    // Le nom du forfait doit contenir les mots-clés spécifiés.
                    name_pkg: {
                        [Op.like]: '%' + keywords + '%'
                    }
                },
                include: [{
                    model: models.Service,
                    as: 'services',
                    include: [{
                        model: models.Institution,
                        as: 'institution'
                    }]
                }]
            });



            // Si aucun résultat n'est trouvé (ou si le tableau des résultats est vide), un message d'erreur est renvoyé.
            if (!results || results.length === 0) {
                return res.status(404).json({ message: "Pas de forfait trouvée" });
            }

            console.log(results);
            // Les résultats sont renvoyés sous forme de réponse JSON.
            res.json(results);
        }
        // Si une erreur se produit lors de l'exécution du bloc try, un message d'erreur est renvoyé avec le statut 500 (Erreur interne du serveur).
        catch (error) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }


}

export default userController;