import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProviderList from "../../components/ProviderComponents/ProviderList/ProviderList"

const ProviderAccount = () => {
    return (
        <>
            <Header />
            <section className="clientsOrders">
                <h2 className="clientsOrders__title">La liste des comptes prestataires</h2>
                <section className="clientsOrders__accordionContainer">
                    <ProviderList />
                    <ProviderList />
                    <ProviderList />
                    <ProviderList />
                    <ProviderList />
                    <ProviderList />
                </section>
            </section>
            <Footer />
        </>
    )
}

export default ProviderAccount;