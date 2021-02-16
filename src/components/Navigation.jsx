import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Darktoggle from 'components/Darktoggle'
import '../index.css'

const Navigation = () => {

  function closeNav() {
    const navMenu = document.querySelector('#navMenu')
    const button = document.querySelector('#menubutton')
    navMenu.classList.remove('open')
    button.classList.remove('is-active')
  }

  return (
    <div id='navMenu'>
      <div className='linkContainer'>
        <Darktoggle />
        <NavLink exact to='/' onClick={ closeNav } activeClassName='selectedLink'>
          Summary
        </NavLink>
        <NavLink to='/cases' onClick={ closeNav } activeClassName='selectedLink'>
          Cases
        </NavLink>
        <NavLink to='/deaths' onClick={ closeNav } activeClassName='selectedLink'>
          Deaths
        </NavLink>
        <NavLink
          to='/hospitalizations'
          onClick={ closeNav }
          activeClassName='selectedLink'
        >
          Hospitalizations
        </NavLink>
        <NavLink
          to='/vaccinations'
          onClick={ closeNav }
          activeClassName='selectedLink'
        >
          Vaccinations
        </NavLink>
        <NavLink
          to='/testing'
          onClick={ closeNav }
          activeClassName='selectedLink'
        >
          Testing
        </NavLink>
        <NavLink
          to='/schools'
          onClick={ closeNav }
          activeClassName='selectedLink'
        >
          School Cases
        </NavLink>
        <div>
          <div className='subSection'>by Location</div>
        </div>
        <NavLink to='/city' onClick={ closeNav } activeClassName='selectedLink'>
          City
        </NavLink>
        <NavLink to='/zip' onClick={ closeNav } activeClassName='selectedLink'>
          Zip Code
        </NavLink>
        <div>
          <div className='subSection'>by Demographic</div>
        </div>
        <NavLink to='/age' onClick={ closeNav } activeClassName='selectedLink'>
          by Age
        </NavLink>
        <NavLink to='/race' onClick={ closeNav } activeClassName='selectedLink'>
          by Race
        </NavLink>
        <NavLink to='/gender' onClick={ closeNav } activeClassName='selectedLink'>
          by Gender
        </NavLink>
        <NavLink
          to='/donate'
          className='donate'
          onClick={ closeNav }
          activeClassName='selectedLink'
        >
          Donate
        </NavLink>
      </div>
    </div>
  )
}

export default Navigation
