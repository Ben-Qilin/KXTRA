import React from "react"
import './buttonBack.scss'
import down from '../../../assets/down.svg'
import { useNavigate } from "react-router-dom"

const ButtonBack = ({ redirectPath }) => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate(redirectPath);
    }
    
    return(
     <button className="buttonBack" onClick={handleRedirect}><img src={down}></img></button>
    )
}
export default ButtonBack