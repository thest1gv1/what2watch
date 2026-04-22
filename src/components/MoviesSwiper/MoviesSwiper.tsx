// Import Swiper React components
import type {TmdbMovie} from "../../types/movies.ts";
import type { Swiper as SwiperType } from "swiper"
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Autoplay} from "swiper/modules";
import styles from './MoviesSwiper.module.scss'
import {API_URL} from "../../api/config.ts";

export type MoviesListProps = {
  movies: TmdbMovie[],
  onSlideChange: (swiper: SwiperType) => void
}

const MoviesSwiper = ({movies, onSlideChange}: MoviesListProps) => {
  return (
    <Swiper
      key={movies.length}
      className={styles.swiper}
      onSwiper={(swiper) => {
        setTimeout(() => {
          swiper.autoplay?.start();
        }, 100);
      }}
      effect="coverflow"
      loop={movies.length >= 6} // включаем loop только если больше 1 фильма
      centeredSlides={true}
      centeredSlidesBounds={true}
      slidesPerView="auto"
      spaceBetween={-45}
      coverflowEffect={{
        rotate: 10,
        stretch: -45,
        depth: 70,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Autoplay]}
      onSlideChange={onSlideChange}
    >
      {movies.map((m) => {
        return <SwiperSlide
          className={styles.swiperSlide}
          key={m.id}
        >
          <img
            className={styles.swiperImage}
            src={`${API_URL}/movies/poster?path=${m.poster_path}&size=w300`}
            alt={m.title}
          />
        </SwiperSlide>;
      })}

    </Swiper>
  );
};

export default MoviesSwiper
