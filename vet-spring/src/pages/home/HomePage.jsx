import HomePageDog from "../../assets/dog.png"; 
import { PaginationProvider } from "../../context/PaginationContext";
import PostCarousel from "../posts/PostsCarousel";

export const HomePage = () => {
    return (
        <div className="min-h-screen bg-[#DCDEFE] flex flex-col items-center p-5">
            {/* Top Section - Dog Image & Text */}
            <main className="relative flex flex-col sm:flex-row-reverse items-center w-full max-w-screen-xl gap-12">
                {/* Text Section */}
                <div className="text-content flex flex-col sm:basis-1/2 text-left space-y-4 px-5">
                    <article className="text-lg text-black">
                        Pavasario Avenue 100, Vilnius<br />
                        +370 511 233 78<br />
                        Twenty-four hours a day
                    </article>

                    <h1 className="figma-headline text-black text-5xl sm:text-7xl">
                        Happy Hearts <br /> Veterinary Clinic
                    </h1>

                    <p className="text-lg sm:text-xl text-black leading-relaxed">
                        As Lithuania’s leading animal health company, Happy Hearts is
                        driven by a singular purpose: to nurture Lithuania and
                        humankind by advancing care for animals.
                    </p>
                </div>

                {/* Image Section - Dog on Left */}
                <figure className="relative sm:basis-1/2 flex justify-center">
                    <img
                        className="w-full max-w-[50vw] sm:max-w-[550px] h-auto object-cover drop-shadow-lg -mb-6"
                        src={HomePageDog}
                        alt="Dog; light brown and white fur; bent ears"
                    />
                </figure>
                <PaginationProvider>
                <PostCarousel/>
                </PaginationProvider>
            </main>
        </div>
    );
};