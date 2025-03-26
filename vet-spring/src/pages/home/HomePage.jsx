import HomePageDog from "../../assets/dog.png"; 
import { ListProvider } from "../../context/ListContext";
import PostCarousel from "../posts/PostsCarousel";

export const HomePage = () => {
    return (
        <div className=" bg-[#DCDEFE] ">
            {/* Top Section - Dog Image & Text */}
            <main className="flex flex-col sm:flex-row-reverse gap-2 items-center sm:items-start md:items-start lg:items-start">
                {/* Text Section */}
                <div className="flex flex-col px-3 lg:text-lg md:text-base sm:text-sm text-xs">
                    <article className=" text-black">
                        Pavasario Avenue 100, Vilnius<br />
                        +370 511 233 78<br />
                        Twenty-four hours a day
                    </article>

                    <h1 className=" text-black lg:text-2xl md:text-xl sm:text-lg text-base">
                        Happy Hearts <br /> Veterinary Clinic
                    </h1>

                    <p className=" text-black lg:text-lg md:text-base sm:text-sm text-xs">
                        As Lithuania’s leading animal health company, Happy Hearts is
                        driven by a singular purpose: to nurture Lithuania and
                        humankind by advancing care for animals.
                    </p>
                </div>
                {/* Image Section - Dog on Left */}
                <figure >
                    <img
                        className="w-full max-w-[10rem] sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[35rem] object-contain drop-shadow-lg"
                        src={HomePageDog}
                        alt="Dog; light brown and white fur; bent ears"
                    />
                </figure>
            </main>
            <ListProvider>
                <PostCarousel/>
            </ListProvider>
        </div>
    );
};