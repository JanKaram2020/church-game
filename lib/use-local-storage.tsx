import { SetStateAction, useEffect, useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => initialValue);

  const setValue = (value: SetStateAction<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setState(() => {
        try {
          const stored = localStorage.getItem(key);
          return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch {
          return initialValue;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, setValue] as const;
};

export default useLocalStorage;
