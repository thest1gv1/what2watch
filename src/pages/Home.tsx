import styles from './Home.module.scss';
import MoviesSwiper from "../components/MoviesSwiper/MoviesSwiper.tsx";
import Button from "../components/Button/Button.tsx";
import {useEffect, useState, type SetStateAction} from "react";
import type {Movie} from "../components/MoviesSwiper/MoviesSwiper.tsx";

import getSwiperMovies from '../api/moviesAPI.ts';

const Home = () => {

  const [swiperMovies, setSwiperMovies] = useState<Movie[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const activeMovie = swiperMovies[activeIndex]

  useEffect(() => {
    getSwiperMovies().then(setSwiperMovies)
  }, []);


  return (
    <section className={styles.hero}>
        <div className={styles.heroHeader}>
          <div className={styles.heroText}>
            <h1>Не знаешь что <br /> посмотреть<br /> сегодня?</h1>
            <p>Ответь на несколько вопросов — получи идеальное кино за 30 секунд</p>
          </div>

            <img
              className={styles.backdrop}
              src={`https://image.tmdb.org/t/p/original${activeMovie?.backdrop_path}`}
              alt=""
              width=""
              height=""
              loading="lazy"
            />


        </div>


      <MoviesSwiper
        movies={swiperMovies}
        onSlideChange={(swiper: { realIndex: SetStateAction<number>; }) => setActiveIndex(swiper.realIndex)}
      />

      <Button className={styles.buttonHome}>Найди свой фильм</Button>
    </section>
  )
}


export default Home
