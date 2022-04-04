import { BrowserRouter, Switch, Route } from "react-router-dom";

// page compononts
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SingleDrink from "./pages/Singledrink";

//styles
import "./App.css";

function App() {
  return (
    <div className={`App`}>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path='/:lid'>
            <Home />
          </Route>
          <Route path='/singledrink/:id'>
            <SingleDrink />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
