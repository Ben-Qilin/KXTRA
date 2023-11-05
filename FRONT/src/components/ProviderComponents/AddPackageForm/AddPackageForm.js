import React, { useEffect } from 'react'
import './addPackageFrom.scss'
import AddPackageFormStore from './AddPackageStore'
import AddServiceFormStore from '../AddServiceForm/AddServiceFormStore'
import { useNavigate } from "react-router-dom"
import ButtonBack from '../ButtonBack/ButtonBack'


const AddPackageForm = () => {
    const { getInstitutionsByProviderId, institutions } = AddServiceFormStore(state => state)
    const { postPackage, handleChange, data, services } = AddPackageFormStore(state => state)

    const navigate = useNavigate();
    const handleSubmit = async () => {
        await postPackage();
        navigate('/my-properties'); // Redirige vers la page souhaitée
    }

    console.log(data);
    useEffect(() => {

        getInstitutionsByProviderId();
    }, [getInstitutionsByProviderId]);
    return (
        <section className='addPackage'>
            <h2>Créer <span>votre forfait</span></h2>
            <ButtonBack redirectPath={"/my-properties"}/>
            <form method='POST' className='addPackage__form' onSubmit={postPackage}>
            <div className='addService__box'>
                <fieldset>
                    <label htmlFor='name_pkg'>Nom du forfait</label>
                    <input type='text' name='name_pkg' id='name_pkg' onChange={handleChange}></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="properties">Selectionnez l'établissement</label>
                    <select id="properties" name="institution_id" onChange={handleChange} required>
                        <option defaultValue={0}>Choisir...</option>
                        {institutions.map(institution => (
                            <option key={institution.id} value={institution.id} >
                                {institution.name_ins}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label>Selectionnez le ou les services</label>
                    {services.map(service => (
                        <div key={service.id}>
                            <input type="checkbox" id={`service${service.id}`} key={service.id} name="serviceS" value={service.id} onChange={handleChange} />
                            <label htmlFor={`service${service.id}`}>{service.name_serv}</label>
                        </div>
                    ))}
                </fieldset>
                <fieldset>
                    <label htmlFor="quantity">Quantité de package</label>
                    <input type='number' id='quantity' name='quantity' onChange={handleChange} required></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="price">Prix du package</label>
                    <input type="number" id="price" name="price" onChange={handleChange} required></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="capacity">Limite de convive</label>
                    <input type="text" id="capacity" name="capacity" onChange={handleChange}></input>
                </fieldset>
                </div>
                <div className='addPackage__box'>
                <fieldset>
                    <label>Disponibilités</label>
                    <div className='addService__boxDispo'>
                        <label htmlFor="date_start">Début</label>
                        <input type="date" id="date_start" name="date_start" onChange={handleChange} ></input>
                    </div>
                    <div className='addService__boxDispo'>
                        <label htmlFor="date_end">fin</label>
                        <input type="date" id="date_end" name="date_end" onChange={handleChange}></input>
                    </div>
                </fieldset>

                <fieldset>
                    <label>Choisissez la categorie</label>
                    <input type='checkbox' onChange={handleChange}></input>
                    <label>Ephemere</label>
                    <input type='checkbox' onChange={handleChange}></input>
                    <label>Cozy</label>
                    <input type='checkbox' onChange={handleChange}></input>
                    <label>Insolite</label>

                </fieldset>
                
                <fieldset>
                    <label htmlFor="extras">Ajouter des extras</label>
                    <input type="text" id="extras" name="extras" onChange={handleChange}></input>
                </fieldset>
                </div>
                <button type='button' onClick={handleSubmit}>Valider</button>
            </form>
        </section>
    )
}
export default AddPackageForm