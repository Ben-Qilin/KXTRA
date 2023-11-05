import Header from '../../components/Header/Header'
import AddPackageForm from '../../components/ProviderComponents/AddPackageForm/AddPackageForm'
import Footer from '../../components/Footer/Footer'
const AddPackage = () => {
    return(
        <>
        <Header/>
        <main role='main'>
          <AddPackageForm/>  
        </main>
        
        <Footer/>
        </>
    )
}
export default AddPackage