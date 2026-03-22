import {questions} from "../../data/questions.ts";
import styles from './Quiz.module.scss'
import Button from "../../components/Button/Button.tsx";
import {useQuiz} from "../../hooks/useQuiz.ts";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
// import {ArrowRight} from "lucide-react";
import QuestionCardList
  from "../../components/QuestionCardList/QuestionCardList.tsx";


const Quiz = () => {

  const {
    currentStep,
    answers,
    currentQuestion,
    progress,
    handleNext,
    handleBack,
    handleAnswerChange
  } =
    useQuiz(questions);


  const hasAnswer = answers[currentStep]?.length > 0

  return (
    <section>
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
          answers={answers[currentStep]}
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
        <div>{JSON.stringify(answers, null, 2)}</div>
      </div>
    </section>
  )
}

export default Quiz