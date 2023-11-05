import '../AdminButton/AdminButton.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Button = () => {
    return (
        <div className="adminButton__container">
            <h2 className="adminButton__title">En tant qu'<span className='adminButton__subtitle'>administrateur</span>, je souhaite :</h2>

            <nav className="adminButton__nav">
                <Link className="adminButton__link" to="/">Gérer les comptes <span className='adminButton__linkName'>prestataires</span></Link>

                <Link className="adminButton__link" to="/add-provider">Créer un compte <span className='adminButton__linkName'>prestataire</span></Link>

                <Link className="adminButton__link" to="/clients-list">Gérer les comptes <span className='adminButton__linkName'>clients</span></Link>

                <Link className="adminButton__link" to="/clients-orders">Gestion des <span className='adminButton__linkName'>réservations</span></Link>
            </nav>

        </div>
    )
}

export default Button;