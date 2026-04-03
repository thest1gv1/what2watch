import styles from "./QuestionCardList.module.scss";

import type {Options} from "../../types/questions.ts";
import QuestionCardItem from "../QuestionCardItem/QuestionCardItem.tsx";


type QuestionCardListProps = {
  options: Options[]
  answers: string | string[]
  currentQuestion: {
    id: string,
    question: string
    multiSelect: boolean
  }
  handleAnswerChange: (value: string) => void
  handleNext: () => void

}

const QuestionCardList =
  ({
     options,
     answers,
     currentQuestion,
     handleAnswerChange,
     handleNext

   }: QuestionCardListProps) => {
    return (
      <ul className={styles.answersList}>
        {options.map(option =>
          <QuestionCardItem
            key={option.value}
            id={currentQuestion.id}
            multiSelect={currentQuestion.multiSelect}
            answers={answers}
            option={option}
            handleAnswerChange={handleAnswerChange}
            handleNext={handleNext}
          />
        )
        }
      </ul>
    )
  }

export default QuestionCardList