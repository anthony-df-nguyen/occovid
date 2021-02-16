import React, { useState, useEffect } from 'react'
import Menubutton from './Menubutton'
import Navigation from './Navigation'

const Header = () => {
  useEffect(() => {
    let button = document.querySelector('#menubutton')
    let navMenu = document.querySelector('#navMenu')
    let page = document.querySelector('.page')
    button.onclick = () => {
      button.classList.toggle('is-active')
      if (button.classList.contains('is-active')) {
        navMenu.classList.add('open')
        page.classList.add('hidden')
      } else {
        navMenu.classList.remove('open')
        page.classList.remove('hidden')
      }
    }
  })

  return (
    <div>
      <div className='header'>
        <Menubutton />
        <div className='siteName'>OCCOVID</div>
      </div>
      <Navigation />
    </div>
  )
}

export default Header
