import React, {useEffect} from 'react';
import './addserviceForm.scss';
import './addserviceForm.scss';
import AddServiceFormStore from './AddServiceFormStore';
import { useNavigate } from "react-router-dom"
import ButtonBack from '../ButtonBack/ButtonBack';

const AddServiceForm = () => {
    const { postService, handleChange, data, getInstitutionsByProviderId, institutions } = AddServiceFormStore(state => state)
    
    const navigate = useNavigate(); // Ajoutez cette ligne
    
    const handleSubmit = async () => {
        await postService();
        navigate('/add-package'); // Redirige vers la page souhaitée
    }
    useEffect(() => {
        
        getInstitutionsByProviderId();
    }, [getInstitutionsByProviderId]);

    return (
        <section className='addService'>
            <h2 className='addService__title'>Ajouter <span>un service</span></h2>
            <ButtonBack redirectPath={"/my-properties"}/>
            <form className='addService__form' method='POST'>
                <div className='addPackage__box'>
                <fieldset>
                    <label htmlFor="properties">Selectionnez l'établissement</label>
                    <select id="properties" name="institution_id" onChange={handleChange} required>
                        <option defaultValue={0} selected disabled hidden>Choisir...</option>
                        {institutions.map(institution => (
                            <option key={institution.id} value={institution.id} >
                                {institution.name_ins}
                            </option>
                            ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="cover_serv">Photos</label>
                    <input type="text"  id="cover_serv" name="cover_serv" onChange={handleChange}></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="name">Nom du service</label>
                    <input id='name' type='text' name='name_serv' onChange={handleChange} required></input>
                </fieldset>
                <fieldset>
                    
                    <div className='addService__boxDispo'>
                        <label htmlFor="hour_start">Heure de début</label>
                        <input type="time" id="hour_start" name="hour_start" onChange={handleChange}></input >
                    </div>
                    <div className='addService__boxDispo'>
                        <label htmlFor="hour_end">Heure de fin</label>
                        <input type="time" id="hour_end" name="hour_end" onChange={handleChange}></input>
                    </div>
                </fieldset>
                </div>
                <div className='addService__box'>
                <fieldset>
                    <label htmlFor="descriptionS">Description</label>
                    <textarea id="descriptionS" name="description_serv" onChange={handleChange} required></textarea>
                </fieldset>
                
                </div>

                
            </form>
            <button className='addService__btn' type='button' onClick={handleSubmit}>Créer</button>
        </section>
    )
}
export default AddServiceForm;

