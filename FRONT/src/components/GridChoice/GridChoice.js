import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';

import '../GridChoice/GridChoice.scss'

// Enregistrez le locale français


const GridChoice = ({ packageDetails }) => {
    const [dateArrivee, setDateArrivee] = useState(new Date());
    const [dateDepart, setDateDepart] = useState(new Date());
    const [nombrePackage, setNombrePackage] = useState(0);
    const [formData, setFormData] = useState({});
    const [prixTotal, setPrixTotal] = useState(0);

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();


        // Vérifiez si les dates sélectionnées sont dans la plage de dates disponible
        if (dateArrivee >= packageDetails.date_start && dateDepart <= packageDetails.date_end) {
            // Les dates sélectionnées sont dans la plage de dates disponible
            if (nombrePackage <= packageDetails.quantity) {
                // La quantité est disponible
                setFormData({
                    dateArrivee,
                    dateDepart,
                    nombrePackage,


                });
                alert("Dates et quantité valides");
                navigate('/final-reservation', { state: { formData, packageDetails } })

            } else {
                // La quantité n'est pas disponible
                alert(`Le nombre maximum de packages est ${packageDetails.quantity}`);
            }
        } else {
            // Les dates sélectionnées ne sont pas dans la plage de dates disponible
            alert("Désolé, ce package n'est pas disponible pour les dates que vous avez choisies.");
        }


        console.log('Date d\'arrivée:', dateArrivee);
        console.log('Date de départ:', dateDepart);
        console.log('Nombre de packages:', nombrePackage);
        console.log(packageDetails.date_end)
        console.log(formData)
    };

    //     useEffect(() => {
    //         console.log('packageDetails.price:', packageDetails.price);
    // console.log('formData.nombrePackage:', formData.nombrePackage);
    //         // setPrixTotal(packageDetails ? (packageDetails.price * formData.nombrePackage) : null);
    //         // setPrixTotal(packageDetails && formData.nombrePackage ? (packageDetails.price * formData.nombrePackage) : null);
    //         setPrixTotal(packageDetails && nombrePackage ? (packageDetails.price * nombrePackage) : null);

    //         setFormData((prevFormData) => ({
    //             ...prevFormData,
    //             nombrePackage,
    //             prixTotal
    //         }));
    useEffect(() => {
        const total = packageDetails && nombrePackage ? (packageDetails.price * nombrePackage) : null;
        setPrixTotal(total);

        setFormData((prevFormData) => ({
            ...prevFormData,
            dateArrivee,
            dateDepart,
            nombrePackage,
            prixTotal: total,  // Ajoutez cette ligne
        }));
    }, [dateArrivee, dateDepart, nombrePackage]);


    //     setFormData({
    //         dateArrivee,
    //         dateDepart,
    //         nombrePackage,
    //         prixTotal,

    //     });
    // }, [dateArrivee, dateDepart, nombrePackage]);

    return (
        <>
            <div className='grid__container'>

                <form onSubmit={handleSubmit}>


                    <div className='grid__dateContainer'>
                        <div className='grid__inputDate'>
                            <label className='grid__label'>Date d'arrivée

                                <input
                                    type='date'
                                    value={dateArrivee}
                                    onChange={(event) => setDateArrivee(event.target.value)}
                                    locale='fr' dateFormat="dd/MM/yyyy"
                                />
                                {/* <input type='date' selected={dateArrivee} onChange={(date) => setDateArrivee(date)} locale='fr' dateFormat="dd/MM/yyyy"></input> */}
                            </label>


                            <label className='grid__label'>Date de départ

                                <input type='date' value={dateDepart} onChange={(event) => setDateDepart(event.target.value)} locale='fr' dateFormat="dd/MM/yyyy"></input>
                            </label>

                        </div>
                        <label className='grid__label'>Nombre de package
                            <span className='grid__checkbox'>
                                {/* <button className='grid__buttonMembers' onClick={decrementer}>-</button> */}

                                <input id='members' type="number" value={nombrePackage} onChange={(e) => setNombrePackage(parseInt(e.target.value))}
                                    className='grid__input' />

                                {/* <button className='grid__buttonMembers' onClick={incrementer}>+</button> */}
                            </span>
                        </label>
                        <div className='grid__resultContainer'>
                            <p className='grid__price'>{prixTotal}€</p>

                            <button type="submit" className='grid__button'>Ajouter au panier</button>
                        </div>
                    </div>




                </form>
            </div>
        </>
    )
}

export default GridChoice;