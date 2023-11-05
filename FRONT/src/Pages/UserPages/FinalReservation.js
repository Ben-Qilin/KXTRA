import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import Illustrations from "../../components/Illustrations/Illustration"
import FinalPurchase from "../../components/Purchase/FinalPurchase"
import GridPurchase from "../../components/Purchase/GridPurchase"
import '../UserPages/FinalReservation.scss'
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from "react-router-dom"
const apiUrl = process.env.REACT_URL_API;
const FinalReservation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let formData, packageDetails;

    if (location.state) {
        ({ formData, packageDetails } = location.state);
    }

    const sendPurchaseData = async () => {
        if (!formData || !packageDetails) {
            console.error("Les données du formulaire ou les détails du package sont manquants.");
            return;
        }

        const { nombrePackage, prixTotal, dateArrivee, dateDepart } = formData;
        const { services } = packageDetails;

        if (!nombrePackage || !prixTotal || !dateArrivee || !dateDepart || !services) {
            console.error("Un ou plusieurs champs du formulaire sont manquants.");
            return;
        }

        const purchaseData = {
            quantity: nombrePackage,
            price: prixTotal,
            date_start: dateArrivee,
            date_end: dateDepart,
            hour_start: packageDetails && packageDetails.services[0] ? services[0].date_start : (packageDetails && packageDetails.services[1] ? packageDetails.services[1].date_end : null),
            hour_end: packageDetails && packageDetails.services[1] ? services[1].date_end : (packageDetails && packageDetails.services[0] ? packageDetails.services[0].date_end : null),
            package_id:packageDetails ? packageDetails.id : null
        };

        try {
            const response = await axios.post(`${apiUrl}/purchases`, purchaseData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
            const purchaseId = response.data.purchase.id;
            const packageId = packageDetails.id;
            console.log(packageId)

            const relationData = {
                purchaseId: purchaseId,
                packageId: packageId,
            };

            await axios.post(`${apiUrl}/purchase/package`, relationData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await axios.put(`${apiUrl}/purchases/packages/${packageId}`, {
                quantity: nombrePackage,


            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            alert('commande bien effectué')
            navigate('/confirmation-reservation')
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Header />
            <main role="main">
                <div className='purchase__container'>

                    <h1 className='purchase__title'>Votre <span className='purchase__subtitle'>Réservation</span></h1>
                    <div className='componants__container'>
                        <FinalPurchase packageDetails={packageDetails} formData={formData} />
                        <GridPurchase packageDetails={packageDetails} sendPurchaseData={sendPurchaseData} formData={formData} />
                    </div>

                </div>
                <Illustrations />
            </main>
            <Footer />


        </>
    )
}
export default FinalReservation