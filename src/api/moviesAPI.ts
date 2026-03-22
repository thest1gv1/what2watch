const API_URL = 'https://api.themoviedb.org/'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY



async function getSwiperMoviesTrending() {

  return fetch(`${API_URL}3/trending/movie/week?api_key=${API_KEY}&language=ru-RU`)
    .then((response) => response.json())
    .then(data => (data.results || []))
}

export default getSwiperMoviesTrending