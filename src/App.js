import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import DockLayout from "./components/DockLayout";
import DoorDetail from "./components/DoorDetail";
import DoorHistory from "./components/DoorHistory";
import NavbarBottom from "./components/NavbarBottom";
// import AddDoor from "./components/AddDoor";
import Notes from "./components/Notes";

function App() {
  return (
    <Router>
      <Container>
        <div className="App">
          <h1 className="">LAX Dock Layout</h1>
          <Switch>
            <Route exact path="/dock-layout" component={DockLayout} />
            <Route path="/door-detail/:id" exact component={DoorDetail} />
            <Route path="/history" exact component={DoorHistory} />
            <Route path="/notes" exact component={Notes} />
            {/* <Route path="/add" exact component={AddDoor} /> */}
          </Switch>
          <NavbarBottom />
        </div>
      </Container>
    </Router>
  );
}

export default App;
