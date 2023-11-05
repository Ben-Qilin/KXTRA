import cors from 'cors';
import express, { Router } from 'express';
import * as dotenv from 'dotenv';


import router from './app/Router/router.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(router);

app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}/`);
});
