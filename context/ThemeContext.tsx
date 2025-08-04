import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
//import { NavigationContainer } from '@react-navigation/native';
//import { darkTheme, lightTheme, navigationThemes } from '../theme/paperTheme8'

interface ToggleThemeProps {
  isDark: boolean;
  toggleTheme: () => {}
}

const ThemeContext = createContext<ToggleThemeProps | undefined>(undefined);

export const useThemeToggle = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};
