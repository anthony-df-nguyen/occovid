import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../index.css'

const Navigation = () => {
  return (
    <div id='navMenu'>
      <div className='linkContainer'>
        <NavLink exact to='/' activeClassName='selectedLink'>
          Summary
        </NavLink>
        <NavLink to='/cases' activeClassName='selectedLink'>
          Cases
        </NavLink>
        <NavLink to='/deaths' activeClassName='selectedLink'>
          Deaths
        </NavLink>
        <NavLink to='/hospitalizations' activeClassName='selectedLink'>
          Hospitalizations
        </NavLink>
        <NavLink to='/vaccinations' activeClassName='selectedLink'>
          Vaccinations
        </NavLink>
        <NavLink to='/testing' activeClassName='selectedLink'>
          Testing
        </NavLink>
        <NavLink to='/schools' activeClassName='selectedLink'>
          School Cases
        </NavLink>
        <div>
          <div className='subSection'>by Location</div>
        </div>
        <NavLink to='/city' activeClassName='selectedLink'>
          City
        </NavLink>
        <NavLink to='/zip' activeClassName='selectedLink'>
          Zip Code
        </NavLink>
        <div>
          <div className='subSection'>by Demographic</div>
        </div>
        <NavLink to='/age' activeClassName='selectedLink'>
          by Age
        </NavLink>
        <NavLink to='/race' activeClassName='selectedLink'>
          by Race
        </NavLink>
        <NavLink to='/gender' activeClassName='selectedLink'>
          by Gender
        </NavLink>
        <NavLink to='/donate' className='donate' activeClassName='selectedLink'>
          Donate
        </NavLink>
      </div>
    </div>
  )
}

export default Navigation
