import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DockLayout from "./components/DockLayout";
import DoorDetail from "./components/DoorDetail";
import DoorList from "./components/DoorList";

function App() {
  return (
    <Router>
      <div className="App">
        <DockLayout />
        <Switch>
          <Route exact path="/" component={DoorList} />
          <Route path="/door-detail" component={DoorDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
