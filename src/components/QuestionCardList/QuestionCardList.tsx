import styles from "./QuestionCardList.module.scss";

import type {Options} from "../../types/questions.ts";
import QuestionCartItem from "../QuestionCartItem/QuestionCartItem.tsx";


type QuestionCardListProps = {
  options: Options[]
  answers: string | string[]
  currentQuestion: {
    question: string
    multiSelect: boolean
  }
  handleAnswerChange: (value: string) => void
  handleNext:any

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
          <QuestionCartItem
            key={option.value}
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