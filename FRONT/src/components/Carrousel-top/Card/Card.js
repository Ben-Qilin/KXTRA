import React from 'react';
import { Link } from 'react-router-dom';
import next from '../../../assets/next.svg'
;
import etablissement1 from '../../../assets/etablissement.jpg'
import * as styles from './card.module.scss'



const Card = ({style, title, city, cover, id, coverBis}) => {
    
    return(
        <article className={styles[`${style}`]}>
        
            <div className={styles[`${style}__containerImg`]}>
            <img className={styles[`${style}__image`]} src={cover} alt=''></img>
            </div>
                
            <div className={styles[`${style}__container`]}>
                <h3 className={styles[`${style}__title`]}>{title}</h3>
                {/* <p className={styles[`${style}__rate`]}>4.5<span>⭐</span></p> */}
            </div>
            <p className={styles[`${style}__localisation`]}>{city}</p>
            <div className={styles[`${style}__containerAction`]}>
            <Link className={styles[`${style}__btn`]} to={`/package/${id}`}>
                    Détails... <img style={{height: '100%',width: '1.5rem', }} src={next} ></img>
                </Link>
            </div>
        </article>
    )
}

export default Card