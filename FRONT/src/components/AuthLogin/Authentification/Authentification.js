//Importation des composant enfant de Authentification
import SignUp from "./SignUp";
import SignIn from "./SignIn";
//Importation du style du composant Authentification
import "../Authentification/Authentification.scss";
//Importation des images sous forme de variables


//Création du composant Authentification qui representera une section de la page AuthLogin
// Avec des formulaires : d'inscription et de connexion
const Authentification = () => {
  return (
    <div className="auth__container">
      <SignUp />
      <div className="line__color"></div>
      <SignIn />
    </div>
  );
};

export default Authentification;
