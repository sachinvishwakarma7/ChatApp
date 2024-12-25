export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    accent: string;
    main: string;
    white: string;
    black: string;
  };
}

export const LightTheme: Theme = {
  colors: {
    main: '#6932d9', //common
    // main: '#1A434E', //common
    white: '#ffffff', //common
    black: '#000000', //common
    primary: '#ffffff',
    secondary: '#e6e6e6',
    text: '#000000',
    accent: '#6200ee',
  },
};

export const DarkTheme: Theme = {
  colors: {
    main: '#6932d9', //common
    // main: '#1A434E', //common
    white: '#ffffff', //common
    black: '#000000', //common
    primary: '#121212',
    secondary: '#1f1f1f',
    text: '#ffffff',
    accent: '#bb86fc',
  },
};
