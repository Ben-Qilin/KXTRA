import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ClientsOrdersAll from "../../components/ProviderComponents/ClientsOrders/ClientsOrdersAll"

const ClientsOrdersPage = () => {
    return(
        <>
        <Header/>
        <main role="main">
            
        <ClientsOrdersAll/>
        
        </main>
        <Footer/>
        </>
    )
}
export default ClientsOrdersPage