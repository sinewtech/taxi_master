import React from "react";
//import firebase from "./firebase.js";
import "./Styles/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Inicio from "./Views/Inicio";
import PagaCadaConductor from "./Views/PagaCadaConductor";
import Error404 from "./Views/Error404";
import Mapa from "./Views/MapaConductores.js";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="realbody">
          <Switch>
            <Route path="/" component={Inicio} exact />
            <Route path="/paga_cada_conductor" component={PagaCadaConductor} exact />
            <Route path = "/mapa_conductores" component = {Mapa} exact />
            <Route component={Error404} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
