import {API_URL} from "./config.ts"
import type {Movies} from "../types/movies.ts"

export const fetchMovies = async (prompt: string, exclude: string[] = []): Promise<Movies[]> => {
  const excludeText = exclude.length > 0
    ? `\nИсключи эти фильмы из подборки: ${exclude.join(', ')}.`
    : ''
  const fullPrompt = prompt + excludeText
  console.log('отправляем промпт:', fullPrompt)
  const response = await fetch(`${API_URL}/movies/recommend`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({prompt: prompt + excludeText})
  })

  if (response.status === 429) throw new Error('rate_limit')
  if (!response.ok) throw new Error('server_error')

  return response.json()
}