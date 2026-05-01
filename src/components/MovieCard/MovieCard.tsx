import {useNavigate} from "react-router-dom";
import styles from "./MovieCard.module.scss";
import type {Movies} from "../../types/movies.ts";
import {API_URL} from "../../api/config.ts";

const MovieCard = ({movie}: { movie: Movies }) => {
  // const [expanded, setExpanded] = useState(false)

  const navigate = useNavigate()

  return (
    <li
      className={styles.movieCard}
      onClick={() => navigate(`/movie/${movie.tmdb_id}`)}
    >
      <div className={styles.movieMeta}>
        <span className={styles.genre}>{movie.genre?.split(', ').map((g, i) => (
          <span
            key={i}
            className={styles.chip}
          >{g}</span>
        ))}
        </span>
        <span className={styles.chip}>{movie.year}</span>
      </div>
      {
        movie.poster_path && (
          <img
            className={styles.poster}
            // src={`${API_URL}/movies/poster?path=${movie.poster_path}`}
            src={`${API_URL}/movies/poster?path=${movie.backdrop_path || movie.poster_path}&size=w780`}
            alt={movie.title}
          />
        )
      }
      <div
        className={styles.movieInfo}
      >

        <h2 className={styles.movieTitle}>{movie.title}</h2>
        <p className={styles.movieDescription}>
          {movie.description}
        </p>

      </div>
    </li>
  )
}

export default MovieCard