
import React, { useEffect } from 'react';
import Card from '../Carrousel-top/Card/Card.js';
import './pepitas.scss'
import { PepitasStore } from './PepitasStore.js';

const Pepitas = () => {
    const { fetchAllInstitutions, institutions, fetchAllPackages, packages } = PepitasStore(state => state)
    useEffect(() => {
        fetchAllPackages();
         fetchAllInstitutions();
        }
    , [fetchAllInstitutions, fetchAllPackages]);
    return (
        <section className='pepites'>
            <h2 className='pepites__title'>Nos <span>Pépites</span></h2>
            <div className='pepites__cardContainer'>
                {packages.sort(() => Math.random() - 0.5).slice(0, 5).map((pkg) => (
                        <Card key={pkg.id} style="card2" id={pkg.id} title={pkg.name_pkg} city={pkg.services[0].institution.city_ins} cover={pkg.services[0].cover_serv} coverBis={pkg.services[1] ? pkg.services[1].cover_serv : null} />
                    ))}

            </div>
        </section>
    )
}

export default Pepitas;