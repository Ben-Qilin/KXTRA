import { useId } from 'react';
import '../ProviderForm/ProviderForm.scss';
import { UseProviderFormStore } from './ProviderFormStore';
import ButtonBack from '../../ProviderComponents/ButtonBack/ButtonBack'


const ProviderForm = () => {
    const {postProviderCreate, handleChange, data} = UseProviderFormStore(state => state)
    const id = useId()
    console.log(data);
    return (
        <section className="ProviderForm__container">

            <h2 className="ProviderForm__title"><span className="ProviderForm__subtitle">Ajouter</span> un prestataire</h2>
            <ButtonBack redirectPath={'/my-adminAccount'}/>

            <section >
                <form className="Provider__formSection" action="" method="POST">
                    <div>
                        
                        <input type='radio' id={'roleP' + id} name='role' onChange={handleChange} value='provider'></input>
                        <label htmlFor='roleP'>role Provider</label>
                    </div>

                    <div className="ProviderForm__nameContainer">

                        <div className="ProviderForm__firstname">
                            <label className="ProviderForm__label" htmlFor="firstnameP">Nom *</label>
                            <input className="ProviderForm__input" type="text" name="firstname" id="firstnameP" onChange={handleChange}/>
                        </div>

                        <div className="ProviderForm__lastname">
                            <label className="ProviderForm__label" htmlFor="lastnameP">Prénom *</label>
                            <input className="ProviderForm__input" type="text" name="lastname" id="lastnameP" onChange={handleChange}/>
                        </div>
                    </div>

                    <label className="ProviderForm__label" htmlFor="socialAdressP">Adresse siège social *</label>
                    <input className="ProviderForm__input" type="text" name="adress_user" id="socialAdressP" onChange={handleChange}/>

                    <label className="ProviderForm__label" htmlFor="phoneP">Téléphone du Prestataire</label>
                    <input className="ProviderForm__input" type="tel" name="phone_user" id="phoneP" onChange={handleChange}/>

                    <label className="ProviderForm__label" htmlFor="mailP">Adresse E-mail</label>
                    <input className="ProviderForm__input" type="email" name="email" id="mailP" onChange={handleChange}/>
                    
                    <label className="ProviderForm__label" htmlFor="passwordP">Mot de passe *</label>
                    <input className="ProviderForm__input" type="passwordP" name="password" id="passwordP" onChange={handleChange}/>


                </form>

                <div className="ProviderForm__buttonContainer">
                    <button className="ProviderForm__button" type="button" onClick={ postProviderCreate }>Créer</button>
                </div>
            </section>
        </section>
    )
}

export default ProviderForm;