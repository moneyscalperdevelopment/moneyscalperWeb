import { useState, useEffect } from 'react';

const STORAGE_KEY = 'waitlist_counter';
const START_DATE = '2025-01-01';
const BASE_COUNT = 1235;
const DAILY_INCREMENT = 15;

// Get the base count based on days passed
const getBaseCount = () => {
  const startDate = new Date(START_DATE);
  const today = new Date();
  const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return BASE_COUNT + (daysPassed * DAILY_INCREMENT);
};

// Get additional count from localStorage
const getAdditionalCount = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
};

// Save additional count to localStorage
const saveAdditionalCount = (count: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, count.toString());
  } catch (error) {
    console.error('Failed to save counter:', error);
  }
};

export const useWaitlistCounter = () => {
  const [count, setCount] = useState(() => {
    return getBaseCount() + getAdditionalCount();
  });

  // Update count daily
  useEffect(() => {
    const updateCount = () => {
      const baseCount = getBaseCount();
      const additionalCount = getAdditionalCount();
      setCount(baseCount + additionalCount);
    };

    // Check for updates every hour
    const interval = setInterval(updateCount, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Increment counter when user registers
  const incrementCounter = () => {
    const additionalCount = getAdditionalCount() + 1;
    saveAdditionalCount(additionalCount);
    setCount(getBaseCount() + additionalCount);
  };

  return { count, incrementCounter };
};
