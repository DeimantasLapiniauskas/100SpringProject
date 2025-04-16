import HomePageDog from "../../assets/images/dog.png";
import TestCarousel from "../designtest/TestCarousel";
//import HomePagePawArrow from "../../assets/dog.png";

export const BandytiDesignH1 = () => {
    return (
      <div className="bg-[#DCDEFE]">
        {/* Paw Prints in the Background */}
                <div className="relative w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Paw 1 */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[6rem] h-[6rem]
              sm:w-[7rem] sm:h-[7rem]
              md:w-[8rem] md:h-[8rem]
              lg:w-[10rem] lg:h-[10rem]

              left-[14rem] top-[1rem]

              sm:left-[26rem] sm:top-[1rem]

              md:left-[38rem] md:top-[1rem]

              lg:left-[52rem] lg:top-[1rem]

              xl:left-[58rem] xl:top-[1rem]

              2xl:left-[92rem] 2xl:top-[1rem]

              translate-x-[1rem] translate-y-[1rem]
            "
          ></div>

          {/* Paw 2 */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[6rem] h-[6rem]
              sm:w-[7rem] sm:h-[7rem]
              md:w-[8rem] md:h-[8rem]
              lg:w-[10rem] lg:h-[10rem]

              left-[18rem] top-[5rem]
            
              sm:left-[30rem] sm:top-[5rem]

              md:left-[42rem] md:top-[5rem]

              lg:left-[56rem] lg:top-[5rem]

              xl:left-[62rem] xl:top-[5rem]

              2xl:left-[96rem] 2xl:top-[5rem]

              translate-x-[-0.5rem] translate-y-[-0.5rem]
            "
          ></div>

          {/* Paw 3 */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[6rem] h-[6rem]
              sm:w-[7rem] sm:h-[7rem]
              md:w-[8rem] md:h-[8rem]
              lg:w-[10rem] lg:h-[10rem]

              left-[13rem] top-[6rem]

              sm:left-[23rem] sm:top-[6rem]

              md:left-[35rem] md:top-[6rem]

              lg:left-[49rem] lg:top-[6rem]

              xl:left-[55rem] xl:top-[6rem]

              2xl:left-[89rem] 2xl:top-[6rem]

              translate-x-[1rem] translate-y-[-1rem]
            "
          ></div>

          {/* Paw 4 */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[6rem] h-[6rem]
              sm:w-[7rem] sm:h-[7rem]
              md:w-[8rem] md:h-[8rem]
              lg:w-[10rem] lg:h-[10rem]

              left-[13rem] top-[3rem]

              sm:left-[28rem] sm:top-[7rem]

              md:left-[40rem] md:top-[7rem]

              lg:left-[54rem] lg:top-[7rem]

              xl:left-[60rem] xl:top-[7rem]

              2xl:left-[93rem] 2xl:top-[7rem]

              translate-x-[-1rem] translate-y-[0.5rem]
            "
          ></div>
        </div>

        {/* Top Section - Dog Image & Text */}
        <main className="relative flex flex-col sm:flex-row-reverse items-center sm:items-start md:items-start lg:items-start">
          {/* Text Section */}
          <div className="flex flex-col px-3">
            <article className=" text-black lg:text-lg md:text-base sm:text-sm text-xs">
              Pavasario Avenue 100, Vilnius
              <br />
              +370 511 233 78
              <br />
              Twenty-four hours a day
            </article>
            <br />

            <h1 className=" text-black lg:text-6xl md:text-4xl sm:text-lg text-base">
              Happy Hearts <br /> Veterinary Clinic
            </h1>
            <br />

            <p className=" text-black lg:text-lg md:text-base sm:text-sm text-xs">
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

export default BandytiDesignH1;