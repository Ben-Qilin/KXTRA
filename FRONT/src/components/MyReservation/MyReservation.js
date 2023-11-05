import ButtonBack from "../ProviderComponents/ButtonBack/ButtonBack"
import './myReservation.scss'
import terrasse from'../../assets/terrasse.jpg'

const MyReservation = () => {
    return(
        <section className="myReservation">
            <ButtonBack/>
            <h2 className="myReservation__title">Votre réservation</h2>
            <div className="myReservation__container">
                <article className="myReservation__boxLeft">
                    <div className="myReservation__boxServiceInfos">
                        <img src={terrasse}></img>
                        <div className="myReservation__serviceInfosTop">
                            <h3>Nom endroit</h3>
                            <p>Description</p>
                            <div className="myReservation__serviceInfosBottom">
                                <div><p>Date</p><p>26/12/24</p></div>
                                <div><p>Participants</p><p>2</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="myReservation__boxPayChoice">
                        <h3>Moyen de paiement</h3>
                        <ul>
                            <li>🤑 CB</li>
                            <li>💰 Paypal</li>
                            <li>💸 Virement bancaire</li>
                        </ul>
                    </div>

                </article>
                <article className="myReservation__boxRight">
                    <div className="myReservation__boxPrice">
                        <p>Prix</p><span>300€</span>
                    </div>
                    <div className="myReservation__boxBuild">
                        <ul>
                            <li>Frais de</li>
                            <li>Frais de </li>
                            <li>Frais de</li>
                        </ul>
                    </div>
                    <div className="myReservation__boxButton">
                    <button>Réserver</button>
                    <button>Annuler</button>
                    </div>
                    

                </article>
            </div>
        </section>
    )
}
export default MyReservation