import HomePageDog from "../../assets/dog.png"; 
import TestCarousel from "../designtest/TestCarousel";
//import HomePagePawArrow from "../../assets/dog.png";

export const BandytiDesignH2 = () => {
    return (
      <div className="bg-[#DCDEFE]">
        {/* Paw Prints in the Background */}
                <div className="relative w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Paw 1 */}
          {/* Increase previous Paw (left: value) by 12rem each new breakpoint from left-[14rem] to lg:left-[50rem] */}
          {/* Increase previous Paw (left: value) by 8rem each new breakpoint from lg:left-[50rem] to 2xl:left-[66rem] */}
          {/* Paw (top: value; top-[1rem]) stays the same. Only for smallest (top: value; top-[1rem]) used once. */}
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

              lg:left-[50rem] lg:top-[1rem]

              xl:left-[58rem] xl:top-[1rem]

              2xl:left-[66rem] 2xl:top-[1rem]

              pawss-paw1-3xl-custom-breakpoint-override

              pawss-paw1-4xl-custom-breakpoint-override

              pawss-paw1-5xl-custom-breakpoint-override

              pawss-paw1-6xl-custom-breakpoint-override

              translate-x-[1rem] translate-y-[1rem]
            "
          ></div>

          {/* Paw 2 */}
          {/* Increase previous Paw (left: value) by 12rem each new breakpoint from left-[18rem] to lg:left-[54rem] */}
          {/* Increase previous Paw (left: value) by 8rem each new breakpoint from lg:left-[54rem] to 2xl:left-[70rem] */}
          {/* Paw (top: value; top-[5rem]) stays the same. Only for smallest (top: value; top-[5rem]) used once. */}
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

              lg:left-[54rem] lg:top-[5rem]

              xl:left-[62rem] xl:top-[5rem]

              2xl:left-[70rem] 2xl:top-[5rem]

              pawss-paw2-3xl-custom-breakpoint-override

              pawss-paw2-4xl-custom-breakpoint-override

              pawss-paw2-5xl-custom-breakpoint-override

              pawss-paw2-6xl-custom-breakpoint-override

              translate-x-[-0.5rem] translate-y-[-0.5rem]
            "
          ></div>

          {/* Paw 3 */}
          {/* Increase previous Paw (left: value) by 12rem each new breakpoint from left-[12rem] to lg:left-[48rem] */}
          {/* Increase previous Paw (left: value) by 8rem each new breakpoint from lg:left-[48rem] to 2xl:left-[64rem] */}
          {/* Paw (top: value; top-[6rem]) stays the same. Only for smallest (top: value; top-[5rem]) used once. */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[6rem] h-[6rem]
              sm:w-[7rem] sm:h-[7rem]
              md:w-[8rem] md:h-[8rem]
              lg:w-[10rem] lg:h-[10rem]

              left-[12rem] top-[5rem]

              sm:left-[24rem] sm:top-[6rem]

              md:left-[36rem] md:top-[6rem]

              lg:left-[48rem] lg:top-[6rem]

              xl:left-[56rem] xl:top-[6rem]

              2xl:left-[64rem] 2xl:top-[6rem]

              pawss-paw3-3xl-custom-breakpoint-override

              pawss-paw3-4xl-custom-breakpoint-override

              pawss-paw3-5xl-custom-breakpoint-override

              pawss-paw3-6xl-custom-breakpoint-override

              translate-x-[1rem] translate-y-[-1rem]
            "
          ></div>

          {/* Paw 4 */}
          {/* Increase previous Paw (left: value) by 12rem each new breakpoint from left-[16rem] to lg:left-[52rem] */}
          {/* Increase previous Paw (left: value) by 8rem each new breakpoint from lg:left-[52rem] to 2xl:left-[68rem] */}
          {/* Paw (top: value; top-[7rem]) stays the same. Only for smallest (top: value; top-[6rem]) used once. */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[6rem] h-[6rem]
              sm:w-[7rem] sm:h-[7rem]
              md:w-[8rem] md:h-[8rem]
              lg:w-[10rem] lg:h-[10rem]

              left-[16rem] top-[6rem]

              sm:left-[28rem] sm:top-[7rem]

              md:left-[40rem] md:top-[7rem]

              lg:left-[52rem] lg:top-[7rem]

              xl:left-[60rem] xl:top-[7rem]

              2xl:left-[68rem] 2xl:top-[7rem]

              pawss-paw4-3xl-custom-breakpoint-override

              pawss-paw4-4xl-custom-breakpoint-override

              pawss-paw4-5xl-custom-breakpoint-override

              pawss-paw4-6xl-custom-breakpoint-override

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

export default BandytiDesignH2;