import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Login, User } from "./pages";
import { AppContextProvider } from "./contexts";
import { AppSnackbar, AppAlertDialog } from "./components";

function App() {
  return (
    <AppContextProvider>
      <div className="app">
        <Container className="app-container">
          <Router>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/register">
                <Login />
              </Route>
              <Route path="/user">
                <User />
              </Route>
            </Switch>
          </Router>
          <AppSnackbar />
          <AppAlertDialog />
        </Container>
      </div>
    </AppContextProvider>
  );
}

export default App;
