import {questions} from "../../data/questions.ts";
import styles from './Quiz.module.scss'
import Button from "../../components/Button/Button.tsx";
import {useQuiz} from "../../hooks/useQuiz.ts";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import {getAIPrompt} from "../../utils/getAIPrompt";
import QuestionCardList
  from "../../components/QuestionCardList/QuestionCardList.tsx";
import {useEffect, useState} from "react";


const Quiz = () => {

  const {
    currentStep,
    answers,
    currentQuestion,
    progress,
    quizFinished,
    handleNext,
    handleBack,
    handleAnswerChange,
  } =
    useQuiz(questions);

  const [aiPrompt, setAiPrompt] = useState("")

  useEffect(() => {
    if (quizFinished) {
      const prompt = getAIPrompt(answers, questions);
      setAiPrompt(prompt);
    }
  }, [quizFinished]);

  const hasAnswer = (answers[currentQuestion.id]?.length ?? 0) > 0


  return (
    <section>
      {!quizFinished && (
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
          <div>

          </div>
        </div>
      )}

      {quizFinished && (
        <div className={styles.promt}>
          <div className={styles.promtInfo}>
            <h3 className={styles.promptTitle}>Отредактируй свой запрос</h3>
            <p className={styles.promptDescription}>Мы подобрали запрос на основе твоего настроения и предпочтений. Можешь его изменить, если хочешь.</p>
          </div>

          <textarea
            className={styles.promptTextarea}
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={6}
          />
          <Button className={styles.promptButton}>Отправить</Button>
        </div>
      )}
    </section>
  )
}

export default Quiz