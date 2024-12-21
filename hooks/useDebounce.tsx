"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(
  value: T,
  callback?: (value: T) => void,
  delay: number | undefined = 1000
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (callback) callback(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
