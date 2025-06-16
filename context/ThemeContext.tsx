import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from '../theme/paperTheme6'

const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({
  isDark: false,
  toggleTheme: () => {},
});

export const useThemeToggle = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('isDarkTheme');
      if (saved !== null) {
        setIsDark(saved === 'true');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      AsyncStorage.setItem('isDarkTheme', next.toString());
      return next;
    });
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
