import { useEffect, useState } from 'react';

function getSavedValue <T> (key: string, initialVal: T) {
  let savedValue = localStorage.getItem(key);
  if (savedValue) {
    savedValue = JSON.parse(savedValue);
    return savedValue;
  };
  if (initialVal instanceof Function) return initialVal();
  return initialVal;
}

export default function useLocalStorage <T> (key: string, initialVal: T) {
  const [value, setValue] = useState(() => {
    return getSavedValue<T>(key, initialVal);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}