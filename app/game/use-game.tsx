import { useState, useEffect, useRef } from "react";
import useLocalStorage from "@/lib/use-local-storage";
import { getNNumbers } from "@/lib/utils";
import {
  type Choice,
  initialChoices,
  initialNumbers,
  STORAGE_KEYS,
  timeoutConstant,
} from "@/app/game/common";

const useGame = () => {
  const [isChoicesDisabled, setIsChoicesDisabled] = useLocalStorage(
    STORAGE_KEYS.IS_CHOICES_DISABLED,
    true,
  );
  const [numbers, setNumbers] = useLocalStorage(
    STORAGE_KEYS.NUMBERS,
    initialNumbers,
  );
  const [choices, setChoices] = useLocalStorage<Choice[]>(
    STORAGE_KEYS.CHOICES,
    initialChoices,
  );
  const choicesLeft = choices.reduce((a, b) => a + b.count, 0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [displayedNumber, setDisplayedNumber] = useLocalStorage<number | null>(
    STORAGE_KEYS.DISPLAYED_NUMBER,
    null,
  );
  const [displayedChoice, setDisplayedChoice] = useLocalStorage<string | null>(
    STORAGE_KEYS.DISPLAYED_CHOICE,
    null,
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spinNumbers = (): void => {
    setIsSpinning(true);
    setDisplayedChoice(null); // Clear the choice when number animation starts
    const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
    let index = 0;

    intervalRef.current = setInterval(() => {
      setDisplayedNumber(shuffledNumbers[index % shuffledNumbers.length]);
      index++;
    }, 50);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const finalNumber =
        shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];
      setDisplayedNumber(finalNumber);
      setNumbers((prevNumbers) =>
        prevNumbers.filter((num) => num !== finalNumber),
      );
      setIsSpinning(false);
      setIsChoicesDisabled(false);
    }, timeoutConstant);
  };

  const spinChoices = (): void => {
    setIsSpinning(true);
    setDisplayedChoice(null);

    let index = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const availableChoices = choices
        .filter((choice) => choice.count > 0)
        .map((choice) => choice.name);
      setDisplayedChoice(availableChoices[index % availableChoices.length]);
      index++;
    }, 50);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setChoices((prevChoices) => {
        const availableChoices = prevChoices.filter(
          (choice) => choice.count > 0,
        );
        if (availableChoices.length > 0) {
          const randomChoiceIndex = Math.floor(
            Math.random() * availableChoices.length,
          );
          const chosenChoice = availableChoices[randomChoiceIndex];
          setDisplayedChoice(chosenChoice.name);
          return prevChoices.map((choice) =>
            choice.name === chosenChoice.name
              ? { ...choice, count: choice.count - 1 }
              : choice,
          );
        } else {
          setDisplayedChoice("No more choices available");
          return prevChoices;
        }
      });
      setIsSpinning(false);
      setIsChoicesDisabled(true);
    }, timeoutConstant);
  };

  const resetGame = (): void => {
    setNumbers(initialNumbers);
    setChoices(initialChoices);
    setDisplayedNumber(null);
    setDisplayedChoice(null);
    setIsSpinning(false);
    setIsChoicesDisabled(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const changeValues = ({
    numbers,
    choices,
  }: {
    numbers: number;
    choices: Choice[];
  }): void => {
    resetGame();
    setNumbers(getNNumbers(numbers));
    setChoices(choices);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    displayedNumber,
    displayedChoice,
    spinNumbers,
    spinChoices,
    numbers,
    choices,
    isNumbersDisabled: isSpinning || numbers.length === 0,
    isChoicesDisabled: isChoicesDisabled || isSpinning || choicesLeft === 0,
    isResetDisabled: numbers.length === initialNumbers.length,
    resetGame,
    choicesLeft,
    isSpinning,
    initialChoices,
    initialCount: 500,
    changeValues,
  };
};

export default useGame;
