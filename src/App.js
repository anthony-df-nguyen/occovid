import logo from "./logo.svg";
import ReactGA from "react-ga";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import TimeContext from "./components/context/TimeContext";
import ThemeStore from "./components/context/ThemeContext";
import LastUpdateStore from "components/context/LastupdateContext";
import Header from "./components/Header";

import {
  Home,
  Cases,
  Deaths,
  Hospitalization,
  Vaccinations,
  Testing,
  Schools,
  Age,
  Race,
  Gender,
  Maps,
  City,
  Zip,
  Cityhistory,
  WhatsOpen,
  Reportbug,
  NoPage,
  Donate,
  Compare,
  Serology,
} from "pages/Master";
function App() {
  const trackingId = "UA-164595635-1";
  ReactGA.initialize(trackingId);
  ReactGA.pageview(window.location.pathname + window.location.search);
  let startingTime;
  if (!localStorage.getItem("timeSetting")) {
    localStorage.setItem("timeSetting", 30);
    startingTime = 30;
  } else {
    startingTime = localStorage.getItem("timeSetting");
  }
  const [time, setTime] = useState(startingTime);

  return (
    <ThemeStore>
      <Router>
        <div className="App">
          <Header />
          <LastUpdateStore>
            <TimeContext.Provider value={{ time, setTime }}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cases" component={Cases} />
                <Route path="/deaths" component={Deaths} />
                <Route path="/hospitalizations" component={Hospitalization} />
                <Route path="/vaccinations" component={Vaccinations} />
                <Route path="/testing" component={Testing} />
                <Route path="/serology" component={Serology} />
                <Route path="/schools" component={Schools} />
                <Route path="/map" component={Maps} />
                <Route path="/cityhistory" component={Cityhistory} />
                <Route path="/city" component={City} />
                <Route path="/zip" component={Zip} />
                <Route path="/age" component={Age} />
                <Route path="/race" component={Race} />
                <Route path="/gender" component={Gender} />
                <Route path="/whatsopen" component={WhatsOpen} />
                <Route path="/reportbugs" component={Reportbug} />
                <Route path="/donate" component={Donate} />
                <Route path="/compare" component={Compare} />
                <Route component={NoPage} />
              </Switch>
            </TimeContext.Provider>
          </LastUpdateStore>
        </div>
      </Router>
    </ThemeStore>
  );
}
export default App;
