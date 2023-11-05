import Header from "../../components/Header/Header"
import React, {useEffect} from "react"
import Card from "../../components/Carrousel-top/Card/Card"
import { PepitasStore } from "../../components/pepitas/PepitasStore"
import './myWishlist.scss'
import Footer from "../../components/Footer/Footer"
const MyWishlist = () => {
    const { fetchAllInstitutions, institutions , fetchAllPackages, packages } = PepitasStore(state => state)
    useEffect(() => {
        
         fetchAllInstitutions();
         fetchAllPackages();
        }
    , [fetchAllInstitutions, fetchAllPackages]);
    return(
        <>
        <Header isLoggedIn={true}/>
        <main role="main">
        <section className="myWishlist">
            <div className="myWishlist__boxTitle">
            <h2 className="myWishlist__title">Mes Services Favoris</h2>
            </div>
            <div className="myWishlist__boxCards" >
            {packages.sort(() => Math.random() - 0.5).slice(0, 5).map((pkg) => (
                        <Card key={pkg.id} style="card2" id={pkg.id} title={pkg.name_pkg} city={pkg.services[0].institution.city_ins} cover={pkg.services[0].cover_serv} coverBis={pkg.services[1] ? pkg.services[1].cover_serv : null} />
                    ))}
                
            </div>
        </section>

        </main>
        <Footer/>
        </>
    )
}
export default MyWishlist