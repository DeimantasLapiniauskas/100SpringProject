import HomePageDog from "../../assets/dog.png"; 
import TestCarousel from "../designtest/TestCarousel";
//import HomePagePawArrow from "../../assets/dog.png";
//import "../../App.css"; // Adjust if needed 

export const BandytiDesignHomePage = () => {
    return (
      <div className="min-h-screen flex flex-col items-center p-5">
        {/* Paw Prints in the Background */}
        <div className="absolute w-full min-h-screen top-0 left-0">

          {/* Paw 1 */}
          <div
            className="
      pawss-for-background-medium
      left-[5%] top-[10%]
      md:left-[11%] md:top-[22%]
      lg:left-[18%] lg:top-[14%]
      xl:left-[3%] xl:top-[11%]
    "></div>

          {/* Paw 2 */}
          <div
            className="
      pawss-for-background-medium
      left-[77%] top-[13%]
      md:left-[37%] md:top-[18%]
      lg:left-[47%] lg:top-[15%]
      xl:left-[19%] xl:top-[18%]
    "></div>

          {/* Paw 3 */}
          <div
            className="
      pawss-for-background-medium
      left-[66%] top-[33%]
      md:left-[41%] md:top-[40%]
      lg:left-[47%] lg:top-[56%]
      xl:left-[7%] xl:top-[28%]
    "></div>

          {/* Paw 4 */}
          <div
            className="
      pawss-for-background-medium
      left-[3%] top-[44%]
      md:left-[1%] md:top-[50%]
      lg:left-[2%] lg:top-[67%]
      xl:left-[14%] xl:top-[40%]
    "></div>
    
        </div>

        {/* Top Section - Dog Image & Text */}
        <main className="relative flex flex-col sm:flex-row-reverse items-center w-full max-w-screen-xl gap-12">
          {/* Text Section */}
          <div className="text-content flex flex-col sm:basis-1/2 text-left space-y-4 px-5">
            <article className="figma-headline-4 text-black">
              Pavasario Avenue 100, Vilnius
              <br />
              +370 511 233 78
              <br />
              Twenty-four hours a day
            </article>

            <h1 className="figma-headline text-black sm:text-7xl">
              Happy Hearts <br /> Veterinary Clinic
            </h1>

            <p className="figma-headline-4 text-black sm:text-xl">
              As Lithuania’s leading animal health company, Happy Hearts is
              driven by a singular purpose: to nurture Lithuania and humankind
              by advancing care for animals.
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
        </main>

        <div className="w-full bg-[#6A7AFF] py-12 mt-12 rounded-t-[50px] shadow-lg">
          <TestCarousel />
        </div>
      </div>
    );
};

export default BandytiDesignHomePage;