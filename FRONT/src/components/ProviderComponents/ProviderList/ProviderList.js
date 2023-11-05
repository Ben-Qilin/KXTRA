import React, { useState } from 'react';
import down from '../../../assets/down.svg'
import up from '../../../assets/up.svg'
import '../../ProviderComponents/ClientsOrders/AccordionOrder.scss'
import { UseSignInStore } from '../../AuthLogin/signInStore';

import '../ProviderList/ProviderList.scss';

const ProviderList = () =>{
        const [isOpen, setIsOpen] = useState(false);
        const { isLoggedIn, isAdmin, isProvider} = UseSignInStore();
        return (
          <article className='infosOrder'>
      
            <section className='infosOrder__containerTop'>
              <div className='infosOrder__boxTop'>
                <div className='infosOrder__nameBox'>
                  <span>Nom:</span>
                  <p>Gisèle</p>
                </div>
                <div className='infosOrder__surnameBox'>
                  <span>Prénom:</span>
                  <p>Toupet</p>
                </div>
              </div>
              <div className='infosOrder__numOrderBox'>
                <span>Adresse siège social</span>
                <p>666</p>
              </div>
              <div className='infosOrder__propertyBox'>
                <span>Mail</span>
                <p>pinard@mail.com</p>
              </div>
              <div className='infosOrder__propertyBox'>
                <span>Numéro</span>
                <p>12345678</p>
              </div>
              <button className='infosOrder__buttonOC' onClick={() => setIsOpen(!isOpen)}><img src={isOpen ? up : down}></img></button>
            </section>
            {isOpen && (
              <section className='infosOrder__containerBottom'>
                <div className='infosOrder__idClientBox'>
                  <span>Total de service</span>
                  <p>2</p>
                </div>
                <div className='infosOrder__adressBox'>
                  <span>Nombre d'établissement</span>
                  <p>78</p>
                </div>
                <div className='infosOrder__mailBox'>
                  <span>Nombre de réservation</span>
                  <p>5</p>
                </div>
                <div className='infosOrder__durationBox'>
                  <span>Modifier</span>
                  <input type="text" name="" id="" />
                </div>
                
                <div className='infosOrder__priceBox'>
                  <button type="button">Supprimer</button>
                </div>
                {isAdmin && (
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

export default ProviderList;