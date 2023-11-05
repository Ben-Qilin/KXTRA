import React, {useEffect}from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Carrousel-top/carrousel.scss'
import Card from './Card/Card';
import { PepitasStore } from '../pepitas/PepitasStore';

import cafe from "../../assets/café.jpg"
import wine from "../../assets/wine.jpg" 
import cuisine from "../../assets/cusine.jpg"
const MyCarousel = () => {
    const { fetchAllInstitutions, institutions , fetchAllPackages, packages } = PepitasStore(state => state)
    useEffect(() => {
        
         fetchAllInstitutions();
         fetchAllPackages();
        }
    , [fetchAllInstitutions, fetchAllPackages]);
    
    // Créez un tableau d'images pour mapper avec les institutions
    const images = [cafe, wine, cuisine];
    console.log(packages)

    
        return (
            <div className="container">
                <Carousel infiniteLoop autoPlay interval={6000} showThumbs={false}>
                    {packages.sort(() => Math.random() - 0.5).slice(0, 7).map((pkg, index) => (
                        <div key={pkg.id}>
                            <img className="carousel__img" src={pkg && pkg.services && pkg.services[0] ? pkg.services[0].cover_serv: null}/>
                            <Card key={pkg.id} id={pkg.id} title={pkg.services[0].institution.name_ins} cover={pkg.services[0].institution.cover} style="card1" />
                            <div className='carousel__containerText'>
                                <div className='carousel__containerstyle'>
                                    <p className='carousel__text1'>En ce moment</p>
                                    <p className='carousel__text2'>Package</p>
                                    <h2 className='carousel__title'>{pkg ? pkg.name_pkg : null}</h2>
                                    <li>
                                        <li>{pkg && pkg.services && pkg.services[0] ? pkg.services[0].name_serv : null }</li>
                                        <li>{pkg && pkg.services && pkg.services[1] ? pkg.services[1].name_serv : null }</li>
                                    </li>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    };

export default MyCarousel;
// const MyCarousel = () => (

    
//     <div className="container">
//     <Carousel infiniteLoop="true" autoPlay="true" interval={6000}  showThumbs={false} >
//         <div>
//             <img  className="carousel__img" src={cafe} />
//             <Card  style="card1"/>
//             <div className='carousel__containerText'>
//                 <p className='carousel__text1'>En ce moment</p>
//                 <p className='carousel__text2'>Package</p>
//                 <h2 className='carousel__title'>Restaurant à l'aveugle</h2>
//             </div>
//         </div>
//         <div>
//             <img src={wine} className="carousel__img"/>
//             <Card style="card1"/>
//             <div className='carousel__containerText'>
//                 <p className='carousel__text1'>En ce moment</p>
//                 <p className='carousel__text2'>Package</p>
//                 <h2 className='carousel__title'>Restaurant à l'aveugle</h2>
//             </div>
//         </div>
//         <div>
//             <img src={cuisine} className="carousel__img"/>
//             <Card style="card1"/>
//             <div className='carousel__containerText'>
//                 <p className='carousel__text1'>En ce moment</p>
//                 <p className='carousel__text2'>Package</p>
//                 <h2 className='carousel__title'>Restaurant à l'aveugle</h2>
//             </div>
//         </div>
//     </Carousel>
//     </div>
    
    
    
// );

// export default MyCarousel;
