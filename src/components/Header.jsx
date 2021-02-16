import React, { useState, useEffect } from 'react'
import Navigation from './Navigation'
import "../cssmodular/burger.css";
import { Link } from "react-router-dom"

const Header = () => {
  const [isOpen, updateIsOpen] = useState(false);

  function checkIfOpen() {
    let button = document.querySelector('#menubutton')
    let navMenu = document.querySelector('#navMenu')
    let page = document.querySelector('.page')
    if (!isOpen) {
      navMenu.classList.add('open')
      page.classList.add('hidden');
      updateIsOpen(true)
    } else if (isOpen) {
      navMenu.classList.remove('open')
      page.classList.remove('hidden')
      updateIsOpen(false)
    }
  }


  return (
    <div>
      <div className='header'>
        <button onClick={ checkIfOpen }
          id="menubutton"
          className="hamburger hamburger--arrow"
          type="button"
        >
          <span className="hamburger-box ">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <Link to="/">
          <div className='siteName'>OCCOVID</div>
        </Link>

      </div>
      <Navigation function={ updateIsOpen } />
    </div>
  )
}

export default Header
