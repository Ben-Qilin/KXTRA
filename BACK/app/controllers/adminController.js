import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Category from '../models/Category.js';
import dotenv from "dotenv";
import adminCheckRole from "../../utils/role.js";

const adminController = {
    // ! si on veut utiliser async et await le mettre en debut de fonction !!
    registerProvider: async (req, res) => {
        
        // Engistrer un utilisateur
        try {
            // ! est ce qu'on peut réutiliser la detructuration sur une autre fonction comme updateUser ?
        const { role, firstname, lastname, password, email, birthday, phone_user } = req.body;

            adminCheckRole();
            
            // Vérification de la robustesse du mot de passe
            const options = {
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            };

            // Si le mot de passe ne respecte pas les crites (1 maj, 1 min, 1 symbol, 1 chiffre)
            if (!validator.isStrongPassword(req.body.password, options)) {
                throw new Error("Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            // ! La méthode create d'un modèle est asynchrone, elle renvoie donc une Promise. Pour attendre
            // la création de l'utilisateur avant de passer à la suite, on utilise le mot clé 'await' sinon ne se transforme pas en Promise, objet non utilisable, ne se renvoie pas à l'utilisateur Promise jamais résolut.
            // ! Passer à la suite que si l'utilisatuer est créer.
            const user = await User.create({
                role,
                firstname,
                lastname,
                password: hashedPassword,
                email: email.toLowerCase(),
                birthday,
                phone_user: parseInt(phone_user),
            });

            // quand le serveur renvoie un réponse il nous donne juste ses 4 là, ceux qu'on lui demande. Peut aussi avoir une image de profil ou un description...
            // ! doit être envoyer en json
            res.status(201).json({ message: "L'utilisateur a été créé." });
        } catch (error) {
            console.error(error);
            res.status(401).json({ errorMessage: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await User.findAll({
                where: {
                    role: 'user'
                },
                attributes: { exclude: ['password'] }
            });
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ errorMessage: error.message });
        }


    },

    getAllProvider: async (req, res) => {
        try {
            const users = await User.findAll({
                where: {
                    role: 'provider'
                },
                attributes: { exclude: ['password'] }
            });
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ errorMessage: error.message });
        }


    },

    getOneUser: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id,
                    role: 'user'
                },
                attributes: { exclude: ['password'] }
            });
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ errorMessage: error.message });
        }
    },

    getOneProvider: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id,
                    role: 'provider'
                },
                attributes: { exclude: ['password'] }
            });
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ errorMessage: error.message });
        }
    },

    updateUser: async (req, res) => {
        const { userId } = req.params; // Obtenez l'ID du client à partir des paramètres d'URL
        const {
            firstname,
            lastname,
            password,
            email,
            adress_user,
            city_user,
            cp_user,
            birthday,
            phone_user
        } = req.body;


        try {
            // Recherchez le client dans la base de données
            const client = await User.findByPk(userId);

            if (!client) {
                return res.status(404).json({ message: "Client non trouvé" });
            }

            // Mettez à jour les propriétés du client
            client.firstname = firstname;
            client.lastname = lastname;
            client.password = password;
            client.email = email;
            client.adress_user = adress_user;
            client.city_user = city_user;
            client.cp_user = cp_user;
            client.birthday = birthday;
            client.phone_user = phone_user;

            // Enregistrez les modifications dans la base de données
            await client.save();

            // Répondez avec le client mis à jour
            return res.status(200).json(client);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: error.message });
        }
    },

    deleteUser: async (req, res) => {
        const { userId } = req.params; // Obtenez l'ID du client à partir des paramètres d'URL

        try {
            // Recherchez le client dans la base de données
            const client = await User.findByPk(userId);

            if (!client) {
                return res.status(404).json({ message: "Client non trouvé" });
            }

            // supprimer dans la base de données
            //!methode destroy et pas delete
            await client.destroy();

            // Répondez avec le client est supprimé
            return res.status(200).json({ message: 'client is delete' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: error.message });
        }
    },

    addCategory: async (req, res) => {
        try {
            const { name_catg, description_catg } = req.body;
            const category = await Category.create({
                name_catg,
                description_catg
            });
            res.status(201).json({ message: "Catégorie créée avec succès." });
        } catch (error) {
            console.error(error);
            res.status(401).json({ errorMessage: error.message });
        }
    },

    updateCategory: async (req, res) => {
        const categoryId = req.params.categoryId;
        const { name_catg, description_catg } = req.body;
        
        try {
            const category = await Category.findByPk(categoryId);

            if (!category) {
                return res.status(404).json({ message: "Catégorie non trouvée." });
            }

            category.name_catg = name_catg;
            category.description_catg = description_catg;

            await category.save();

            res.status(200).json({ message: 'Catégorie mise à jour.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: error.message });
        }
    },

    deleteCategory: async (req, res) => {
        const categoryId = req.params.categoryId;

        try {
            const category = await Category.findByPk(categoryId);

            if (!category) {
                return res.status(404).json({ message: "Catégorie non trouvée." });
            }

            await category.destroy();

            res.status(200).json({ message: 'Catégorie supprimée.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: error.message });
        }
    },
}

export default adminController;
