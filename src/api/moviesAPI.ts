const API_URL = 'https://api.themoviedb.org/'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY


export async function getSwiperMoviesTrending() {

  return fetch(`${API_URL}3/trending/movie/week?api_key=${API_KEY}&language=ru-RU`)
    .then((response) => response.json())
    .then(data => (data.results || []))
}

export async function getMoviePoster(title: string): Promise<string | null> {
  return fetch(`${API_URL}3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&language=ru-RU`)
    .then(res => res.json())
    .then(data => data.results?.[0]?.poster_path ?? null)
}

