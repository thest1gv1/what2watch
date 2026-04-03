import styles from "./PromptEditor.module.scss";
import Button from "../Button/Button.tsx";
import type {Answers} from "../../types/answers.ts";
import type {Questions} from "../../types/questions.ts";
import {useState} from "react";
import {getAIPrompt} from "../../utils/getAIPrompt.ts";
import type {Movie} from "../../pages/ResultPage/ResultPage.tsx";

type PromptEditorProps = {
  answers: Answers
  questions: Questions[]
  onSubmit: (movies: Movie[]) => void
}

const PromptEditor = ({answers, questions, onSubmit}: PromptEditorProps) => {
  const {userPrompt, systemInstruction} = getAIPrompt(answers, questions)
  const [prompt, setPrompt] = useState(userPrompt)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const fullPrompt = prompt + systemInstruction
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            contents: [{parts: [{text: fullPrompt}]}]
          })
        }
      )
      const data = await response.json()
      const text = data.candidates[0].content.parts[0].text
      const cleaned = text.replace(/```json|```/g, '').trim()
      const movies = JSON.parse(cleaned)

      onSubmit(movies)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className={styles.prompt}>
      <div className={styles.promptInfo}>
        <h3 className={styles.promptTitle}>Отредактируй свой запрос</h3>
        <p className={styles.promptDescription}>Мы подобрали запрос на основе твоего настроения и предпочтений. Можешь его изменить, если хочешь.</p>
      </div>

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
      >{loading ? 'Подбираем...' : 'Отправить'}</Button>
    </div>
  )
}

export default PromptEditor