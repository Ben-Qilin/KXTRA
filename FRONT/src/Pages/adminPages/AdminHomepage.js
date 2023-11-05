import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/AdminComponents/AdminButton/AdminButton";
import AdminChart from "../../components/AdminComponents/AdminChart/AdminChart";
import FilteredButton from "../../components/AdminComponents/FilteredButton/FilteredButton";

const AdminHomepage = () => {
    return (
        <>
            <Header />
            <AdminChart />
            <Button />
            <FilteredButton />
            <Footer />
        </>
    )
}

export default AdminHomepage;