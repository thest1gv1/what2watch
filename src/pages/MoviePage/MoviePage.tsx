import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from "../../api/config.ts"
import styles from './MoviePage.module.scss'
import Button from "../../components/Button/Button.tsx";

const MoviePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<any>(null)

  useEffect(() => {
    fetch(`${API_URL}/movies/${id}`)
      .then(r => r.json())
      .then(data => setMovie(data))
  }, [id])

  if (!movie) return <p>Загрузка...</p>

  const year = movie.release_date?.split('-')[0]
  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60
  const genres = movie.genres?.map((g: { name: string }) => g.name).join(', ')
  const country = movie.production_countries?.[0]?.name

  return (
    <div className={styles.page}>

      {/* Backdrop */}
      <div className={styles.backdrop}>
        {movie.backdrop_path && (
          <img
            className={styles.backdropImg}
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt=""
          />
        )}
        <div className={styles.backdropFade} />
        <Button className={styles.backBtn} onClick={() => navigate(-1)}>Назад</Button>
      </div>

      <div className={styles.content}>

        {/* Hero */}
        <div className={styles.hero}>
          {movie.poster_path && (
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
          )}
          <div className={styles.heroInfo}>
            <p className={styles.originalTitle}>{movie.original_title}</p>
            <h2 className={styles.title}>{movie.title}</h2>
            <div className={styles.meta}>
              <span className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span className={styles.metaItem}>{year}</span>
              <span className={styles.metaItem}>{hours} ч {minutes} мин</span>
              {country && <span className={styles.metaItem}>{country}</span>}
            </div>
            <p className={styles.genres}>{genres}</p>
          </div>
        </div>

        {/* Описание */}
        {movie.overview && (
          <div className={styles.movieInfo}>
            <p className={styles.movieLabel}>О фильме</p>
            <p className={styles.overview}>{movie.overview}</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default MoviePage