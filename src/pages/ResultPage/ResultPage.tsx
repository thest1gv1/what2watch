import styles from "./ResultsPage.module.scss";
import Button from "../../components/Button/Button.tsx";
import MovieCard from "../../components/MovieCard/MovieCard.tsx";
import type {Movies} from "../../types/movies.ts";

type ResultsPageProps = {
  movies: Movies[]
  onRetry: () => void
  onLoadMore: () => void
  isLoadingMore: boolean
}

const ResultsPage = ({
                       movies,
                       onRetry,
                       onLoadMore,
                       isLoadingMore
                     }: ResultsPageProps) => {
  return (
    <div className={styles.results}>
      <header className={styles.header}>
        <h2 className={styles.title}>Твои фильмы</h2>
        <p className={styles.description}>Подобрали специально для тебя</p>
      </header>

      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.tmdb_id}
            movie={movie}
          />
        ))}
      </ul>
      <div className={styles.actions}>
        <Button onClick={onRetry}>Пройти заново</Button>
        <Button
          onClick={onLoadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? 'Загружаем...' : 'Ещё фильмы'}
        </Button></div>
    </div>
  )
}

export default ResultsPage