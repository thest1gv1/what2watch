import {questions} from "../../data/questions.ts";
import Button from "../../components/Button/Button.tsx";
import {useQuiz} from "../../hooks/useQuiz.ts";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import QuestionCardList
  from "../../components/QuestionCardList/QuestionCardList.tsx";
import PromptEditor from "../../components/PromptEditor/PromptEditor.tsx";
import {useEffect, useState} from "react";
import styles from './QuizPage.module.scss'
import type {Movies} from "../../types/movies.ts";
import ResultsPage from "../ResultPage/ResultPage.tsx";
import {fetchMovies} from "../../api/fetchMovies.ts";


const QuizPage = () => {

  const [movies, setMovies] = useState<Movies[]>(() => {
    const saved = sessionStorage.getItem('results')
    return saved ? JSON.parse(saved) : []
  })

  const [lastPrompt, setLastPrompt] = useState(() =>
    sessionStorage.getItem('last-prompt') ?? ''
  )
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const {
    currentStep,
    answers,
    currentQuestion,
    progress,
    step,
    setStep,
    handleNext,
    handleBack,
    handleAnswerChange,
    handleRetry,
  } =
    useQuiz(questions);


  const hasAnswer = (answers[currentQuestion.id]?.length ?? 0) > 0

  const handleSetMovies = (newMovies: Movies[], prompt: string) => {
    setLastPrompt(prompt)
    setMovies(newMovies)
    sessionStorage.setItem('results', JSON.stringify(newMovies))
    sessionStorage.setItem('last-prompt', prompt)
    setStep('results')
  }

  const handleLoadMore = async () => {

    // console.log('lastPrompt:', lastPrompt)
    //
    // if (!lastPrompt) {
    //   console.warn('lastPrompt пустой — нельзя догрузить')
    //   return
    // }

    setIsLoadingMore(true)
    try {
      const exclude = movies.map(m => m.originalTitle)
      console.log('exclude:', exclude)
      const newMovies = await fetchMovies(lastPrompt, exclude)
      const merged = [...movies, ...newMovies.filter(
        m => !movies.some(existing => existing.tmdb_id === m.tmdb_id)
      )]
      setMovies(merged)
      sessionStorage.setItem('results', JSON.stringify(merged))
    } finally {
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('results')
    if (saved && JSON.parse(saved).length > 0) {
      setStep('results')
    }
  }, [])


  return (
    <section>
      {step === 'quiz' && (
        <div className={styles.quiz}>
          <header className={styles.header}>
            <h2 className={styles.title}>Подберём фильм для тебя</h2>
            <p className={styles.description}>Ответь на несколько вопросов — меньше минуты</p>
          </header>

          <ProgressBar
            currentStep={currentStep}
            progress={progress}
            questions={questions}
          />

          <div className={styles.infoQuestion}>
            <h3 className={styles.titleQuestion}>{currentQuestion.question}</h3>
            {currentQuestion.multiSelect ?
              <p className={styles.descriptionQuestion}>Выберите несколько</p> :
              <p className={styles.descriptionQuestion}>Выберите что-то одно</p>}
          </div>


          <QuestionCardList
            options={currentQuestion.options}
            answers={answers[currentQuestion.id] || []}
            currentQuestion={currentQuestion}
            handleAnswerChange={handleAnswerChange}
            handleNext={handleNext}
          />
          <div className={styles.actions}>
            <Button
              disabled={currentStep === 0}
              onClick={handleBack}
            >
              Назад
            </Button>


            <Button
              onClick={handleNext}
              disabled={!hasAnswer || !currentQuestion.multiSelect}
            >
              Продолжить
            </Button>

          </div>

        </div>
      )}

      {step === 'prompt' && (
        <PromptEditor
          answers={answers}
          questions={questions}
          onSubmit={handleSetMovies}
        />

      )}

      {step === 'results' && (
        <ResultsPage
          movies={movies}
          onRetry={handleRetry}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      )}
    </section>
  )
}

export default QuizPage