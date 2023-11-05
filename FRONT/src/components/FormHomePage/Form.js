import React, { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { useStore } from 'zustand';
import { FormSearchStore } from './FormSearchStore';
import fr from 'date-fns/locale/fr';
import { useNavigate } from "react-router-dom"

// Enregistrez le locale français


const MonFormulaire = () => {
  const navigate = useNavigate();
  const { data, incrementMembers, decrementMembers, handleChange, handleSubmit, fetchPkgSearch } = useStore(FormSearchStore);
const submitRedirect = async (e) => {
  e.preventDefault();
await handleSubmit(e)
navigate('/search')
}
  
  return (
    <form className='containerForm__form'  >
      <label htmlFor='arrivalDate'>
        Date début du séjour:
        <input type='date' id='arrivalDate' name='arrivalDate' locale='fr' dateFormat="dd/MM/yyyy" onChange={handleChange} ></input>
      </label>
      <label htmlFor='leaveDate'>
        Date fin de séjour:
        <input type='date' id='leaveDate' name='leaveDate' locale='fr' dateFormat="dd/MM/yyyy" onChange={handleChange}></input>

      </label>
      <label htmlFor='members' className='containerForm__member'>
        Participants
        <div className='containerForm__participation'>

          <button className='containerForm__buttonMembers' disabled={data.members === 1} onClick={decrementMembers}  >-</button>

          <input id='members' type="number" name='members' onChange={handleChange} value={parseInt(data.members)} className='containerForm__membersInput' />


          <button className='containerForm__buttonMembers' onClick={incrementMembers} >+</button>

        </div>

      </label>

      <div className='containerForm__layout'>
        <label htmlFor='keywords' title='Recherche par mots-clés'>
          <input id='keywords' name='keywords' placeholder='Recherche par mots-clés' className='containerForm__keywordsInput' type="text" onChange={handleChange} />
        </label>
        <label htmlFor='filters'>
          Filtres
          <input id='filters' type="text" className='containerForm__filtersInput' />
        </label>
        <input className="containerForm__submit" type="button" onClick={(e) => submitRedirect(e)} value="Recherche" />
      </div>
    </form>
  )
};

export default MonFormulaire;
