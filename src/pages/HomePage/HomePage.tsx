import {API_URL} from '../../api/config.ts';
import type {TmdbMovie} from "../../types/movies.ts";
import MoviesSwiper from "../../components/MoviesSwiper/MoviesSwiper.tsx";
import Button from "../../components/Button/Button.tsx";
import {useEffect, useState, type SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

import styles from './HomePage.module.scss';

const HomePage = () => {

  const navigate = useNavigate()

  const [swiperMovies, setSwiperMovies] = useState<TmdbMovie[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const activeMovie = swiperMovies[activeIndex]

  async function getSwiperMoviesTrending() {
    return fetch(`${API_URL}/movies/trending`)
      .then(res => res.json())
  }

  useEffect(() => {
    getSwiperMoviesTrending().then(setSwiperMovies)
  }, []);


  return (
    <section className={styles.hero}>
      <div className={styles.heroHeader}>


        <div className={styles.heroText}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            AI подбор за 30 сек
          </div>
          <h1 className={styles.title}>Не знаешь что посмотреть <span className={styles.accent}>сегодня?</span>
          </h1>
          <p className={styles.description}>Ответь на несколько вопросов — получи идеальное
            кино подобранное специально для тебя
          </p>
          <Button
            className={styles.buttonHome}
            onClick={() => {
              navigate('/quiz')
            }}
          >Найди свой фильм</Button>
        </div>

        <div className={styles.backdropWrapper}>
          {activeMovie?.backdrop_path && (
            <img
              key={activeMovie.id}
              className={styles.backdrop}
              src={`${API_URL}/movies/poster?path=${activeMovie.backdrop_path}&size=w780`}
              alt=""
            />
          )}
        </div>
      </div>
      <p className={styles.trendingLabel}>Сейчас в тренде</p>
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
