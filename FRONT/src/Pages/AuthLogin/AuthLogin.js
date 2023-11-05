//Importation des composants de la page d'authentification
import Header from "../../components/Header/Header"
import Authentification from "../../components/AuthLogin/Authentification/Authentification"
import Footer from "../../components/Footer/Footer"
//Création du composant representant la page d'authentification
const AuthLogin = () =>{
    return(
        <>
        <Header />
        <main role="main">
           <Authentification /> 
        </main>
        
        <Footer />
        </>
    )
}
export default AuthLogin;