import ClientAll from "../../components/AdminComponents/ClientAll/ClientAll";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import '../../components/App/global.scss'

const ClientsAccounts = () => {
    return(
        <>
     <Header/>
     <main role="main">
     <ClientAll/>
     </main>
     <Footer/>
     </>
    )
}
export default ClientsAccounts;