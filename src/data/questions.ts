import type {Questions} from "../types/questions.ts";


export const questions: Questions[] = [
  {
    id: 'mood',
    question: "Какое у вас настроение сейчас?",
    multiSelect: false,
    options: [
      {value: 'calm', label: 'Спокойное', emoji: '😌'},
      {value: 'energetic', label: 'Энергичное', emoji: '⚡'},
      {value: 'sad', label: 'Грустное', emoji: '😔'},
      {value: 'happy', label: 'Счастливое', emoji: '😊'},
    ]
  },
  {
    id: 'company',
    question: "С кем смотришь?",
    multiSelect: false,
    options: [
      {value: 'alone', label: 'Один', emoji: '🎭'},
      {value: 'partner', label: 'С девушкой/парнем', emoji: '💑'},
      {value: 'friends', label: 'С друзьями', emoji: '🎉'},
      {value: 'family', label: 'С семьёй', emoji: '👨‍👩‍👧'},
    ]
  },
  {
    id: 'vibe',
    question: "Чего хочешь от фильма?",
    multiSelect: false,
    options: [
      {value: 'light', label: 'Просто отдохнуть', emoji: '🍿'},
      {value: 'think', label: 'Подумать над смыслом', emoji: '🧠'},
      {value: 'cry', label: 'Растрогаться', emoji: '😢'},
      {value: 'adrenaline', label: 'Адреналина!', emoji: '🎢'},
      {value: 'cozy', label: 'Уютное, душевное', emoji: '🧸'},
    ]
  },
  {
    id: 'genres',
    question: 'Какие жанры вам интересны?',
    multiSelect: true,
    options: [
      {value: 'comedy', label: 'Комедия', emoji: '😂'},
      {value: 'drama', label: 'Драма', emoji: '🎭'},
      {value: 'thriller', label: 'Триллер', emoji: '🔪'},
      {value: 'action', label: 'Экшн', emoji: '💥'},
      {value: 'fantasy', label: 'Фантастика', emoji: '🚀'},
      {value: 'romance', label: 'Романтика', emoji: '💕'},
      {value: 'horror', label: 'Ужасы', emoji: '👻'},
      {value: 'adventure', label: 'Приключения', emoji: '🗺️'},
      {value: 'biography', label: 'Биография', emoji: '👤'},
      {value: 'detective', label: 'Детектив', emoji: '🔍'},
      {value: 'documentary', label: 'Документальный', emoji: '📽️'},
    ],
  },
  {
    id: 'era',
    question: "Старое или новое?",
    multiSelect: false,
    options: [
      {value: 'fresh', label: 'Свежее (2020+)', emoji: '✨'},
      {value: 'modern', label: '2000-2020', emoji: '📽️'},
      {value: 'classic', label: 'Классика до 2000', emoji: '🎞️'},
      {value: 'any', label: 'Без разницы', emoji: '🤷'},
    ]
  }
];