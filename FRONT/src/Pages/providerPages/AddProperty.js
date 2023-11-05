import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import AddPropertyForm from "../../components/ProviderComponents/AddPropertyForm/AddPropertyForm"

const AddProperty = () => {
    return(
        <>
        <Header/>
        <main role="main">
        <AddPropertyForm/>
        </main>
        <Footer/>
        </>
    )
}
export default AddProperty