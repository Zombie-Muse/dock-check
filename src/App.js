import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/PrivateRoute";
// import "./App.css";
import DockLayout from "./components/DockLayout";
import DoorDetail from "./components/DoorDetail";
import DoorHistory from "./components/DoorHistory";
import Notes from "./components/Notes";
import NavbarBottom from "./components/NavbarBottom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
// import AddDoor from "./components/AddDoor";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Container>
            <Switch>
              <PrivateRoute exact path="/" component={DockLayout} />
              <PrivateRoute
                path="/door-detail/:id"
                exact
                component={DoorDetail}
              />
              <PrivateRoute path="/history" exact component={DoorHistory} />
              <Route path="/notes" exact component={Notes} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/profile" component={Profile} />

              {/* <Route path="/add" exact component={AddDoor} /> */}
            </Switch>
            <NavbarBottom />
          </Container>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
