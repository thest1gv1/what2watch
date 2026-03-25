import type {Questions} from "../types/questions.ts";
import type {Answers} from "../types/answers.ts";

export const getAIPrompt = (answers: Answers, questions: Questions[]) => {


  let prompt = "Подбери фильм с такими параметрами:\n";

  for (const [id, values] of Object.entries(answers)) {
    const question = questions.find(q => q.id === id);
    if (!question) continue; // на всякий случай

    // превращаем выбранные value в label для текста
    const labels = values
      .map(v => question.options.find(opt => opt.value === v)?.label ?? v)
      .join(", ");

    prompt += `${question.question}: ${labels}\n`;
  }

  prompt += "\nПредложи 5 фильмов с кратким описанием.";
  return prompt;
}