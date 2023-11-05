import { Navigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {UseSignInStore}  from '../AuthLogin/signInStore'


 export const ProtectedRoute = ({children, requiredRoles}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn, user ,autoConnect, triedAutoConnect } = UseSignInStore();

    useEffect(()=>{
            console.log('useEffect')
            //
            if(!isLoggedIn && localStorage.getItem('token')) {
               autoConnect(); 
            } else {
                setIsLoading(false) 
            }
            
             },[user, triedAutoConnect])
    if(isLoading) {
        return <h1>Loading</h1>
    }
    console.log(user, isLoggedIn)
    if(!isLoggedIn) {
        return <Navigate to='/auth'/>
    }
    if(requiredRoles !== undefined) {
        if(!requiredRoles.includes(user.role)) {
            return <Navigate to='/404'/>
        }

    }
    
    return children

    
}
// ! gestion des role et protection des route a gérer ici 