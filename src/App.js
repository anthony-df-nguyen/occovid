import logo from './logo.svg'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import TimeContext from './components/TimeContext'
import * as sources from 'globalVars/Sources'
import Header from './components/Header'
import Home from 'pages/Home'
import Cases from 'pages/Cases'
import { timeSelection } from 'components/Timeselect'
import Deaths from 'pages/Deaths'
import Hospitalization from 'pages/Hospitalization'
import Vaccinations from 'pages/Vaccinations'
import Testing from 'pages/Testing'
import Schools from 'pages/Schools'
import Age from 'pages/Age'
import Race from 'pages/Race'
import Gender from 'pages/Gender'
import City from 'pages/City'

//document.querySelector('body').classList.add('dark')

function App () {
  //localStorage.clear()
  //console.log(localStorage)
  let startingTime
  if (!localStorage.getItem('timeSetting')) {
    localStorage.setItem('timeSetting', 30)
    startingTime = 30
  } else {
    startingTime = localStorage.getItem('timeSetting')
  }
  const [time, setTime] = useState(startingTime)

  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <TimeContext.Provider value={{ time, setTime }}>
            <Route exact path='/'>
              <Home title='Summary' />
            </Route>
            <Route path='/cases'>
              <Cases title='Cases' />
            </Route>
            <Route path='/deaths'>
              <Deaths title='Deaths' />
            </Route>
            <Route path='/hospitalizations'>
              <Hospitalization title='Hospitalizations' />
            </Route>
            <Route path='/vaccinations'>
              <Vaccinations title='Vaccinations' />
            </Route>
            <Route path='/testing'>
              <Testing title='Testing' />
            </Route>
            <Route path='/schools'>
              <Schools title='Schools' />
            </Route>
            <Route path='/city'>
              <City title='City' />
            </Route>
            <Route path='/age'>
              <Age title='Age' />
            </Route>
            <Route path='/race'>
              <Race title='Race' />
            </Route>
            <Route path='/gender'>
              <Gender title='Gender' />
            </Route>
          </TimeContext.Provider>
        </Switch>
      </div>
    </Router>
  )
}

export default App
