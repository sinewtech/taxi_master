import React from "react";
import "./Styles/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Inicio from "./Views/Inicio";
import PagaCadaConductor from "./Views/PagaCadaConductor";
import Error404 from "./Views/Error404";
import firebase from "firebase";
firebase.initializeApp({
  apiKey: "AIzaSyBkCxRqmYLXkznasnf-MRTROWVJcORIGcw",
  authDomain: "taxiapp-sinewave.firebaseapp.com",
  databaseURL: "https://taxiapp-sinewave.firebaseio.com",
  projectId: "taxiapp-sinewave",
  storageBucket: "taxiapp-sinewave.appspot.com",
  messagingSenderId: "503391985374",
});

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="realbody">
          <Switch>
            <Route path="/" component={Inicio} exact />
            <Route path="/paga_cada_conductor" component={PagaCadaConductor} exact />
            <Route component={Error404} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
