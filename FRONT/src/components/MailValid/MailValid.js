import '../MailValid/MailValid.scss';
import success from '../../assets/success.png'
import axios from "axios"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MailValid = () => {
    // je récupère le token qui passe dans mon URL FRONT
    const { token } = useParams()

    // ce state gère la réponse serveur
    const [backResponse, setBackResponse] = useState(false);

    // Cette fonction gère la requête qui va valider l'email en back, je passe le token dedans
    async function checkEmail() {
        const response = await axios.get(`http://localhost:3000/validation-email/${token}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // J'actualise mon state avec la réponse serveur 
        setBackResponse(response.data)
    };

    useEffect(() => {
        // au chargement de la page j'appelle ma fonction
        checkEmail()
    }, [])

    return (
        <>
        {/* Je rends le message de confirmation si la réponse serveur est à true */}
        {backResponse ? <div className='email__container'>

            <h2 className='email__title'>Validation de l'e-mail <span className='email__subtitle'>réussie</span></h2>

            <img src={success} className='email__img'></img>

            <p className='email__text'>Votre adresse e-mail a été validée avec succès.</p>

            <a href="/" className='email__link'>Retournez au menu</a>

        </div>
        : 
        // Sinon je rends un message d'erreur
        <div className='email__container'>
            <p className='email__text'>Une erreur s'est produite</p>
        </div>}
        </>
    )
}

export default MailValid;