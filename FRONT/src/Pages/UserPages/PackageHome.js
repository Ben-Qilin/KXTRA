import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridChoice from "../../components/GridChoice/GridChoice";
import PackageText from "../../components/PackageInfo/PackageText/PackageText";
import SimpleMap from "../../components/Map/Map";
import PackagePictures from "../../components/PackageInfo/PackagePictures";
import Filtered from "../../components/Filtered/Filtered";
import '../UserPages/PackageHome.scss';
const apiUrl = process.env.REACT_URL_API;
const PackageHome = () => {
    const { id } = useParams();
    const [packageDetails, setPackageDetails] = useState(null);

    useEffect(() => {
        async function loadPackageDetails() {
            try {
                const response = await axios.get(`${apiUrl}/package/${id}`);
                setPackageDetails(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des détails du package :", error);
            }
        }

        loadPackageDetails();
    }, [id]);
    console.log(packageDetails)
    return (
        <>
            <Header />
            <Filtered />
            <div className="PicMap__container">
                <div className='PicMap__layoutImg'>



                    <div className='PicMap__sublayoutImg'>
                        <img className='PicMap__img1 ccc' src={packageDetails ? packageDetails.services[0].institution.cover : 'Chargement...'}></img>
                        {packageDetails && packageDetails.services[0] && <img className='PicMap__Img vvv' src={packageDetails.services[0].cover_serv} ></img>}
                        {packageDetails && packageDetails.services[1] && <img className='PicMap__Img bbb' src={packageDetails.services[1].cover_serv} ></img>}

                        {/* ))} */}


                    </div>
                    <div className='PicMap__map'>
                        <SimpleMap />

                    </div>
                    <p className='PicMap__pkg'>Package:
                        {packageDetails && packageDetails.services && packageDetails.services[0] ? packageDetails.services[0].name_serv : 'Chargement...'} +
                        {packageDetails && packageDetails.services && packageDetails.services[1] ? packageDetails.services[1].name_serv : 'Chargement...'}
                    </p>
                    <p>Prix pour {packageDetails ? packageDetails.capacity : 'Chargement...'} Pers.</p>
                </div>
                <div className='PicMap__institution'>
                    <h2>{packageDetails ? packageDetails.services[0].institution.name_ins : 'Chargement...'}</h2>
                    <p>{packageDetails ? packageDetails.services[0].institution.experiences : 'Chargement...'}</p>
                </div>
                <p className='PicMap__price'>{packageDetails ? packageDetails.price : 'Chargement...'} € </p>
                {/* <SimpleMap style={{height: '100%'}} /> */}
            </div>
            <div className="GridChoice__container">

                <PackageText packageDetails={packageDetails} />
                <GridChoice packageDetails={packageDetails}/>
            </div>
            <Footer />
        </>
    )
}

export default PackageHome;