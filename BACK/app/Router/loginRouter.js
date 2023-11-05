import express from 'express';

import authController from '../controllers/authController.js';
import { userController } from '../controllers/userController.js';
import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
import adminController from '../controllers/adminController.js';


const loginRouter = express.Router();

// Route Login
//route de création des users
loginRouter.post('/register', authController.register)
//route de création des provider(uniquement créer par l'admin)

//a rajouter une fois les tests finis :  
loginRouter.post('/register-provider', jwtGuard, roleGuard({ roles: ['admin'] }), adminController.registerProvider)

//route pour la connexion
loginRouter.post('/login', authController.login);

// validation d'email.
loginRouter.get('/validation-email/:token', authController.validationEmail);
//route pour le profil
loginRouter.get('/profile', jwtGuard, userController.profile);

export default loginRouter;