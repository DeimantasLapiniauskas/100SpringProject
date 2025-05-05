import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { ChevronsRight } from "lucide-react";
import { getAllEntitys } from "@/utils/helpers/entity";
import { useEffect, useState } from "react";

export const PetCarePostsCorousel = () => {

  const [posts, setPosts] = useState();

  const { Redirecting } = UIStatus;
  const { setStatus } = useUI();
  const navigate = useNavigate();

  const postPath = "posts"

  useEffect(() => {
    const GetPosts = async () => {
      const response = await getAllEntitys(postPath)
      const {data, succes} = response.data
      setPosts(data.postListResponseDTO)
    }
    GetPosts()
  }, [])

 console.log("Cia", posts)

  if (!posts) return
  
  return (
    <div className="w-[400px] p-3 bg-gradient-to-br from-purple-300 to-indigo-600 rounded-lg ">
      <div className="flex  flex-col items-center justify-between pt-1 sm:pt-1.5 md:pt-2">
        <div className="flex  items-center gap-2 md:gap-4 ">
          
          <button className="custom-next z-10 custom-paw-right-btn w-[15px] h-[15px] sm:w-[25px] h-sm:[25px] md:w-[35px] md:h-[35px] transform rotate-270" >
            ▶
          </button>
          <p className="text-white text-xs sm:text-md md:text-base">
            View More
          </p>
          <button className="custom-prev z-10 custom-paw-left-btn w-[15px] h-[15px] sm:w-[25px] h-sm:[25px] md:w-[35px] md:h-[35px] transform rotate-270">
              ◀
            </button>
        </div>
        <div className="custom-pagination p-2 flex justify-center z-0 h-5 g" />
      </div>
      <Swiper
        direction="vertical"
        className="h-[700px]"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        slidesPerGroup={1}
        loop={Array.isArray(posts) && posts?.length > 7}
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
      >{Array.isArray(posts) && posts?.filter((post) => post?.postType === "PetCare").map((post) => (
          <SwiperSlide key={post?.id}>
            <div className="text-center bg-gradient-to-br from-blue-200 to-indigo-400 text-info-content rounded-[10px] h-[14rem] py-2 ps-3 pe-2 border-2 border-white ">
              <h2
                className="text-base md:px-2 block leading-[22px] font-semibold min-h-[48px] max-h-[48px] overflow-hidden break-words text-purple-950 "
              >
                {post?.title?.length > 55
                  ? post?.title.slice(0, 52) + "..."
                  : post?.title}
              </h2>
              <h3
                className="font-semibold text-left text-sm text-purple-950"
                  
              >
                {post?.postType === "Sale"
                  ? post?.postType + " !"
                  : post?.postType}
              </h3>
              <div className={post?.imageUrl ? "grid grid-cols-3" : ""}>
                <p className=" leading-[18px] text-left overflow-hidden h-[115px] text-sm col-span-2 break-words p-1">
                  {post.imageUrl
                    ? post?.content?.length > 150
                      ? post?.content.slice(0, 147) + "..."
                      : post?.content
                    : post?.content?.length > 240
                    ? post?.content?.slice(0, 237) + "..."
                    : post?.content}
                </p>
                {post.imageUrl && (
                  <img
                    src={post?.imageUrl}
                    alt={post?.title}
                    className="object-cover h-[115px] rounded-[10px] border-1 border-blue-400 w-full"
                  />
                )}
              </div>
              <div className="flex justify-center items-center">
                <ChevronsRight className=" w-[18px] md:w-[22px] text-white slow-pulse" />
                <button
                  type="button"
                  className=" text-white hover:underline text-xs md:text-sm font-medium p-1 ps-0 cursor-pointer slow-pulse"
                  onClick={() => {
                    setStatus(Redirecting);
                    navigate(`/posts/view/${post.id}`);
                  }}
                >
                  Read more here
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
