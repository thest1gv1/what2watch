import styles from "./PromptEditor.module.scss";
import Button from "../Button/Button.tsx";
import type {Answers} from "../../types/answers.ts";
import type {Questions} from "../../types/questions.ts";
import {useEffect, useRef, useState} from "react";
import {getAIPrompt} from "../../utils/getAIPrompt.ts";


import {Film} from "lucide-react";
import type {Movies} from "../../types/movies.ts";
import {API_URL} from "../../api/config.ts";


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
  onSubmit: (movies: Movies[]) => void
}

const PromptEditor = ({answers, questions, onSubmit}: PromptEditorProps) => {
  const {userPrompt, systemInstruction} = getAIPrompt(answers, questions)
  const [prompt, setPrompt] = useState(userPrompt)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

      const response = await fetch(`${API_URL}/movies/recommend`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt: fullPrompt})
      })

      if (response.status === 429) {
        setError('Лимит запросов исчерпан, попробуй через минуту')
        return
      }

      if (!response.ok) {
        setError('Сервис временно недоступен, попробуй позже')
        return
      }

      const movies = await response.json()
      onSubmit(movies)
    } catch {
      setError('Нет соединения с интернетом')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
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
        ref={textareaRef}
        value={prompt}
        onChange={handleChange}
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