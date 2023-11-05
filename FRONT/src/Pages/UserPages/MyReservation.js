import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import UserReservationAll from "../../components/UserReservationsAll/UserReservationAll"

const MyReservation = () => {
    return(
        <>
        <Header isLoggedIn={true}/>
        <main role="main">
        <UserReservationAll/>
        </main>
        <Footer/>
        
        </>

    )
}
export default MyReservation