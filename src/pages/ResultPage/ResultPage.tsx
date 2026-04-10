import styles from "./ResultsPage.module.scss";
import Button from "../../components/Button/Button.tsx";
import MovieCard from "../../components/MovieCard/MovieCard.tsx";


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
          <MovieCard
            key={movie.originalTitle}
            movie={movie}
          />
        ))}
      </ul>

      <Button onClick={onRetry}>Пройти заново</Button>
    </div>
  )
}

export default ResultsPage