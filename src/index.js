import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Switch, BrowserRouter as Router , Route} from "react-router-dom";
import Routes from "./Routes.js";
import Header from "./Header.js";
import "./Styles.css";
import reportWebVitals from './reportWebVitals';
import  firebase from "firebase/app";
import firebaseConfig from "./firebase.config"

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

function App(){
  const[isLoggedIn, setLoggedIn] = useState(false);

  return(
    <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
    Is logged in? {JSON.stringify(isLoggedIn)}
    <div className="App">
    <Router>
      <Header />

      <Switch>
        {Routes.map(route => (
          <Route
            key = {route.path}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </Switch>
    </Router>
    </div>
    </AuthContext.Provider>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement)

