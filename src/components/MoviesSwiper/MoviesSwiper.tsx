// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Navigation, Autoplay} from "swiper/modules";
import {movies} from "../../data/movies.ts";

import styles from './MoviesSwiper.module.scss'

// Import Swiper styles


const MoviesSwiper = () => {

  return (
    <Swiper
      className={styles.swiper}
      effect={"coverflow"}
      centeredSlides={true}
      spaceBetween={-10}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      slidesPerView="auto"
      coverflowEffect={
        {
          rotate: 0,
          stretch: 0,
          depth: 110,
          modifier: 2.5,
        }
      }
      modules={[EffectCoverflow, Navigation, Autoplay]}
      loop={true}
      // onSlideChange={(swiper) => console.log('Активный слайд:', swiper.realIndex)}
      // onSwiper={(swiper) => console.log(swiper)}

    >
      {movies.map((movie) => {
        return <SwiperSlide
          className={styles.swiperSlide}
          key={movie.id}
        >
          <img
            className={styles.swiperImage}
            src={movie.poster_path}
            alt={movie.title}
            loading="lazy"
          />
        </SwiperSlide>;
      })}

    </Swiper>
  );
};

export default MoviesSwiper
