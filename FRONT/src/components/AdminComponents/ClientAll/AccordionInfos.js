import React, { useState } from 'react';
import down from '../../../assets/down.svg'
import up from '../../../assets/up.svg'

const AccordionInfos = ({user, deleteUser}) => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <article className='infosClient'>
            
      <section className='infosClient__containerTop'> 
      <div className='infosClient__boxTop'> 
      <div className='infosClient__nameBox'>
        <span>Nom:</span>
        <p>{user.lastname}</p>
      </div>
      <div className='infosClient__surnameBox'>
        <span>Prénom:</span>
        <p>{user.firstname}</p>
      </div>
      </div>    
      <div className='infosClient__mailBox'>
        <span>Email:</span>
        <p>{user.email}</p>
      </div>
      <div className='infosClient__phoneBox'>
        <span>Numéro:</span>
        <p>{user.phone_user}</p>
      </div>
      <button className='infosClient__buttonOC' onClick={() => setIsOpen(!isOpen)}><img src={isOpen ? up : down}></img></button>
      </section>
      {isOpen && (
        <section className='infosClient__containerBottom'>
          <div className='infosClient__nbrResaBox'>
            <span>Nombre de réservations:</span>
            <p>3</p>
          </div>
          <div className='infosClient__createdAtBox'>
            <span>Date de création:</span>
            <p>2023-01-01</p>
          </div>
          <div className='infosClient__dateResaBox'>
            <span>Date de réservation:</span>
            <p>2023-01-02</p>
          </div>
          <button>Bloquer</button>
          <button onClick={() => deleteUser(user.id)}>Supprimer</button>
        </section>
      )}
        </article>
    )
}

export default AccordionInfos