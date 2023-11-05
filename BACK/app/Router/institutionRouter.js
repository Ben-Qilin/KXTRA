import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
import institutionProviderController from '../controllers/providerController/institutionProviderController.js';
import serviceProviderController from '../controllers/providerController/serviceProviderController.js';

const institutionRouter = express.Router();

//récupérer tous les établissements , jwtGuard, roleGuard({ role: ['admin', 'provider'] })
institutionRouter.get('/institution', institutionProviderController.getAllInstitutions)

//récupérer un établissement 
institutionRouter.get('/institution/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), institutionProviderController.getOneInstitution)

//récupérer un service selon id de l'institution
institutionRouter.get('/institutions/:id/services', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), serviceProviderController.getAllServicesByInstitutionId);


//ajouter un établissement
institutionRouter.post('/institution', jwtGuard, roleGuard({ roles: ['provider'] }), institutionProviderController.addInstitution)

//modifier un établissement 
institutionRouter.put('/institution/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), institutionProviderController.updateInstitution)

//supprimer un établissement
institutionRouter.delete('/institution/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), institutionProviderController.deleteInstitution)

export default institutionRouter;