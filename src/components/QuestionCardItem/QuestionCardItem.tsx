import styles from "./QuestionCardItem.module.scss";
import {ArrowRight, Check} from "lucide-react";
import type {Options} from "../../types/questions.ts";
import clsx from "clsx";


type QuestionCardItemProps = {
  id: string,
  multiSelect: boolean,
  answers: string | string[],
  option: Options,
  handleAnswerChange: (value: string, checked?: boolean) => void;
  handleNext: () => void
}

const QuestionCardItem =
  ({
     id,
     multiSelect,
     answers,
     option,
     handleAnswerChange,
     handleNext

   }: QuestionCardItemProps) => {
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
            name={id}
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

export default QuestionCardItem