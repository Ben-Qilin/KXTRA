import { Link } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import './myAccount.scss'

const MyAccount = () => {
    return(
        <>
        <Header isLoggedIn={true}/>
        <main role="main">
            <section className="myAccount">
                <div className="myAccount__boxTitle">
                <h2 className="myAccount__title">Mon compte Client</h2>
                </div>
                <div className="myAccount__boxButton">
                <Link to="/my-wishlist" className="myAccount__button">
                    Voir mes Services Favoris
                </Link>
                <Link to="/my-reservation" className="myAccount__button">
                    Voir mes Réservations
                </Link>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}
export default MyAccount;
