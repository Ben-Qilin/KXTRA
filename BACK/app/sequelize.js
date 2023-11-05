import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';


dotenv.config();
const sequelize = new Sequelize(process.env.PG_URL, {logging: console.log});

// Vérifiez la connexion
try {
    await sequelize.authenticate();
    console.log('La connexion a été établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
  
  // Synchronisez tous les modèles
  try {
    await sequelize.sync();
    console.log("Tous les modèles ont été synchronisés avec succès.");
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la synchronisation des modèles:', error);
  }

export default sequelize;