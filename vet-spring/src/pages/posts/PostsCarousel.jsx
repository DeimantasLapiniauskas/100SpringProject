import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';  
import { usePagination } from '../../context/PaginationContext';

const PostCarousel = () => {

const {content: posts} = usePagination();

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} 
      spaceBetween={30}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }} 
      breakpoints={{
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        640: { slidesPerView: 1 }
      }}
    >
      {posts.map(post => (
        <SwiperSlide key={post.id}>
          <div className="slide-content">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PostCarousel;
