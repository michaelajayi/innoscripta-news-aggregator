import { useState, useEffect } from 'react';

// Custom hook for debouncing (delay is in ms)
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // clean up side effect
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);
  
  return debouncedValue;
}

export default useDebounce;