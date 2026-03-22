export type Questions = {
  id: string;
  question: string;
  multiSelect: boolean
  options: Options[];
};

export type Options = {
  value: string;
  label: string;
  emoji: string;
};