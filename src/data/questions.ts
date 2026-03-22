import type {Questions} from "../types/questions.ts";


export const questions: Questions[] = [
  {
    id: '1',
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
    id: '2',
    question: "С кем смотрите?",
    multiSelect: false,
    options: [
      {value: 'alone', label: 'Один', emoji: '🎭'},
      {value: 'friends', label: 'С друзьями', emoji: '🎉'},
      {value: 'family', label: 'С семьёй', emoji: '🏠'},
      {value: 'partner', label: 'С любимым', emoji: '💑'},
    ]
  },
  {
    id: '3',
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
      {value: 'detective', label: 'Детектив', emoji: '🔍'},
      {value: 'animated', label: 'Анимация', emoji: '🎨'},
      {value: 'documentary', label: 'Документальный', emoji: '📽️'},
    ],
  },
  {
    id: '4',
    question: "Сколько времени есть?",
    multiSelect: false,
    options: [
      {value: 'short', label: 'Меньше 90 минут', emoji: '⏱️'},
      {value: 'medium', label: '90-120 минут', emoji: '⏰'},
      {value: 'long', label: 'Больше 2 часов', emoji: '🎬'},
    ]
  },
];