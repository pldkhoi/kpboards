import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

function parseJson<T>(raw: string | null, fallback: T): T {
  if (raw === null) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readLocalStorageValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  return parseJson(window.localStorage.getItem(key), fallback);
}

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    return readLocalStorageValue(key, defaultValue);
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const listener = (e: StorageEvent) => {
      if (e.storageArea === window.localStorage && e.key === key) {
        setValue(parseJson(e.newValue, defaultValue));
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: T | ((prev: T) => T)) => {
    setValue((currentValue: T) => {
      const result =
        typeof newValue === 'function' ? (newValue as (prev: T) => T)(currentValue) : newValue;

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(result));
      }

      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
