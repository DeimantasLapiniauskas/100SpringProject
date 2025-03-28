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
    <div className="p-[1rem] bg-[#6A7AFF] relative rounded-[10px]">
      <h3 className="text-center pb-3 text-info-content font-semibold">FOLLOW OUR LATEST NEWS</h3>
      <button className="custom-prev absolute left-0 top-1/2 z-10 bg-white p-2 rounded-full shadow">
        ◀
      </button>
      <button className="custom-next absolute right-0 top-1/2  z-10 bg-white p-2 rounded-full shadow">
        ▶
      </button>
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
    <div className="text-center bg-gradient-to-br from-blue-200 to-indigo-400 text-info-content rounded-[10px] h-[15rem] p-5 ">
              <h2
                className={`card-title block break-all min-h-[50px] ${
                  post.postType === "Sale"
                    ? `text-red-500`
                    : post.postType === "Blog"
                    ? `text-purple-800`
                    : `text-info-content`
                }`}
              >
                {post.title}
              </h2>
              <h3
                className={`py-1 font-semibold text-left ${
                  post.postType === "Sale"
                    ? `text-red-500 animate-pulse`
                    : post.postType === "Blog"
                    ? `text-purple-800`
                    : `text-info-content`
                }`}
              >
                {post.postType === "Sale" ? post.postType + "!" : post.postType}
              </h3>
              <p className=" leading-[20px] text-left overflow-hidden min-h-[100px] text-sm ">
                {post.content.length > 120
                  ? post.content.slice(0, 117) + "..."
                  : post.content}
              </p>
              <NavLink to={`/posts/${post.id}`}>
                <p className=" text-white hover:underline text-sm font-medium p-1">
                  Read more here
                </p>
              </NavLink>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-4 flex justify-center z-0" />
    </div>
  );
};

export default PostCarousel;
