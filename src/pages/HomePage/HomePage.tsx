import type {Movies} from "../../types/movies.ts";
import MoviesSwiper from "../../components/MoviesSwiper/MoviesSwiper.tsx";
import Button from "../../components/Button/Button.tsx";
import {useEffect, useState, type SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

import styles from './HomePage.module.scss';


const HomePage = () => {

  const navigate = useNavigate()

  const [swiperMovies, setSwiperMovies] = useState<Movies[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const activeMovie = swiperMovies[activeIndex]

  async function getSwiperMoviesTrending() {
    return fetch('http://localhost:3000/movies/trending')
      .then(res => res.json())
  }

  useEffect(() => {
    getSwiperMoviesTrending().then(setSwiperMovies)
  }, []);


  return (
    <section className={styles.hero}>
      <div className={styles.heroHeader}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Не знаешь что посмотреть сегодня?</h1>
          <p className={styles.description}>Ответь на несколько вопросов — получи идеальное кино за 30 секунд</p>
          <Button
            className={styles.buttonHome}
            onClick={() => {
              navigate('/quiz')
            }}
          >Найди свой фильм</Button>
        </div>

        <img
          className={styles.backdrop}
          src={`https://image.tmdb.org/t/p/original${activeMovie?.backdrop_path}`}
          alt=""

          loading="lazy"
        />
      </div>

      <MoviesSwiper
        movies={swiperMovies}
        onSlideChange={(swiper: {
          realIndex: SetStateAction<number>;
        }) => setActiveIndex(swiper.realIndex)}
      />


    </section>
  )
}


export default HomePage
