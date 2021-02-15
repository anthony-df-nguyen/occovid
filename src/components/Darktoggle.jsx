import React, { useState } from 'react'
import DarkModeToggle from 'react-dark-mode-toggle'

export default () => {
  let body = document.querySelector('body')
  let currentTheme

  //Get Last Mode from Memory or set it if it doesnt exist
  if (!localStorage.getItem('currentTheme')) {
    currentTheme = 'light'
    localStorage.setItem('currentTheme', currentTheme)
    //isDarkMode = false
  } else {
    currentTheme = localStorage.getItem('currentTheme')
  }

  //Set boolean for the component Required
  let [isDarkMode, setIsDarkMode] = useState(() => {
    if (currentTheme === 'light') {
      return false
    } else if (currentTheme === 'dark') {
      body.classList.add('dark')
      return true
    }
  })

  function setTheme () {
    if (!isDarkMode) {
      localStorage.setItem('currentTheme', 'dark')
      body.classList.add('dark')
      setIsDarkMode(true)
    } else if (isDarkMode) {
      localStorage.setItem('currentTheme', 'light')
      body.classList.remove('dark')
      setIsDarkMode(false)
    }
  }

  return (
    <div id='themeSelector'>
      <div className='themeText'>Theme</div>
      <DarkModeToggle
        onChange={() => {
          setTheme()
        }}
        checked={isDarkMode}
        size={60}
      />
    </div>
  )
}
