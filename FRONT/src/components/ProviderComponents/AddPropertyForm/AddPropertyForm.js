import ButtonBack from "../ButtonBack/ButtonBack"
import './addpropertyform.scss'
import  {AddPropertyStore}  from "./AddPropertyStore"
import { useNavigate } from "react-router-dom"

const AddPropertyForm = () => {
    const {postProperty, handleChange, data} = AddPropertyStore(state => state)

    const navigate = useNavigate(); // Ajoutez cette ligne

    const handleSubmit = async () => {
        await postProperty();
        navigate('/add-service'); // Redirige vers la page souhaitée
    }
    console.log(data);
    return(
        <section className="addproperty">
        <h2 className="addproperty__title">Ajouter <span>un établissement</span></h2>
        <ButtonBack redirectPath={"/my-properties"}/>
        <form className="addproperty__form" method="POST">
            <div className="addproperty__container1">
            <fieldset>
                <label htmlFor="nameProperty">Nom de létablissement</label>
                <input id="nameProperty" name="name_ins" type='text' onChange={handleChange} required></input>
            </fieldset>
            <fieldset>
                <label htmlFor="addressProperty">Adresse de l'établissement</label>
                <input id="addressProperty" name="adress_ins" type="text" onChange={handleChange} required></input>
            </fieldset>
            <fieldset>
                <label htmlFor="cityProperty">Ville de l'établissement</label>
                <input id="cityProperty" name='city_ins' type='text' onChange={handleChange}></input>
            </fieldset>
            <fieldset>
                <label htmlFor="cityCp">Code postal de l'établissement</label>
                <input id="cityCp" name='cp_ins' type='text' onChange={handleChange}></input>
            </fieldset>
            <fieldset>
                <label htmlFor="cover">Photos de l'établissement</label>
                <input id="cover" name="cover" type="text" onChange={handleChange}></input>
            </fieldset>
            </div>
            <div className="addproperty__container2">
            <fieldset>
                <label htmlFor="experiencesProperty">Expériences proposées</label>
                <input id="experiencesProperty" name="experiences" type="text" onChange={handleChange} required></input>
            </fieldset>
            <fieldset>
                <label htmlFor="priceProperty">Prix moyen des services proposés</label>
                <input id="priceProperty" name="average_price" type="number" onChange={handleChange} required></input>
            </fieldset>
            <fieldset>
                <label htmlFor="phoneProperty">Téléphone de l'établissement</label>
                <input id="phoneProperty" name="phone_ins" type="tel" onChange={handleChange}></input>
            </fieldset>
            <fieldset>
                <label htmlFor="emailProperty">Email de l'établissement</label>
                <input id="emailProperty" name="email_ins" type="text" onChange={handleChange}></input>
            </fieldset>
            </div>
        </form>
   <button type="button" className="addproperty__buttonSubmit" onClick={ handleSubmit }>Créer</button>
     </section>
    )
}
export default AddPropertyForm