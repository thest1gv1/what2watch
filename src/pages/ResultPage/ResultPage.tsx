import styles from "./ResultsPage.module.scss";
import Button from "../../components/Button/Button.tsx";


export type Movie = {
  title: string
  originalTitle: string
  year: number
  genre: string
  description: string
  poster_path?: string
}

type ResultsPageProps = {
  movies: Movie[]
  onRetry: () => void
}

const ResultsPage = ({movies, onRetry}: ResultsPageProps) => {
  return (
    <div className={styles.results}>
      <header className={styles.header}>
        <h2 className={styles.title}>Твои фильмы</h2>
        <p className={styles.description}>Подобрали специально для тебя</p>
      </header>

      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li
            key={movie.originalTitle}
            className={styles.movieCard}
          >
            <div className={styles.movieMeta}>
              <span className={styles.genre}>{movie.genre}</span>
              <span className={styles.year}>{movie.year}</span>
            </div>
            <h3 className={styles.movieTitle}>{movie.title}</h3>
            <p className={styles.movieDescription}>{movie.description}</p>
          </li>
        ))}
      </ul>

      <Button onClick={onRetry}>Пройти заново</Button>
    </div>
  )
}

export default ResultsPage