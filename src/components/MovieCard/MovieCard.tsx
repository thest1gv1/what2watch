import {useState} from "react";
import type {Movie} from "../../pages/ResultPage/ResultPage.tsx";
import styles from "./MovieCard.module.scss";

const MovieCard = ({movie}: {movie: Movie}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className={styles.movieCard}>
      {movie.poster_path && (
        <img
          className={styles.poster}
          src={`https://what2watch-backend-production.up.railway.app/movies/poster?path=${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <div className={styles.movieInfo}>
        <div className={styles.movieMeta}>
          <span className={styles.genre}>{movie.genre}</span>
          <span className={styles.year}>{movie.year}</span>
        </div>
        <h3 className={styles.movieTitle}>{movie.title}</h3>
        <p className={`${styles.movieDescription} ${expanded ? styles.expanded : ''}`}>
          {movie.description}
        </p>
        <button className={styles.toggle} onClick={() => setExpanded(prev => !prev)}>
          {expanded ? 'Скрыть' : 'Читать далее'}
        </button>
      </div>
    </li>
  )
}

export default MovieCard