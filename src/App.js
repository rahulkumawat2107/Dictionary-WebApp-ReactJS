import './App.css';
import Header from "./Header"
import Content from "./Content"
import About from "./about"
import Login from "./login"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path = "/about" component={About} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
