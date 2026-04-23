export type Movies = {
  title: string
  originalTitle: string
  year: number
  genre: string
  description: string
  poster_path?: string
  backdrop_path?: string
  tmdb_id?: number
}

// Фильмы из TMDB (trending, popular)
export type TmdbMovie = {
  id: number
  title: string
  poster_path?: string
  backdrop_path?: string
  overview?: string
  release_date?: string
  vote_average?: number
}