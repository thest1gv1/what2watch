// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Navigation, Autoplay} from "swiper/modules";


import styles from './MoviesSwiper.module.scss'

export type Movie = {
  backdrop_path: string | undefined;
  id: number,
  title: string,
  poster_path: string,
}

export type MoviesListProps = {
  movies: Movie[],
  onSlideChange: any
}

const MoviesSwiper = ({movies, onSlideChange}: MoviesListProps) => {
  return (
    <Swiper
      className={styles.swiper}
      onInit={(swiper) => {
        setTimeout(() => {
          swiper.slideNext(0)
          swiper.autoplay.start();
        }, 100);
      }}
      effect={"coverflow"}
      centeredSlides
      loop
      spaceBetween={-10}
      autoplay={{delay: 3000, disableOnInteraction: false,}}
      observeParents={true}
      loopAdditionalSlides={1}
      slidesPerView="auto"
      coverflowEffect={
        {
          rotate: 5,
          stretch: 0,
          depth: 50,
          modifier: 2.5,
        }
      }
      modules={[EffectCoverflow, Navigation, Autoplay,]}
      // onSlideChange={(swiper) => console.log('Активный слайд:', swiper.realIndex)}
      onSlideChange={onSlideChange}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {movies.map((m) => {
        return <SwiperSlide
          className={styles.swiperSlide}
          key={m.id}
        >
          <img
            className={styles.swiperImage}
            src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
            alt={m.title}
          />
        </SwiperSlide>;
      })}

    </Swiper>
  );
};

export default MoviesSwiper
