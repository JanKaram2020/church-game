import { getNNumbers } from "@/lib/utils";

export interface Choice {
  name: string;
  count: number;
}

export const STORAGE_KEYS = {
  NUMBERS: "christmas-numbers",
  CHOICES: "christmas-choices",
  DISPLAYED_NUMBER: "christmas-displayedNumber",
  DISPLAYED_CHOICE: "christmas-displayedChoice",
  IS_NUMBERS_DISABLED: "christmas-isNumbersDisabled",
  IS_CHOICES_DISABLED: "christmas-isChoicesDisabled",
};

export const initialNumbers = getNNumbers(500);

export const initialChoices: Choice[] = [
  { name: "احكام", count: 18 },
  { name: "مبروك كسبت", count: 4 },
  { name: "حظ سعيد المرة القادمة", count: 4 },
  { name: "ما معني", count: 4 },
  { name: "من هو/هي", count: 9 },
  { name: "اكمل", count: 2 },
  { name: "صح ام خطأ", count: 2 },
  { name: "سؤال", count: 5 },
];

export const timeoutConstant = 2000;

export type SettingsType = {
  choicesLeft: number;
  initialCount: number;
  initialChoices: Choice[];
  resetGame: () => void;
  changeValues: ({
    numbers,
    choices,
  }: {
    numbers: number;
    choices: Choice[];
  }) => void;
};
