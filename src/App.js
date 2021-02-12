import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as sources from "./Sources";
import Header from "./components/Header";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Router forceRefresh={true}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home title="Summary" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
