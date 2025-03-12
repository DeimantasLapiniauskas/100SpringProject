//import { useForm } from "react-hook-form";
//import {NavLink} from "react-router";
//import {useState} from "react";
//import {useAuth} from "../../context/AuthContext.jsx";
//import {Error} from "../../components/Error.jsx";

//import { Navbar } from "../components/NavBar.jsx";

//import {VetClinicRoutes} from "../../components/VetClinicRoutes.jsx";

import HomePageDog from "../../assets/dog.png";

export const HomePage = () => {
    return (
        <div className="home-page">
            <nav className="trialnavbarvladimir-container">
                <div className="trialnavbarvladimir"></div>
            </nav>

            <main className="company-meet">

                <figure>
                <img className="dog1" src={HomePageDog} alt="Dog; light brown and white fur; bent ears" />
                </figure>

                <article className="rustaveli-avenue">
                    Pavasario Avenue 100, Vilnius +370 511 233 78 Twenty-four hours a day
                </article>

                <h1 className="veterinary-company-in-georgia">Happy Hearts <br></br> Veterinary clinic</h1>

                <p className="as-georgia-leading">
                As Lithuania’s leading animal health company, Happy Hearts is<br></br>
                 driven by a singular purpose: to nurture Lithuania and<br></br>
                  humankind by advancing care for animals.
                </p>
            </main>

            
        </div>
    )
}