import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
// import calendarController from '../controllers/calendarController.js';

const calendarRouter = express.Router();

//créer un évènement
calendarRouter.post('/create-event', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }),)

//récupérer les evenements
calendarRouter.get('/get-events', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }),);
