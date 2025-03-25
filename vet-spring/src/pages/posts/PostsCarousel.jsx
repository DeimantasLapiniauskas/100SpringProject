import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { usePagination } from "../../context/PaginationContext";
import "../../index.css";
import { useNavigate } from "react-router";

const PostCarousel = () => {
  const navigate = useNavigate();
  const { content: posts } = usePagination();
  console.log(posts)

  return (
    <div className="p-[1rem] bg-amber-300 relative rounded-[10px]">
      <h3 className="text-center">FOLLOW OUR LATTEST NEWS</h3>
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
        pagination={{ clickable: true,
            el: '.custom-pagination',
         }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div
              className=" flex flex-col justify-between bg-blue-500 p-4 rounded shadow  h-[100px] md:h-[150px] lg:h-[200px]
"
            >
              <p>{post.title}</p>
              <p className="font-bold">{post.postType}</p>
              <p className=" leading-[20px] text-sm text-gray-700 overflow-hidden">
                {post.content.length > 50
                  ? post.content.slice(0, 47) + "..."
                  : post.content}
              </p>
              <button
                onClick={() => navigate(`/posts/${post.id}`)}
                className=" text-white hover:underline text-sm font-medium"
              >
                Read more here
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-4 flex justify-center z-0" />
    </div>
  );
};

export default PostCarousel;
