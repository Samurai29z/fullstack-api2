import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPlayers from "./components/add-tutorial.component";
import players from "./components/tutorial.component";
import playersList from "./components/tutorials-list.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div class="container">
            <a href="/players" className="navbar-brand">
              FTF
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/players"} className="nav-link">
                  Statistiques
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Ajouter nouveau joueur
                </Link>
              </li>
            </div>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/players"]} component={playersList} />
            <Route exact path="/add" component={AddPlayers} />
            <Route path="/players/:id" component={players} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;