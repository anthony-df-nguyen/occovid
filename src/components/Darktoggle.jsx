import React, { useState, useContext } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import {ThemeContext} from 'components/context/ThemeContext'
export default () => {
  let body = document.querySelector("body");
 
  //console.log(ThemeContext)
  const [theme,updateTheme] = useContext(ThemeContext)

  const [isDarkMode, updateDarkMode] = useState(theme)

  if (theme == true) {
      localStorage.setItem("isDark", "dark");
      body.classList.add("dark");
  }

  function setTheme() {
    if (!isDarkMode) {
      localStorage.setItem("isDark", "dark");
      body.classList.add("dark");
      updateTheme(true);
      updateDarkMode(true)
    } else if (isDarkMode) {
      localStorage.setItem("isDark", "light");
      body.classList.remove("dark");
      updateDarkMode(false)
      updateTheme(false);
    }
  }

  return (
      <div id="themeSelector">
        <div className="themeText">Theme</div>
        <DarkModeToggle
          onChange={() => {
            setTheme();
          }}
          checked={isDarkMode}
          size={60}
        />
      </div>
  );
};
