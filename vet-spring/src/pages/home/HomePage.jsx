import HomePageDog from "../../assets/dog.png"; 
import { ListProvider } from "../../context/ListContext";
import PostCarousel from "./PostsCarousel";

export const HomePage = () => {
    return (
        <div className=" bg-[#DCDEFE] ">

            {/* Paw Prints in the Background */}
            <div className="relative w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Paw 1 */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[25.6%] h-[25.6%]
              sm:w-[17.5%] sm:h-[17.5%]
              md:w-[16.7%] md:h-[16.7%]
              lg:w-[15.6%] lg:h-[15.6%]

              left-[59.7%] top-[20px]

              sm:left-[65%] sm:top-[20px]

              md:left-[79.16%] md:top-[20px]

              lg:left-[78.13%] lg:top-[20px]

              xl:left-[72.5%] xl:top-[20px]

              2xl:left-[68.75%] 2xl:top-[20px]

              pawss-paw1-3xl-custom-breakpoint-override

              pawss-paw1-4xl-custom-breakpoint-override

              pawss-paw1-5xl-custom-breakpoint-override

              pawss-paw1-6xl-custom-breakpoint-override

              translate-x-[1rem] translate-y-[1rem]
            "
          ></div>

          {/* Paw 2 */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[25.6%] h-[25.6%]
              sm:w-[17.5%] sm:h-[17.5%]
              md:w-[16.7%] md:h-[16.7%]
              lg:w-[15.6%] lg:h-[15.6%]

              left-[76.8%] top-[77px]
            
              sm:left-[75%] sm:top-[77px]

              md:left-[87.5%] md:top-[77px]

              lg:left-[84.38%] lg:top-[77px]

              xl:left-[77.5%] xl:top-[77px]

              2xl:left-[72.92%] 2xl:top-[77px]

              pawss-paw2-3xl-custom-breakpoint-override

              pawss-paw2-4xl-custom-breakpoint-override

              pawss-paw2-5xl-custom-breakpoint-override

              pawss-paw2-6xl-custom-breakpoint-override

              translate-x-[-0.5rem] translate-y-[-0.5rem]
            "
          ></div>

          {/* Paw 3 */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[25.6%] h-[25.6%]
              sm:w-[17.5%] sm:h-[17.5%]
              md:w-[16.7%] md:h-[16.7%]
              lg:w-[15.6%] lg:h-[15.6%]

              left-[51.2%] top-[82px]

              sm:left-[60%] sm:top-[82px]

              md:left-[75%] md:top-[82px]

              lg:left-[75%] lg:top-[82px]

              xl:left-[70%] xl:top-[82px]

              2xl:left-[66.67%] 2xl:top-[82px]

              pawss-paw3-3xl-custom-breakpoint-override

              pawss-paw3-4xl-custom-breakpoint-override

              pawss-paw3-5xl-custom-breakpoint-override

              pawss-paw3-6xl-custom-breakpoint-override

              translate-x-[1rem] translate-y-[-1rem]
            "
          ></div>

          {/* Paw 4 */}
          <div
            className="
              pawss-for-background-medium
              absolute
              w-[25.6%] h-[25.6%]
              sm:w-[17.5%] sm:h-[17.5%]
              md:w-[16.7%] md:h-[16.7%]
              lg:w-[15.6%] lg:h-[15.6%]

              left-[69.27%] top-[92px]

              sm:left-[70%] sm:top-[92px]

              md:left-[83.33%] md:top-[92px]

              lg:left-[81.25%] lg:top-[92px]

              xl:left-[75%] xl:top-[92px]

              2xl:left-[70.83%] 2xl:top-[92px]

              pawss-paw4-3xl-custom-breakpoint-override

              pawss-paw4-4xl-custom-breakpoint-override

              pawss-paw4-5xl-custom-breakpoint-override

              pawss-paw4-6xl-custom-breakpoint-override

              translate-x-[-1rem] translate-y-[0.5rem]
            "
          ></div>
        </div>

            {/* Top Section - Dog Image & Text */}
            <main className="flex flex-col sm:flex-row-reverse gap-2 items-center sm:items-start md:items-start lg:items-start">
                {/* Text Section */}
                <div className="flex flex-col px-3 gap-1">
                    <article className=" text-black lg:text-lg md:text-base sm:text-sm text-xs">
                        Pavasario Avenue 100, Vilnius<br />
                        +370 511 233 78<br />
                        Twenty-four hours a day
                    </article>
                    <br />

                    <h1 className=" text-black lg:text-6xl md:text-4xl sm:text-lg text-base">
                        Happy Hearts <br /> Veterinary Clinic
                    </h1>
                    <br />

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