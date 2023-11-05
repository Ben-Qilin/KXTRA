import success from '../../assets/success.png'
import React from 'react'
import './confirmResa.scss'
import { Link } from 'react-router-dom'
const ConfirmResa = () => {
    return (
        <section className='confirmResa'>

            <h2 className='confirmResa__title'>Confirmation de <span className='confirmResa__subtitle'>réservation</span></h2>

            <div className='confirmResa__container'>

                <h3 className='confirmResa__confirm'>Lieu réservé avec succès !</h3>

                <img src={success} className='confirmResa__img'></img>


                <div className='confirmResa__paragraph'>
                    <p>Vous allez bientôt recevoir un mail avec les détails.</p>

                    <p>Vous pourrez également les retrouver dans votre espace <Link to={'/my-reservation'}>Mes Réservations</Link></p>
                </div>

                <Link to={'/'}>Retourner sur la page d'accueil</Link>

                <a className='confirmResa__link'>Annuler ou modifier ma réservation</a>

            </div>
        </section>
    )
}
export default ConfirmResa