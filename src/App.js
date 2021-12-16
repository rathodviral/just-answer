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
        <Container maxWidth="xs" className="app-container">
          <Router>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/register">
                <Login />
              </Route>
              <Route exact path="/user">
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
