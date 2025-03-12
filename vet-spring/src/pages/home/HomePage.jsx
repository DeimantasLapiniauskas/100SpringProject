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
                    Rustaveli Avenue 10, Tbilisi +995 511 233 789 Twenty-four hours a day
                </article>

                <h1 className="veterinary-company-in-georgia">Veterinary Company <br></br> in Georgia</h1>

                <p className="as-georgia-leading">
                As Georgia’s leading animal health company, SmartCare is<br></br>
                 driven by a singular purpose: to nurture Georgia and<br></br>
                  humankind by advancing care for animals.
                </p>
            </main>

            
        </div>
    )
}