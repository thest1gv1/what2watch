import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {API_URL} from "../../api/config.ts"
import styles from './MoviePage.module.scss'
import Button from "../../components/Button/Button.tsx";
import {Play} from "lucide-react";

const MoviePage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<any>(null)
  const [showTrailer, setShowTrailer] = useState(false)


  useEffect(() => {
    fetch(`${API_URL}/movies/${id}`)
      .then(r => r.json())
      .then(data => setMovie(data))
  }, [id])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', showTrailer)

    return () => document.body.classList.remove('no-scroll')
  }, [showTrailer])

  if (!movie) return <p>Загрузка...</p>

  const year = movie.release_date?.split('-')[0]
  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60
  const genres = movie.genres?.map((g: { name: string }) => g.name).join(', ')
  const country = movie.production_countries?.[0]?.name
  const cast = movie.credits?.cast?.slice(0, 12)
  const director = movie.credits?.crew?.find(
    (p: { job: string }) => p.job === 'Director'
  )
  const trailer =
    movie.videos?.results?.find(
      (v: { type: string, site: string, iso_639_1: string }) =>
        v.type === 'Trailer' && v.site === 'YouTube' && v.iso_639_1 === 'ru'
    ) ||
    movie.videos?.results?.find(
      (v: { type: string, site: string }) =>
        v.type === 'Trailer' && v.site === 'YouTube'
    )

  return (
    <div className={styles.page}>

      {/* Backdrop */}
      <div className={styles.backdrop}>
        {movie.backdrop_path && (
          <img
            className={styles.backdropImg}
            src={`${API_URL}/movies/poster?path=${movie.backdrop_path}&size=w1280`}
            alt=""
          />
        )}
        <div className={styles.backdropFade} />
        <Button
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >Назад</Button>
      </div>

      <div className={styles.content}>

        {/* Hero */}
        <div className={styles.hero}>
          {movie.poster_path && (
            <img
              className={styles.poster}
              src={`${API_URL}/movies/poster?path=${movie.poster_path}&size=w342`}
              alt={movie.title}
              loading="lazy"
            />
          )}
          <div className={styles.heroInfo}>
            <p className={styles.originalTitle}>{movie.original_title}</p>
            <h3 className={styles.title}>{movie.title}</h3>
            <div className={styles.meta}>
              <span className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span className={styles.metaItem}>{year}</span>
              <span className={styles.metaItem}>{hours} ч {minutes} мин</span>
              {country && <span className={styles.metaItem}>{country}</span>}
            </div>
            <p className={styles.genres}>{genres}</p>
            <p className={styles.genres}>{director.name}</p>
            {trailer && (
              <button
                className={styles.trailerBtn}
                onClick={() => setShowTrailer(true)}
              >

                Посмотреть трейлер
                <Play size={18} fill="white" />
              </button>
            )}
          </div>

        </div>

        {/* Описание */}

        <div className={styles.section}>
          <p className={styles.sectionLabel}>О фильме</p>
          <p className={styles.overview}>{movie.overview}</p>
        </div>

        {cast?.length > 0 && (
          <div className={styles.section}>
            <p className={styles.sectionLabel}>В ролях</p>
            <ul className={styles.cast}>
              {cast.map((actor: {
                id: number,
                name: string,
                character: string,
                profile_path: string
              }) => (
                <li
                  key={actor.id}
                  className={styles.actor}
                >
                  {actor.profile_path ? (
                    <img
                      className={styles.actorPhoto}
                      src={`${API_URL}/movies/poster?path=${actor.profile_path}&size=w185`}
                      alt={actor.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.actorPhotoEmpty}>👤</div>
                  )}
                  <p className={styles.actorName}>{actor.name}</p>
                  <p className={styles.actorRole}>{actor.character}</p>
                </li>
              ))}
            </ul>
          </div>
        )}


      </div>
      {showTrailer && (
        <div
          className={styles.overlay}
          onClick={() => setShowTrailer(false)}
        >
          <div
            className={styles.modal}
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              allowFullScreen
              allow="autoplay"
              className={styles.iframe}
            />
          </div>
        </div>
      )}
    </div>

  )
}

export default MoviePage