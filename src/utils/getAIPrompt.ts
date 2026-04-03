import type {Questions} from "../types/questions.ts";
import type {Answers} from "../types/answers.ts";


export const getAIPrompt = (answers: Answers, questions: Questions[]) => {
  let userPrompt = "Подбери фильм с такими параметрами:\n";

  for (const [id, values] of Object.entries(answers)) {
    const question = questions.find(q => q.id === id);
    if (!question) continue;

    const labels = values
      .map(v => question.options.find(opt => opt.value === v)?.label ?? v)
      .join(", ");

    userPrompt += `${question.question}: ${labels}\n`;
  }

  const systemInstruction = `\nПредложи ровно 5 фильмов.\nВерни ТОЛЬКО валидный JSON массив. Никакого текста до и после, никакого markdown.\nФормат: [{"title":"Название на русском","originalTitle":"Original Title","year":2021,"genre":"Жанр","description":"Краткое описание"}]`;

  return {userPrompt, systemInstruction};
};