import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProviderPage from "../../components/ProviderComponents/ProviderPage/ProviderPage";

const ProviderHomepage = () =>{
    return(
        <>
            <Header />
            <main role="main" className="main">
            <ProviderPage />
            </main>
            <Footer />
        </>
    )
}

export default ProviderHomepage;