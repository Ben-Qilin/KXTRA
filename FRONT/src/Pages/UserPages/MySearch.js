import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Carrousel-top/Card/Card";
import SimpleMap from '../../components/Map/Map';
import Illustrations from "../../components/Illustrations/Illustration";
import Filtered from "../../components/Filtered/Filtered";
import SearchBar from "../../components/SearchBar/SearchBar";
import '../UserPages/MySearch.scss';
import { FormSearchStore } from "../../components/FormHomePage/FormSearchStore";
import { useStore } from "zustand";

const MySearch = () => {
    const { fetchPkgSearch } = useStore(FormSearchStore);
    console.log(fetchPkgSearch)
    return (
        <>
            <Header />
            <main role="main">
                <Filtered />

                <div className="MySearch__container">

                    <div className="MySearch__cardContainer">
                        <SearchBar />


                        <h2 className="MySearch__title">Propositions</h2>

                        <div className="MySearch__card">
                            {fetchPkgSearch.map(fetchPkg => {
                                console.log(fetchPkg.id);  // Affichez l'ID pour le débogage
                                return <Card key={fetchPkg.id} title={fetchPkg.name_pkg} city={fetchPkg.services[0].institution.city_ins} id={fetchPkg.id} cover={fetchPkg.services[0].cover_serv}
                                    style="card2" />;
                            })}


                        </div>

                    </div>
                    <div className="MySearch__mapContainer">
                    <SimpleMap className="MySearch__map" />
                    </div>
                </div>
                <Illustrations />
            </main>
            <Footer />
        </>
    )
}

export default MySearch;