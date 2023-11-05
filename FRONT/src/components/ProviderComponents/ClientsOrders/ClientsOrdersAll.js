
import React, {useEffect, useState} from "react";
import AccordionOrder from "./AccordionOrder"
import './clientsOrdersAll.scss'
import { UseSignInStore } from "../../AuthLogin/signInStore";
import ButtonBack from "../ButtonBack/ButtonBack";
import axios from "axios";

const apiUrl = process.env.REACT_URL_API;
const ClientsOrdersAll = () => {
    const { isLoggedIn, user, logOut, isAdmin, isProvider} = UseSignInStore();
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
      const fetchPurchases = async () => {
        try {
          const response = await axios.get(`${apiUrl}/purchases`);
          setPurchases(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des achats:', error);
        }
      };
  
      fetchPurchases();
    }, []);
    return(
    <section className="clientsOrders">
          <ButtonBack redirectPath={isProvider ? '/my-properties' : isAdmin ? '/my-adminAccount' : "" }/>
        <h2 className="clientsOrders__title">Les commandes clients</h2>
     <section className="clientsOrders__accordionContainer">
      {purchases ? purchases.map(purchase => (
        <AccordionOrder key={purchase.id} purchase={purchase}/>
      )): <p>Chargement des achats...</p>}
    
    
    </section>
    </section>
    )
}
export default ClientsOrdersAll