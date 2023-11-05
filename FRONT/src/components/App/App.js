//importation des librairies/dependances et des composants
import React, { useEffect, useState } from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../../Pages/Home/Home"
import AuthLogin from "../../Pages/AuthLogin/AuthLogin"
import PageNotFound from "../../Pages/PageNotFound/PageNotFound"
import AdminHomepage from "../../Pages/adminPages/AdminHomepage"
import ClientsAccounts from "../../Pages/adminPages/ClientsAccounts"
import ProviderCreate from "../../Pages/adminPages/ProviderCreate"
import MyAccount from '../../Pages/UserPages/MyAccount'
import ProviderHomepage from "../../Pages/providerPages/ProviderHomepage"
import MyWishlist from "../../Pages/UserPages/MyWishlist"
import MyReservation from "../../Pages/UserPages/MyReservation"
import MySearch from "../../Pages/UserPages/MySearch"
//importation des styles scss
import "../App/reset.scss"
import "../App/global.scss"
import "../App/mixin.scss"
import { ProtectedRoute } from "../Security/ProtectedRoute"
import AddService from "../../Pages/providerPages/AddService"
import AddProperty from "../../Pages/providerPages/AddProperty"
import ClientsOrdersAll from "../ProviderComponents/ClientsOrders/ClientsOrdersAll"
import ClientsOrdersPage from "../../Pages/providerPages/ClientsOrdersPage"
import FinalReservation from "../../Pages/UserPages/FinalReservation"
import ProviderAccount from "../../Pages/providerPages/ProviderAccount"

import { UseSignInStore } from "../AuthLogin/signInStore"
import MailValidation from "../../Pages/UserPages/MailValidation"
import ConfirmReservation from "../../Pages/UserPages/ConfirmReservation"
import PackageHome from "../../Pages/UserPages/PackageHome"
import AddPackage from "../../Pages/providerPages/AddPackage"
import CalendarPrice from "../../Pages/Calendar/CalendarPrice"



// Composant principal  qui represente tout le site
const App = () => {
    const { autoConnect } = UseSignInStore();

    //!faire un useeffect pour connecter utilisateur si presence de token pour persistance de la connexion
    useEffect(() => {
        console.log('useEffect')
        autoConnect();
    }, [])
    // if(isLoading) {
    //     return <h1>loading</h1>;
    // }
    return (
        // Le composant BrowserRouter encapsule les routes de l'application.
        //Le composant Routes contient tous vos chemins de route.
        //Le composant Route represente le chemin de l'url ou se trouve l'utilisateur
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthLogin />} />

                <Route path="/404" element={<PageNotFound />} />
                <Route path="/my-adminAccount" element={<ProtectedRoute requiredRoles={['admin']}><AdminHomepage /></ProtectedRoute>} />
                <Route path="/clients-list" element={<ProtectedRoute requiredRoles={['admin']}><ClientsAccounts /></ProtectedRoute>} />
                <Route path="/add-provider" element={<ProtectedRoute requiredRoles={['admin']}><ProviderCreate /></ProtectedRoute>} />
                <Route path="/add-service" element={<ProtectedRoute requiredRoles={['provider']}><AddService /></ProtectedRoute>} />
                <Route path="/my-account" element={<ProtectedRoute requiredRoles={['user']}><MyAccount /></ProtectedRoute>} />
                <Route path="/my-wishlist" element={<ProtectedRoute requiredRoles={['user']}><MyWishlist /></ProtectedRoute>} />
                <Route path="/my-properties" element={<ProtectedRoute requiredRoles={['provider']}><ProviderHomepage /></ProtectedRoute>} />
                <Route path="/my-reservation" element={<ProtectedRoute requiredRoles={['user']}><MyReservation /></ProtectedRoute>} />
                <Route path="/add-property" element={<ProtectedRoute requiredRoles={['provider']}><AddProperty /></ProtectedRoute>} />
                <Route path="/clients-orders" element={<ProtectedRoute requiredRoles={['admin', 'provider']}><ClientsOrdersPage /></ProtectedRoute>} />
                <Route path="/final-reservation" element={<ProtectedRoute requiredRoles={['user']}><FinalReservation /></ProtectedRoute>} />
                <Route path="/confirmation-reservation" element={<ProtectedRoute requiredRoles={['user']}><ConfirmReservation /></ProtectedRoute>} />
                <Route path="/search" element={<MySearch />} />
                <Route path="/package/:id" element={<PackageHome />} />
                
                
                <Route path="/list-provider" element={<ProviderAccount />} />
                <Route path="/add-package" element={<AddPackage/>}/>
                
                <Route path="/calendar" element={<ProtectedRoute requiredRoles={['admin', 'provider']}><CalendarPrice /></ProtectedRoute>} />
                <Route path="/validation-email/:token" element={<MailValidation />} />

            </Routes>

        </BrowserRouter>
    )
}
export default App