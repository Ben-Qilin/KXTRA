import '../Purchase/FinalPurchase.scss';
import xeno from '../../assets/xenomorph.jpeg'
import mastercard from '../../assets/mastercard.png'
import paypal from '../../assets/paypal.png'
import amex from '../../assets/amex.png'
import visa from '../../assets/visa.png'



const FinalPurchase = ({ packageDetails, formData }) => {
    



    console.log(packageDetails)
    let cover;
    if (packageDetails && packageDetails.services && packageDetails.services[0] && packageDetails.services[0].institution) {
        cover = packageDetails.services[0].institution.cover;
    }
    return (
        <div className="Final__container">

            <div className="Final__infoContainer">
                <div className='Final__img'>
                    {cover && <img src={cover} className='Final__Img' />}
                    {packageDetails && packageDetails.services[0] && <img className='Final__vignet Final__vignet1' src={packageDetails.services[0].cover_serv} ></img>}
                    {packageDetails && packageDetails.services[1] && <img className='Final__vignet Final__vignet2' src={packageDetails.services[1].cover_serv} ></img>}
                </div>

                <div className="Final__info">
                    <h2 className='Final__name'>{packageDetails ? packageDetails.name_pkg : null}</h2>

                    <p className='Final__institution'>
                        {packageDetails && packageDetails.services[0] && packageDetails.services[0].institution ? packageDetails.services[0].institution.name_ins : null}
                    </p>

                    <button className="Final__buttonInfo" type="button">Plus de détails</button>

                    <div className="Final__date">
                        <p><span className="Final__dateInfo">Date de début:</span> {formData ? formData.dateArrivee : null}</p>

                        <p><span className="Final__dateInfo">Date de fin:</span> {formData ? formData.dateDepart : null}</p>

                    </div>

                    <p className="Final__number" >Nombre de participants / package:  {packageDetails ? packageDetails.capacity : null}</p>

                    <button className="Final__buttonModif" type="button">Modifier</button>

                </div>

            </div>

            <h3 className="pay__title">Moyen de <span className="pay__subtitle">paiement</span></h3>

            <nav className="pay__logo">
                <a><img src={mastercard} ></img></a>
                <a><img src={paypal} ></img></a>
                <a><img src={amex} ></img></a>
                <a><img src={visa} ></img></a>
            </nav>

        </div>
    )
};

export default FinalPurchase;