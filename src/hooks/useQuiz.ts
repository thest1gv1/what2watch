import {useState, useMemo} from "react";
import type {Questions} from "../types/questions.ts";
import type {Answers} from "../types/answers.ts";


; // как у тебя было

export function useQuiz(questions: Questions[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Текущий вопрос
  const currentQuestion = useMemo(() => questions[currentStep], [questions, currentStep]);

  // Прогресс в %
  const progress = useMemo(() => ((currentStep + 1) / questions.length) * 100, [currentStep, questions.length]);

  // Навигация шагов
  const handleNext = () => {
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, questions.length - 1));
    }, 200);
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  // Сохраняем ответ 11111111111111111111111111111111111111111111111111111111111111111
  const handleAnswerChange = (option: string) => {
    const question = questions[currentStep];
    const questionId = question.id;

    if (question.multiSelect) {
      // Множественный выбор
      setAnswers(prev => {
        const prevArr = prev[questionId] ?? [];
        const newArr = prevArr.includes(option)
          ? prevArr.filter(v => v !== option)
          : [...prevArr, option];
        return {...prev, [questionId]: newArr};
      });
      // НЕ вызываем handleNext для мультиселекта
      // } else {
      //   // Одиночный выбор

      //   // handleNext(); // сразу переходим
      return
    }

    setAnswers(prev => ({...prev, [questionId]: [option]}));

    if (currentStep === questions.length - 1) {
      setQuizFinished(true)
    } else {
      handleNext()
    }
  };

  return {
    currentStep,
    answers,
    currentQuestion,
    progress,
    quizFinished,
    handleNext,
    handleBack,
    handleAnswerChange,
  };
}