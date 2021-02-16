import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Darktoggle from 'components/Darktoggle'
import '../index.css'

const Navigation = (props) => {

  function closeTheNav() {
    let button = document.querySelector('#menubutton')
    let navMenu = document.querySelector('#navMenu')
    let page = document.querySelector('.page')
    navMenu.classList.remove('open')
    page.classList.remove('hidden')
    props.function(false)
  }

  return (
    <div id='navMenu'>
      <div className='linkContainer'>
        <Darktoggle />
        <NavLink exact to='/' onClick={ closeTheNav } activeClassName='selectedLink'>
          Summary
        </NavLink>
        <NavLink to='/cases' onClick={ closeTheNav } activeClassName='selectedLink'>
          Cases
        </NavLink>
        <NavLink to='/deaths' onClick={ closeTheNav } activeClassName='selectedLink'>
          Deaths
        </NavLink>
        <NavLink
          to='/hospitalizations'

          onClick={ closeTheNav } activeClassName='selectedLink'
        >
          Hospitalizations
        </NavLink>
        <NavLink
          to='/vaccinations'

          onClick={ closeTheNav } activeClassName='selectedLink'
        >
          Vaccinations
        </NavLink>
        <NavLink
          to='/testing'

          onClick={ closeTheNav } activeClassName='selectedLink'
        >
          Testing
        </NavLink>
        <NavLink
          to='/schools'

          onClick={ closeTheNav } activeClassName='selectedLink'
        >
          School Cases
        </NavLink>
        <div>
          <div className='subSection'>by Location</div>
        </div>
        <NavLink to='/city' onClick={ closeTheNav } activeClassName='selectedLink'>
          City
        </NavLink>
        <NavLink to='/zip' onClick={ closeTheNav } activeClassName='selectedLink'>
          Zip Code
        </NavLink>
        <div>
          <div className='subSection'>by Demographic</div>
        </div>
        <NavLink to='/age' onClick={ closeTheNav } activeClassName='selectedLink'>
          by Age
        </NavLink>
        <NavLink to='/race' onClick={ closeTheNav } activeClassName='selectedLink'>
          by Race
        </NavLink>
        <NavLink to='/gender' onClick={ closeTheNav } activeClassName='selectedLink'>
          by Gender
        </NavLink>
        <div>
          <div className='subSection'>Other</div>
        </div>
        <NavLink to='/whatsopen' onClick={ closeTheNav } activeClassName='selectedLink'>
          What's Open
        </NavLink>
        <NavLink
          to='/donate'
          className='donate'

          onClick={ closeTheNav } activeClassName='selectedLink'
        >
          Donate
        </NavLink>
      </div>
    </div>
  )
}

export default Navigation
