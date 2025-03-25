import HomePageDog from "../../assets/dog.png"; 
import TestCarousel from "../designtest/TestCarousel";
//import HomePagePawArrow from "../../assets/dog.png"; 

export const HomePage = () => {
    return (
      <div className="bg-[#DCDEFE]">
        {/* Top Section - Dog Image & Text */}
        <main className="flex flex-col sm:flex-row-reverse gap-2 items-center sm:items-start md:items-start lg:items-start">
          {/* Text Section */}
          <div className="flex flex-col px-3 lg:text-lg md:text-base sm:text-sm text-xs">
            <article className="figma-headline-4 text-black">
              Pavasario Avenue 100, Vilnius
              <br />
              +370 511 233 78
              <br />
              Twenty-four hours a day
            </article>

            <h1 className="figma-headline text-black lg:text-2xl md:text-xl sm:text-lg text-base">
              Happy Hearts <br /> Veterinary Clinic
            </h1>

            <p className="figma-headline-4 text-black lg:text-lg md:text-base sm:text-sm text-xs">
              As Lithuania’s leading animal health company, Happy Hearts is
              driven by a singular purpose: to nurture Lithuania and humankind
              by advancing care for animals.
            </p>
          </div>
          {/* Image Section - Dog on Left */}
          <figure>
            <img
              className="w-full max-w-[10rem] sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[35rem] object-contain drop-shadow-lg"
              src={HomePageDog}
              alt="Dog; light brown and white fur; bent ears"
            />
          </figure>
        </main>

        <div className="w-full bg-[#6A7AFF] py-12 mt-12 rounded-t-[50px] shadow-lg">
          <TestCarousel />
        </div>

      </div>
    );
};