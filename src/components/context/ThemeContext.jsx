import { createContext,useState} from "react";

let initialState;
if (!localStorage.getItem("isDark")) {
  initialState = false;
} else {
  if (localStorage.getItem("isDark") == "dark") {
    initialState = true;
  } else {
    initialState = false;
  }
}

export const ThemeContext = createContext(null);

const ThemeStore = ({ children }) => {
  const [theme, updateTheme] = useState(initialState);
  return (
      <ThemeContext.Provider value={ [theme, updateTheme] }>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeStore;
