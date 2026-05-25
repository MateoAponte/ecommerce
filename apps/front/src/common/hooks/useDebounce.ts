import { useEffect } from 'react';

export const useDebounce = (value: string, executeFn: any, delay: number) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      executeFn(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
};
