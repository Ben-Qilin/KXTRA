import React from "react";
import './illustrations.scss';
import winTime from "../../assets/winTime.svg";
import idea from "../../assets/idea.svg";
import qualityXP from "../../assets/qualityXP.svg";

const Illustrations = () => {
    return (
        <section className="illustrations">
            <div className="illustrations__container">
                <img className="illustrations__img" src={winTime} alt=""></img>
                <p className="illustrations__text">Gagner du temps</p>
            </div>
            <div className="illustrations__container">
                <img className="illustrations__img" src={idea} alt=""></img>
                <p className="illustrations__text">Donner de l'inspiration</p>
            </div>
            <div className="illustrations__container">
                <img className="illustrations__img" src={qualityXP} alt=""></img>
                <p className="illustrations__text">Vivre des expèriences de qualités sans voyager</p>
            </div>
        </section>
    );
};
export default Illustrations;
