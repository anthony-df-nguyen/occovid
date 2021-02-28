import logo from "./logo.svg";
import ReactGA from "react-ga";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TimeStore from "components/context/TimeContext";
import ThemeStore from "components/context/ThemeContext";
import LastUpdateStore from "components/context/LastupdateContext";
import Header from "components/Header";

import {
  Home,
  Cases,
  Deaths,
  Hospitalization,
  Vaccinations,
  VaccinationMap,
  Testing,
  Schools,
  Age,
  Race,
  Gender,
  Maps,
  CityZip,
  Cityhistory,
  WhatsOpen,
  Reportbug,
  NoPage,
  Donate,
  Compare,
  Sources,
} from "pages/Master";

function App() {
  const trackingId = "UA-164595635-1";
  ReactGA.initialize(trackingId);
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <ThemeStore>
      <Router>
        <div className="App">
          <Header />
          <LastUpdateStore>
            <TimeStore>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cases" component={Cases} />
                <Route path="/deaths" component={Deaths} />
                <Route path="/hospitalizations" component={Hospitalization} />
                <Route path="/vaccinations" component={Vaccinations} />
                <Route path="/vaccinationmap" component={VaccinationMap} />
                <Route path="/testing" component={Testing} />
                <Route path="/schools" component={Schools} />
                <Route path="/map" component={Maps} />
                <Route path="/cityhistory" component={Cityhistory} />
                <Route path="/cityzip" component={CityZip} />
                <Route path="/age" component={Age} />
                <Route path="/race" component={Race} />
                <Route path="/gender" component={Gender} />
                <Route path="/compare" component={Compare} />
                <Route path="/whatsopen" component={WhatsOpen} />
                <Route path="/reportbugs" component={Reportbug} />
                <Route path="/sourcesfaq" component={Sources} />
                <Route path="/donate" component={Donate} />

                <Route component={NoPage} />
              </Switch>
            </TimeStore>
          </LastUpdateStore>
        </div>
      </Router>
    </ThemeStore>
  );
}
export default App;
