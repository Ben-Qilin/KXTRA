import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import restau from '../../assets/restau.jpg';
import geuleton from '../../assets/geuleton.jpg';
import spa from '../../assets/spa.jpg';
import '../PackageInfo/PackagePictures.scss';

const PackagePictures = () => {
    return (
        <div className='carrousel__container'>
            <img></img>
            <Carousel infiniteLoop="true" autoPlay="true" interval={6000} showThumbs={false} >
                <img className='carrousel_pictures' src={restau} />
                <img className='carrousel_pictures' src={geuleton} />
                <img className='carrousel_pictures' src={spa} />
            </Carousel>
        </div>
    )
}

export default PackagePictures;