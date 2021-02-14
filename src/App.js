import logo from './logo.svg'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import TimeContext from './components/TimeContext'
import * as sources from './Sources'
import Header from './components/Header'
import Home from 'pages/Home'
import Cases from 'pages/Cases'
import { timeSelection } from 'components/Timeselect'

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
    <Router forceRefresh={true}>
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
          </TimeContext.Provider>
        </Switch>
      </div>
    </Router>
  )
}

export default App
