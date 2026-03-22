
import styles from './ProgressBar.module.scss'
import type {Questions} from "../../types/questions.ts";

type ProgressBarProps = {
  currentStep: number;
  progress: number;
  questions: Questions[];
};

const ProgressBar = ({currentStep, progress, questions}: ProgressBarProps) => {

  return (
    <div className={styles.progress}>
      <div className={styles.progressHeader}>
        <span>Вопрос {currentStep + 1} из {questions.length}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{width: `${progress}%`}}
        />
      </div>
    </div>
  )
}

export default ProgressBar