import React from 'react'
import {Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        Created by Anthony Nguyen
        <p>
          <Link to="/reportbugs">Have questions, ideas, or bugs?</Link>
        </p>
        <br></br>
        <p>No affiliation with OC Health Care Agency or any government agency</p>
      </div>
    </div>
  )
}

export default Footer
