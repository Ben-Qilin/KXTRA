import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo_qualiextra.png"
import '../Header/header.scss'
import notification from '../../assets/notifWhite.svg'
import wishlist from '../../assets/whishlistWhite.svg'
import userIcon from '../../assets/userWhite.svg'
import {UseSignInStore}  from '../AuthLogin/signInStore'
import logout from '../../assets/LogOut.svg'

const Header = () => {
    
   const { isLoggedIn, user, logOut, isAdmin, isProvider} = UseSignInStore();

   return(
    <header role="header" className="header">
        <div className="header__container">

        <Link to="/" className="header__logoLink"><img src={logo} className="header__logo"></img></Link>

        </div>
        <div className="header__container">
            {isLoggedIn ? (
                // Si l'utilisateur est connecté, affichez ces boutons
                <div className='header__containerLog'> 
                    {isAdmin() ? (
                        // Si l'utilisateur est un administrateur, affichez ce bouton
                        <Link to="/my-adminAccount" className="header__link"><img src={userIcon}></img></Link>
                    ) : isProvider() ? (
                        // Si l'utilisateur est un fournisseur, affichez ce bouton
                        <Link to="/my-properties" className="header__link"><img src={userIcon}></img></Link>
                    ) : (
                        // Si l'utilisateur n'est ni un administrateur ni un fournisseur, affichez ces boutons
                        <>
                            <Link to="/my-reservation" className="header__linkReservation">Réservation</Link>
                            <Link to="/notifications" className="header__link"><img src={notification}></img></Link>
                            <Link to="/my-wishlist" className="header__link"><img src={wishlist}></img></Link>
                            <Link to="/my-account" className="header__link"><img src={userIcon}></img></Link>
                        </>
                    )}
                    <button className="header__link" onClick={() => logOut()}><img src={logout}></img></button>
                </div>
            ) : (
                // Si l'utilisateur n'est pas connecté, affichez ce bouton
                <>  
                <Link to="/auth" className="header__authLink">Se connecter / S'inscrire</Link>
                
                </>
            )}
        </div>
    </header>
)
}

export default Header