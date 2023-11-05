import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';


const wishlistRouter = express.Router();


wishlistRouter.get('/wishlist', jwtGuard, roleGuard({ role: ['user'] }), (req, res) => {
    res.json('récupérer de toutes les favoris');
});
wishlistRouter.get('/wishlist/:id', jwtGuard, roleGuard({ role: ['user'] }), (req, res) => {
    res.json('récupérer d\ un favoris');
});
wishlistRouter.post('/wishlist', jwtGuard, roleGuard({ role: ['user'] }), (req, res) => {
    res.json('créer d\ un favoris');
});
wishlistRouter.delete('/wishlist/:id', jwtGuard, roleGuard({ role: ['user'] }), (req, res) => {
    res.json('supprimer un favoris');
});

export default wishlistRouter;