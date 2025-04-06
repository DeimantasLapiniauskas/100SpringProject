import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useList } from "../../context/ListContext";
import "../../index.css";
import { NavLink } from "react-router";

const PostCarousel = () => {
  const { content: posts } = useList();

  return (
    <div className="px-[1rem] bg-gradient-to-br from-blue-300 via-info-content to-blue-300 relative rounded-[10px] shadow-md shadow-info-content">
      <div className="flex items-center justify-between py-1 sm:py-1.5 md:py-2 px-[2rem] sm:px-[4rem] md:px-[5rem] lg:px-[6rem]">
        <h2 className="text-info-content font-semibold text-sm sm:text-base md:text-lg">
          FOLLOW OUR LATEST NEWS
        </h2>
        <div className="flex items-center gap-2">
          <button className="custom-prev z-10 custom-paw-left-btn w-[25px] h-[25px] sm:w-[35px] h-sm:[35px] md:w-[45px] md:h-[45px]">
            ◀
          </button>
          <p className="text-white text-xs sm:text-md md:text-base">
            View More
          </p>
          <button className="custom-next z-10 custom-paw-right-btn w-[25px] h-[25px] sm:w-[35px] h-sm:[35px] md:w-[45px] md:h-[45px]">
            ▶
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        slidesPerGroup={1}
        loop={posts.length > 7}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="text-center bg-gradient-to-br from-blue-200 to-indigo-400 text-info-content rounded-[10px] h-[14rem] py-2 ps-3 pe-2 border-2 border-white ">
              <h2
                className={`text-base md:px-2 block leading-[22px] font-semibold break-all min-h-[48px] max-h-[48px] overflow-hidden ${
                  post.postType === "Sale"
                    ? `text-red-700`
                    : post.postType === "Blog"
                    ? `text-[#006666]`
                    : `text-[#004C99]`
                }`}
              >
                {post.title}
              </h2>
              <h3
                className={`font-semibold text-left text-sm ${
                  post.postType === "Sale"
                    ? `text-red-700 animate-pulse`
                    : post.postType === "Blog"
                    ? `text-[#006666]`
                    : `text-[#004C99]`
                }`}
              >
                {post.postType === "Sale" ? post.postType + "!" : post.postType}
              </h3>
              <div className={post.imageUrl ? "grid grid-cols-3" : ""}>
                <p className=" leading-[18px] text-left overflow-hidden min-h-[115px] max-h-[115px] text-sm col-span-2 break-words p-1">
                  {post.imageUrl
                    ? post.content.length > 150
                      ? post.content.slice(0, 147) + "..."
                      : post.content
                    : post.content.length > 240
                    ? post.content.slice(0, 237) + "..."
                    : post.content}
                </p>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover h-[115px] rounded-[10px] border-1 border-blue-400 w-full"
                  />
                )}
              </div>
              <NavLink to={`/posts/view/${post.id}`}>
                <p className=" text-white hover:underline text-xs md:text-sm font-medium p-1">
                  Read more here
                </p>
              </NavLink>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination p-2 flex justify-center z-0" />
    </div>
  );
};

export default PostCarousel;
