import HomePageDog from "../../assets/dog.png"; 
import { PaginationProvider } from "../../context/PaginationContext";
import PostCarousel from "../posts/PostsCarousel";

export const HomePage = () => {
    return (
        <div className=" bg-[#DCDEFE] items-center ">
            {/* Top Section - Dog Image & Text */}
            <main className="flex flex-col md:flex-row-reverse gap-1 ">
                {/* Text Section */}
                <div className="text-content flex flex-col text-left px-1  text-[6px]">
                    <article className=" text-black">
                        Pavasario Avenue 100, Vilnius<br />
                        +370 511 233 78<br />
                        Twenty-four hours a day
                    </article>

                    <h1 className=" text-black">
                        Happy Hearts <br /> Veterinary Clinic
                    </h1>

                    <p className=" text-black">
                        As Lithuania’s leading animal health company, Happy Hearts is
                        driven by a singular purpose: to nurture Lithuania and
                        humankind by advancing care for animals.
                    </p>
                </div>

                {/* Image Section - Dog on Left */}
                <figure >
                    <img
                        className="w-full max-w-[5rem] md:max-w-[15rem] lg:max-w-[25rem] object-contain drop-shadow-lg"
                        src={HomePageDog}
                        alt="Dog; light brown and white fur; bent ears"
                    />
                </figure>
            </main>
            <PaginationProvider>
                <PostCarousel/>
                </PaginationProvider>
        </div>
    );
};