import HomePageDog from "../../assets/dog.png";
import { ListProvider } from "../../context/ListContext";
import PostCarousel from "./PostsCarousel";
import happyHeart from "../../assets/icons/happyHeart.svg";
import { ReviewsPanel } from "../../components/features/ReviewsPanel";
import "../../index.css"
import { useUI } from "@/context/UIContext";
import { Redirecting } from "@/components/feedback/Redirecting";

export const HomePage = () => {

  const { isRedirecting } = useUI();

 if (isRedirecting) {
      return <Redirecting />;
    }

  return (
    <div className=" pt-1 md:pt-2 max-w-[1400px] mx-auto">
      {/* Top Section - Dog Image & Text */}
      <main className="flex sm:flex-row-reverse flex-col items-end sm:items-start md:items-start lg:items-start">
        {/* Text Section */}
        <div className="flex flex-col pe-3 sm:pe-4 md:pe-5 lg:text-lg md:text-base sm:text-sm text-xs sm:items-start">
          <div className="grid grid-cols-3 w-full">
              <div className="flex items-center col-span-2 justify-center sm:justify-start">
                <h1 className="lg:text-2xl md:text-xl sm:text-lg text-base font-semibold text-[#008888]">
                  Happy Hearts <br /> Veterinary Clinic
                </h1>
                <img
                  src={happyHeart}
                  alt="happyHeart"
                  className="w-15 sm:w-20 md:w-25 lg:w-30"
                />
              </div>
              <p className=" text-info-content lg:text-sm md:text-xs sm:text-[10px] text-[8px] inline-flex justify-end text-right">
                Pavasario Avenue 100, Vilnius,
                <br />
                +370 511 233 78,
                <br />
                Twenty-four hours a day
              </p>
          </div>
          <div className="grid grid-cols-3">
              <p className=" lg:text-lg md:text-base sm:text-sm text-xs text-info-content col-span-3 px-5 xs:px-8 sm:ps-0 md:pe-8 sm:col-span-2">
                As Lithuania’s leading animal health company, Happy Hearts is driven
                by a singular purpose: to nurture Lithuania and humankind by
                advancing care for animals.
              </p>
              <div className="absolute top-47 xs:top-43 left-15 sm:static">
                <ReviewsPanel/>
              </div>
          </div>
        </div>
        {/* Image Section - Dog on Left */} 
            <figure >
              <img
                className=" max-w-[7rem] sm:max-w-[13rem] md:max-w-[17rem] lg:max-w-[22rem] object-contain drop-shadow-lg me-10 sm:m-0"
                src={HomePageDog}
                alt="Dog; light brown and white fur; bent ears"
              />
            </figure>
      </main>
      <ListProvider>
        <PostCarousel />
      </ListProvider>
    </div>
  );
};
