import React, { useContext, useEffect } from "react";
import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";

import Main from "components/Main";
import List from "components/List";
import Profile from "components/Profile";
import Login from "components/Login";
import Register from "components/Register";
import UserContext from "components/Context/UserContext";
import app from "firebaseController";
import Account from "components/Account";
import Edit from "components/Account/Edit";
import Loading from "components/Loading";

function App() {
  const HeightContentApp = {
    minHeight: window.innerWidth > 800 ? "100vh" : window.innerHeight + "px",
  };

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const authChanged = app.auth().onAuthStateChanged((u) => {
      if (u) setUser(u);
      else setUser(null);
    });

    return () => authChanged();
  }, [setUser]);

  if (user === "loading")
    return (
      <div style={HeightContentApp} className="content-app">
        <Loading />
      </div>
    );

  if (user) {
    return (
      <HashRouter basename="/">
        <div style={HeightContentApp} className="content-app">
          <Switch>
            <Route exact path="/edit">
              <Edit />
            </Route>
            <Route exact path="/create">
              <Edit create />
            </Route>
            <Route exact path="/comida">
              <List type="comida" />
            </Route>
            <Route exact path="/helado">
              <List type="helado" />
            </Route>
            <Route exact path="/bebidas">
              <List type="bebidas" />
            </Route>
            <Route exact path="/main" component={Main} />
            <Route exact path="/:id">
              <Profile />
            </Route>
            <Route path="/">
              <Account />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }

  return (
    <HashRouter basename="/">
      <div style={HeightContentApp} className="content-app">
        <Switch>
          <Route exact path="/comida">
            <List type="comida" />
          </Route>
          <Route exact path="/helado">
            <List type="helado" />
          </Route>
          <Route exact path="/bebidas">
            <List type="bebidas" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/:id">
            <Profile />
          </Route>
          <Route path="/" component={Main} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
