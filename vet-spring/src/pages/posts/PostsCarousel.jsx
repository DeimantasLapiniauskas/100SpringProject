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
    <div className="px-[1rem] bg-[#6A7AFF] relative rounded-[10px]">
      <div className="flex items-center justify-between py-1 sm:py-1.5 md:py-2 px-[2rem] sm:px-[4rem] md:px-[5rem] lg:px-[6rem]">
        <h2 className="text-info-content font-semibold text-sm sm:text-base md:text-lg">
          FOLLOW OUR LATEST NEWS
        </h2>
        <div className="flex items-center gap-2">
          <button className="custom-prev z-10 custom-paw-left-btn w-[25px] h-[25px] sm:w-[35px] h-sm:[35px] md:w-[45px] md:h-[45px]">◀</button>
          <p className="text-info-content font-semibold text-xs sm:text-md md:text-base">View More</p>
          <button className="custom-next z-10 custom-paw-right-btn w-[25px] h-[25px] sm:w-[35px] h-sm:[35px] md:w-[45px] md:h-[45px]">▶</button>
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
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="text-center bg-gradient-to-br from-blue-200 to-indigo-400 text-info-content rounded-[10px] h-[15rem] p-5 border-1 border-blue-400">
              <h2
                className={`card-title block break-all min-h-[50px] ${
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
                className={`py-1 font-semibold text-left ${
                  post.postType === "Sale"
                    ? `text-red-700 animate-pulse`
                    : post.postType === "Blog"
                    ? `text-[#006666]`
                    : `text-[#004C99]`
                }`}
              >
                {post.postType === "Sale" ? post.postType + "!" : post.postType}
              </h3>
              <div className={post.imageUrl ? "grid grid-cols-3 gap-2" : ""}>
                <p className=" leading-[20px] text-left overflow-hidden min-h-[100px] text-sm col-span-2 break-words">
                  {post.imageUrl
                    ? post.content.length > 120
                      ? post.content.slice(0, 117) + "..."
                      : post.content
                    : post.content.length > 170
                    ? post.content.slice(0, 167)
                    : post.content}
                </p>
                {post.imageUrl && (
                  <img
                    src={
                      post.imageUrl.startsWith("http")
                        ? post.imageUrl
                        : import.meta.env.VITE_API_URL + post.imageUrl
                    }
                    alt={post.title}
                    className="object-cover h-25 rounded-[10px] border-1 border-blue-400 w-full"
                  />
                )}
              </div>
              <NavLink to={`/posts/${post.id}`}>
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
