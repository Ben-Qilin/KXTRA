//Importation des composants de la Page d'accueil
import Header from "../../components/Header/Header"
import MyCarousel from "../../components/Carrousel-top/Carrousel"
import FormSearch from "../../components/FormHomePage/FormSearch"
import Illustrations from "../../components/Illustrations/Illustration"
import Introduce from "../../components/Introduce/Introduce"
import Pepitas from "../../components/pepitas/Pepitas"
import Footer from "../../components/Footer/Footer"
//Création du composant qui representera la page d'accueil
const Home = () => {
    return (
        <>
            <Header />
            <main role="main">
            <a href="#formsearch" className='header__avoidLink'>aller au formulaire de reservation</a>
            <MyCarousel />
            <FormSearch/>
            <Illustrations/>
            <Introduce />
            <Pepitas />
            </main>
            <Footer />
        </>
    )
}

export default Home
