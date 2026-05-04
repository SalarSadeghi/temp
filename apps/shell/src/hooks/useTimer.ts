// src/hooks/useTimer.ts
import { useState, useEffect, useCallback } from "react";

export const useTimer = (initialSeconds: number = 120) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const formatTime = useCallback(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [seconds]);

  return {
    seconds,
    isActive,
    startTimer,
    resetTimer,
    formatTime,
  };
};
