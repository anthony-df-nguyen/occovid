import logo from './logo.svg'

import ReactGA from 'react-ga';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import TimeContext from './components/TimeContext'
import * as sources from 'globalVars/Sources'
import Header from './components/Header'
import { timeSelection } from 'components/Timeselect'
import { Home, Cases, Deaths, Hospitalization, Vaccinations, Testing, Schools, Age, Race, Gender, City, Zip, Cityhistory, WhatsOpen, ComingSoon, NoPage, Donate } from 'pages/Master'




function App() {
  const trackingId = "UA-164595635-1";
  ReactGA.initialize(trackingId);
  ReactGA.pageview(window.location.pathname + window.location.search) 
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
        <TimeContext.Provider value={ { time, setTime } }>
        <Switch>
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
            <Route path='/cityhistory'>
              <Cityhistory title='City History' />
            </Route>
            <Route path='/city'>
              <City title='City' />
            </Route>
            <Route path='/zip'>
              <Zip title='Zip' />
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
            <Route path='/whatsopen'>
              <WhatsOpen title='Whats Open' />
            </Route>
              <Route path='/comingsoon'>
              <ComingSoon title='Coming Soon' />
            </Route>
            <Route path='/donate'>
              <Donate title='Donate' />
            </Route>
            <Route >
              <NoPage title="404" />
            </Route>
            
        
        </Switch>
            </TimeContext.Provider>
      </div>
    </Router>
  )
}

export default App
