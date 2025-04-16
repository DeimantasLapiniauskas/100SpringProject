import HomePageDog from "../../assets/images/dog.png"; 
import TestCarousel from "../designtest/TestCarousel";
//import HomePagePawArrow from "../../assets/dog.png";
//import "../../App.css"; // Adjust if needed 

export const BandytiDesignHomePage = () => {
    return (
      <div className="bg-[#DCDEFE]">
        {/* Paw Prints in the Background */}
        <div className="absolute w-full min-h-screen top-0 left-0">

          {/* Paw 1 */}
          <div
            className="
      pawss-for-background-medium
      left-[87%] top-[6%]
      sm:left-[77%] sm:top-[6%]
      md:left-[70%] md:top-[8%]
      lg:left-[60%] lg:top-[9%]
      xl:left-[55%] xl:top-[9%]
      2xl:left-[3%] 2xl:top-[11%]
    "></div>

          {/* Paw 2 */}
          <div
            className="
      pawss-for-background-medium
      left-[74%] top-[13%]
      sm:left-[11%] sm:top-[17%]
      md:left-[6%] md:top-[24%]
      lg:left-[23%] lg:top-[19%]
      xl:left-[71%] xl:top-[18%]
      2xl:left-[19%] 2xl:top-[18%]
    "></div>

          {/* Paw 3 */}
          <div
            className="
      pawss-for-background-medium
      left-[77%] top-[49%]
      sm:left-[65%] sm:top-[29%]
      md:left-[80%] md:top-[28%]
      lg:left-[88%] lg:top-[22%]
      xl:left-[44%] xl:top-[33%]
      2xl:left-[7%] 2xl:top-[28%]
    "></div>

          {/* Paw 4 */}
          <div
            className="
      pawss-for-background-medium
      left-[11%] top-[55%]
      sm:left-[14%] sm:top-[38%]
      md:left-[15%] md:top-[37%]
      lg:left-[25%] lg:top-[30%]
      xl:left-[88%] xl:top-[36%]
      2xl:left-[14%] 2xl:top-[40%]
    "></div>
    
        </div>

        {/* Top Section - Dog Image & Text */}
        <main className="relative flex flex-col sm:flex-row-reverse items-center sm:items-start md:items-start lg:items-start">
          {/* Text Section */}
          <div className="flex flex-col px-3 lg:text-lg md:text-base sm:text-sm text-xs">
            <article className="figma-headline-4 text-black">
              Pavasario Avenue 100, Vilnius
              <br />
              +370 511 233 78
              <br />
              Twenty-four hours a day
            </article>

            <h1 className=" text-black lg:text-2xl md:text-xl sm:text-lg text-base">
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

export default BandytiDesignHomePage;