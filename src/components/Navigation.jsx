import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Darktoggle from 'components/Darktoggle'
import '../index.css'
import Button from 'components/Button'
import ReactGA from 'react-ga';

const Navigation = (props) => {

  function closeTheNav(path) {
    ReactGA.pageview(path)
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
        <NavLink exact to='/' onClick={ () => { closeTheNav('/') } } activeClassName='selectedLink'>
          Summary
        </NavLink>
        <NavLink to='/cases' onClick={ () => { closeTheNav('/cases') } } activeClassName='selectedLink'>
          Cases
        </NavLink>
        <NavLink to='/deaths' onClick={ () => { closeTheNav('/deaths') } } activeClassName='selectedLink'>
          Deaths
        </NavLink>
        <NavLink
          to='/hospitalizations'

          onClick={ () => { closeTheNav('/hospitalizations') } } activeClassName='selectedLink'
        >
          Hospitalizations
        </NavLink>
        <NavLink
          to='/vaccinations'

          onClick={ () => { closeTheNav('/vaccinations') } } activeClassName='selectedLink'
        >
          Vaccinations
        </NavLink>
        <NavLink
          to='/testing'

          onClick={ () => { closeTheNav('/testing') } } activeClassName='selectedLink'
        >
          Testing
        </NavLink>
        <NavLink
          to='/schools'

          onClick={ () => { closeTheNav('/schools') } } activeClassName='selectedLink'
        >
          School Cases
        </NavLink>
        <div>
          <div className='subSection'>by Location</div>
        </div>
        <NavLink to='/cityhistory' onClick={ () => { closeTheNav('/cityhistory') } } activeClassName='selectedLink'>
          City History
        </NavLink>
        <NavLink to='/city' onClick={ () => { closeTheNav('/city') } } activeClassName='selectedLink'>
          City
        </NavLink>
        <NavLink to='/zip' onClick={ () => { closeTheNav('/zip') } } activeClassName='selectedLink'>
          Zip Code
        </NavLink>
        <div>
          <div className='subSection'>by Demographic</div>
        </div>
        <NavLink to='/age' onClick={ () => { closeTheNav('/age') } } activeClassName='selectedLink'>
          by Age
        </NavLink>
        <NavLink to='/race' onClick={ () => { closeTheNav('/race') } } activeClassName='selectedLink'>
          by Race
        </NavLink>
        <NavLink to='/gender' onClick={ () => { closeTheNav('/gender') } } activeClassName='selectedLink'>
          by Gender
        </NavLink>
        <div>
          <div className='subSection'>Other</div>
        </div>
        <NavLink to='/whatsopen' onClick={ () => { closeTheNav('/whatsopen') } } activeClassName='selectedLink'>
          What's Open
        </NavLink>

        <div style={ { paddingBottom: "8rem", } } onClick={ () => { closeTheNav('/donate') } }>
          <Button onClick={ () => { closeTheNav() } } url={ '/donate' } text="Donate" />
        </div>


      </div>
    </div>
  )
}

export default Navigation
