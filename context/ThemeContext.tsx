import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  isDark: boolean;
  colorScheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType>({ 
  isDark: false, 
  colorScheme: 'light' 
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  
  const checkShouldBeDarkMode = () => {
    const currentHour = new Date().getHours();
    // Log for debugging
    console.log(`Current hour: ${currentHour}, Dark mode: ${currentHour >= 18 || currentHour < 6}`);
    return currentHour >= 18 || currentHour < 6; // Dark mode after 6PM or before 6AM
  };
  
  useEffect(() => {
    // Initial check
    setIsDark(checkShouldBeDarkMode());
    
    // Check every minute
    const interval = setInterval(() => {
      setIsDark(checkShouldBeDarkMode());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <ThemeContext.Provider value={{ isDark, colorScheme: isDark ? 'dark' : 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTimeBasedTheme() {
  return useContext(ThemeContext);
}