import {questions} from "../../data/questions.ts";
import styles from './QuizPage.module.scss'
import Button from "../../components/Button/Button.tsx";
import {useQuiz} from "../../hooks/useQuiz.ts";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import QuestionCardList
  from "../../components/QuestionCardList/QuestionCardList.tsx";
import PromptEditor from "../../components/PromptEditor/PromptEditor.tsx";
import ResultsPage, {type Movie} from "../ResultPage/ResultPage.tsx";
import {useState} from "react";


const QuizPage = () => {

  const [movies, setMovies] = useState<Movie[]>([])

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

            {currentQuestion.multiSelect && (
              <Button
                onClick={handleNext}
                disabled={!hasAnswer}
              >
                Продолжить
              </Button>
            )}
          </div>

        </div>
      )}

      {step === 'prompt' && (
        <PromptEditor
          answers={answers}
          questions={questions}
          onSubmit={(movies) => {
            setMovies(movies)
            setStep('results')
          }}
        />

      )}

      {step === 'results' && (
        <ResultsPage
          movies={movies}
          onRetry={handleRetry}
        />
      )}
    </section>
  )
}

export default QuizPage