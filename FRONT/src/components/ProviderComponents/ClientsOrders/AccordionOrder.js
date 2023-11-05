import React, { useState, useEffect } from 'react';
import down from '../../../assets/down.svg'
import up from '../../../assets/up.svg'
import './accordionOrder.scss'
import axios from 'axios';
import { UseSignInStore } from '../../AuthLogin/signInStore';
const AccordionOrder = ({purchase}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, isAdmin, isProvider} = UseSignInStore();
  console.log(purchase)
 
  return (
    <article className='infosOrder'>

      <section className='infosOrder__containerTop'>
        <div className='infosOrder__boxTop'>
          <div className='infosOrder__nameBox'>
            <span>Nom:</span>
            <p>{purchase.user.lastname}</p>
          </div>
          <div className='infosOrder__surnameBox'>
            <span>Prénom:</span>
            <p>{purchase.user.firstname}</p>
          </div>
        </div>
        <div className='infosOrder__numOrderBox'>
          <span>Numéro de commande</span>
          <p>22664488</p>
        </div>
        <div className='infosOrder__propertyBox'>
          <span>Etablissement</span>
          <p>{purchase && purchase.packages && purchase.packages[0] && purchase.packages[0].services && purchase.packages[0].services[0] && purchase.packages[0].services[0].institution ? purchase.packages[0].services[0].institution.name_ins : 'N/A'}</p>

        </div>
        <button className='infosOrder__buttonOC' onClick={() => setIsOpen(!isOpen)}><img src={isOpen ? up : down}></img></button>
      </section>
      {isOpen && (
        <section className='infosOrder__containerBottom'>
          
          <div className='infosOrder__adressBox'>
            <span>Adresse de réservation</span>
            <p>{purchase && purchase.packages && purchase.packages[0] && purchase.packages[0].services && purchase.packages[0].services[0] && purchase.packages[0].services[0].institution ? purchase.packages[0].services[0].institution.adress_ins : 'N/A'}</p>
          </div>
          <div className='infosOrder__mailBox'>
            <span>Mail</span>
            <p>{purchase ? purchase.user.email : 'N/A'}</p>
          </div>
          <div className='infosOrder__phoneBox'>
            <span>Téléphone</span>
            <p>+33{purchase ? purchase.user.phone_user : 'N/A'}</p>
          </div>
          <div className='infosOrder__dateOrderBox'>
            <span>Date</span>
            <p>{purchase && purchase.packages ? purchase.packages[0].date_start : null} au {purchase && purchase.packages ? purchase.packages[0].date_end : null}</p>
          </div>
          <div className='infosOrder__serviceOrderBox'>
            <span>Service réservé</span>
            <p>{purchase && purchase.packages && purchase.packages[0].services ? purchase.packages[0].name_pkg : null}</p>
          </div>
          <div className='infosOrder__priceBox' >
            <span>Nombre de packages acheté(s)</span>
            <p>{purchase ? purchase.quantity: null}</p>
          </div>
          <div className='infosOrder__priceBox'>
            <span>Prix</span>
            <p>{purchase ? purchase.price : null}€</p>
          </div>
          {isAdmin() && (
            <>
              <button>Bloquer</button>
              <button>Supprimer</button>
            </>
          )}
        </section>
      )}
    </article>

  )
}
export default AccordionOrder





