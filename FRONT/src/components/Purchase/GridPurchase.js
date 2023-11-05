import React, { useState } from 'react';
import '../Purchase/GridPurchase.scss'
import GridPurchaseStore from './GridPurchaseStore';
import { useNavigate } from 'react-router-dom';
const GridPurchase = ({ formData, packageDetails, sendPurchaseData }) => {
    const navigate = useNavigate();

    return (
        <div className='gridPurchase__container'>
            <p className='gridPurchase__price'><span className='gridPurchase__finalPrice'>Prix :</span>
                {packageDetails ? packageDetails.price : null }€</p>
<p className='gridPurchase__price'><span className='gridPurchase__finalPrice'>Nombre de package :</span> {formData ? formData.nombrePackage : null}</p>
            <p className='gridPurchase__price'>
                <span className='gridPurchase__finalPrice'>Total:</span>
                {formData ? formData.prixTotal : null }€
            </p>


            

            

            <div className='LineColor'></div>

            <div className='button__container'>
                <button className='button_valid' type="submit" onClick={sendPurchaseData}>Réserver</button>

                <button className='button__delete' type="button" onClick={() => navigate(`/package/${packageDetails ? packageDetails.id : ''}`)}>Annuler</button>
            </div>
        </div>
    )
}

export default GridPurchase;