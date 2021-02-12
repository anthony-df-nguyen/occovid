import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as sources from "./Sources";
import Header from "./components/Header";
import Home from "pages/Home";
import CasesPage from "pages/Cases";

function App() {
  return (
    <Router forceRefresh={true}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home title="Summary" />
          </Route>
          <Route path="/cases">
            <CasesPage title="Case Detail" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
