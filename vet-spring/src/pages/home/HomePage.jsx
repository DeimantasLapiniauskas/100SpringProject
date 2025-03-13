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
        <div className="min-h-screen bg-[#F5F4F4] flex justify-center items-center p-5">
            <main className="flex flex-wrap justify-between items-start w-full max-w-screen-xl gap-8">
                <figure className="flex-shrink-0 w-full sm:w-1/3">
                    <img
                        className="w-full max-w-[35vw] sm:max-w-[700px] h-auto object-cover"
                        src={HomePageDog}
                        alt="Dog; light brown and white fur; bent ears"
                    />
                </figure>

                <div className="text-content flex flex-col w-full sm:w-2/3 text-left pl-5 space-y-4">
                    <article className="text-base text-black">
                        Pavasario Avenue 100, Vilnius<br />
                        +370 511 233 78<br />
                        Twenty-four hours a day
                    </article>

                    <h1 className="text-4xl text-black">
                        Happy Hearts <br /> Veterinary clinic
                    </h1>

                    <p className="text-base text-black leading-relaxed">
                        As Lithuania’s leading animal health company, Happy Hearts is<br />
                        driven by a singular purpose: to nurture Lithuania and<br />
                        humankind by advancing care for animals.
                    </p>
                </div>
            </main>
        </div>
    );
};