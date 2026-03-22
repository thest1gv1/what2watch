import styles from "./QuestionCartItem.module.scss";
import {ArrowRight, Check} from "lucide-react";
import type {Options} from "../../types/questions.ts";
import clsx from "clsx";


type QuestionCartItemProps = {
  multiSelect: boolean,
  answers: string | string[],
  option: Options,
  handleAnswerChange: (value: string, checked?: boolean) => void;
  handleNext: any
}

const QuestionCartItem =
  ({
     multiSelect,
     answers,
     option,
     handleAnswerChange,
     handleNext

   }: QuestionCartItemProps) => {
    const {value, label, emoji} = option;

    const isSelected = answers.includes(value)

    return (
      <li

        className={styles.answerItem}
      >
        <label className={styles.option}>
          <input
            className={styles.input}
            type={multiSelect ? "checkbox" : "radio"}
            name="mood"
            value={value}
            checked={isSelected}
            onChange={() => handleAnswerChange(value)}
            onClick={(e) => {
              if (!multiSelect && isSelected) {
                e.preventDefault();
                handleNext();
              }
            }}
          />

          <span className={styles.labelInfo}>
                    <span className={styles.emoji}>{emoji}</span>
                    <span className={styles.text}>{label}</span>
                  </span>

          {!multiSelect && (
            <span className={styles.arrow}><ArrowRight size={32} /></span>
          )}

          {multiSelect && (
            <span className={clsx(styles.checkbox, {[styles.checked]: isSelected})}>
                {isSelected && <Check size={24} />}
          </span>
          )}
        </label>
      </li>
    )
  }

export default QuestionCartItem