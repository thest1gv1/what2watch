import styles from "./PromptEditor.module.scss";
import Button from "../Button/Button.tsx";
import type {Answers} from "../../types/answers.ts";
import type {Questions} from "../../types/questions.ts";
import {useEffect, useState} from "react";
import {getAIPrompt} from "../../utils/getAIPrompt.ts";
import type {Movie} from "../../pages/ResultPage/ResultPage.tsx";
import {getMoviePoster} from "../../api/moviesAPI.ts";
import {Film} from "lucide-react";


const LOADING_MESSAGES = [
  'Анализируем твои ответы...',
  'Спрашиваем у Gemini...',
  'Подбираем идеальные фильмы...',
  'Ищем постеры...',
  'Почти готово!',
]

type PromptEditorProps = {
  answers: Answers
  questions: Questions[]
  onSubmit: (movies: Movie[]) => void
}

const PromptEditor = ({answers, questions, onSubmit}: PromptEditorProps) => {
  const {userPrompt, systemInstruction} = getAIPrompt(answers, questions)
  const [prompt, setPrompt] = useState(userPrompt)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!loading) return

    setMessageIndex(0)
    const interval = setInterval(() => {
      setMessageIndex(prev =>
        prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev
      )
    }, 1500)

    return () => clearInterval(interval)
  }, [loading])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const fullPrompt = prompt + systemInstruction


      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            contents: [{parts: [{text: fullPrompt}]}]
          })
        }
      )

      if (response.status === 429) {
        setError('Лимит запросов исчерпан, попробуй через минуту')
        return
      }
      if (!response.ok) {
        setError('Сервис временно недоступен, попробуй позже')
        return
      }

      const data = await response.json()
      const text = data.candidates[0].content.parts[0].text

      if (!text) {
        setError('Не удалось получить ответ, попробуй ещё раз')
        return
      }

      const cleaned = text.replace(/```json|```/g, '').trim()

      let movies
      try {
        movies = JSON.parse(cleaned)
      } catch {
        setError('Что-то пошло не так, попробуй ещё раз')
        return
      }

      const moviesWithPosters = await Promise.all(
        movies.map(async (movie: Movie) => ({
          ...movie,
          poster_path: await getMoviePoster(movie.originalTitle)
        }))
      )

      onSubmit(moviesWithPosters)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingIcon}><Film size={48} /></div>
        <p
          key={messageIndex}
          className={styles.loadingMessage}
        >
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>
    )
  }

  return (
    <div className={styles.prompt}>

      <div className={styles.promptInfo}>
        <h3 className={styles.promptTitle}>Отредактируй свой запрос</h3>
        <p className={styles.promptDescription}>Мы подобрали запрос на основе твоего настроения и предпочтений. Можешь его изменить, если хочешь.</p>
      </div>
      {error && (
        <div className={styles.error}>
          <p className={styles.errorText}>{error}</p>

        </div>
      )}
      <textarea
        className={styles.promptTextarea}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
      />


      <Button
        className={styles.promptButton}
        onClick={handleSubmit}
        disabled={loading}
      >Отправить</Button>

    </div>
  )


}

export default PromptEditor