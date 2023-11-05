import React, { useEffect } from 'react';
import Card from '../../Carrousel-top/Card/Card.js';
import SimpleMap from '../../Map/Map.js';
import SearchBar from '../../SearchBar/SearchBar.js';
import '../ProviderPage/ProviderPage.scss';
import { Link } from 'react-router-dom';
import { ProviderPageStore } from './ProviderPageStore.js';
import { UseSignInStore } from '../../AuthLogin/signInStore.js';

const ProviderPage = () => {
    const user = UseSignInStore((state) => state.user);
    const { fetchInstitutions, institutions } = ProviderPageStore(state => state)
    
    useEffect(() => {
        if (user) {
            fetchInstitutions(user.id);
        }
    }, [fetchInstitutions, user]);
    console.log(fetchInstitutions)
    console.log(institutions)
    return (
        <section className="ProviderPage__container">

            <SearchBar />

            <div className="ProviderPage__CardsMapContainer">
                <div className='ProviderPage__cardsContainer'>
                    <h2 className="ProviderPage__title">Mes <span className="ProviderPage__subtitle">Etablissements</span></h2>

                    <div className='ProviderPage__cards'>

                        {institutions.map((institution) => (
                            <Card key={institution.id} style="card2" title={institution.name_ins} city={institution.city_ins} cover={institution.cover} />
                        ))}
                        {/* <Card style="card2" /> */}

                    </div>
                </div>
                
                    <SimpleMap className="ProviderPage__map" />
                
            </div>

            <h2 className="ProviderPage__title">En tant que <span className="ProviderPage__subtitle">prestataire</span>, je souhaite :</h2>

            <nav className="ProviderPage__navLink">
                <Link className="ProviderPage__link" to="/add-property">Ajouter un établissement</Link>
                <Link className="ProviderPage__link" to="/add-service">Ajouter un service</Link>
                <Link className="ProviderPage__link" to="/add-package">Créer un package</Link>
                <Link className="ProviderPage__link" to="/clients-orders">Liste des commandes clients</Link>

            </nav>

        </section>
    )
}

export default ProviderPage;