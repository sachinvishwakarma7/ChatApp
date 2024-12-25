import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {LightTheme, DarkTheme, Theme} from '../utils/theme';
import {useAppSelector} from '../redux/Hooks';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {data, loading, isLogin, signInStatus, isDarkTheme} = useAppSelector(
    state => state.LoginReducer,
  );
  const [theme, setTheme] = useState<Theme>(LightTheme);

  const toggleTheme = () => {
    setTheme(currentTheme =>
      currentTheme === LightTheme ? DarkTheme : LightTheme,
    );
  };

  useEffect(() => {
    if (isDarkTheme) {
      setTheme(DarkTheme);
    } else {
      setTheme(LightTheme);
    }
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
