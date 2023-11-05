import React from "react"
import * as Accordion from '@radix-ui/react-accordion'
import './style.scss'
import AccordionTrigger from "./AccordionElements/AccordionTrigger"
import AccordionContent from "./AccordionElements/AccordionContent"



const UserResaAccordion = ({ purchase }) => {
    if (!purchase || !purchase.packages || !purchase.packages[0] || !purchase.packages[0].services || !purchase.packages[0].services[0]) {
        return null;
    }
    return (
        <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
            <Accordion.Item className="AccordionItem" value="item-1">
                <AccordionTrigger>
                    <div className="bloc__left">
                    <img className='icone_resa' src={purchase.packages[0].services[0].institution.cover}></img>
                        
                        
                    </div>
                    <div className="bloc__right">
                    <p>Du {purchase.date_start}</p>
                    <p>Au {purchase.date_end}</p>
                    <p>Package: {purchase.packages[0].name_pkg}</p>
                        <p>Nombre de packages: {purchase.quantity}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p>Tél :{purchase.packages[0].services[0].institution.phone_ins}</p>
                    <p>Participants: {purchase.packages[0].capacity} pers / package </p>
                    
                        <p>Adresse: {purchase.packages[0].services[0].institution.adress_ins}</p>
                        <p>Ville: {purchase.packages[0].services[0].institution.city_ins}</p>
                        <p>Code Postal: {purchase.packages[0].services[0].institution.cp_ins}</p>
                        <p>Mail: {purchase.packages[0].services[0].institution.email_ins}</p>
                        
                        <p>Date de réservation :{purchase.createdAt}</p>s
                    
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    );
}

export default UserResaAccordion
