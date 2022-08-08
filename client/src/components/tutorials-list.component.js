import React, { Component } from "react";
import PlayersDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class PlayersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFirst = this.onChangeSearchFirst.bind(this);
    this.retrievePlayers = this.retrievePlayers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePlayers = this.setActivePlayers.bind(this);
    this.removeAllPlayers = this.removeAllPlayers.bind(this);
    this.searchFirst = this.searchFirst.bind(this);

    this.state = {
      players: [],
      currentplayers: null,
      currentIndex: -1,
      searchFirst: "",
    };
  }

  componentDidMount() {
    this.retrievePlayers();
  }

  onChangeSearchFirst(e) {
    const searchFirst = e.target.value;

    this.setState({
      searchFirst: searchFirst,
    });
  }

  retrievePlayers() {
    PlayersDataService.getAll()
      .then((response) => {
        this.setState({
          players: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePlayers();
    this.setState({
      currentplayers: null,
      currentIndex: -1,
    });
  }

  setActivePlayers(players, index) {
    this.setState({
      currentplayers: players,
      currentIndex: index,
    });
  }

  removeAllPlayers() {
    PlayersDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchFirst() {
    this.setState({
      currentplayers: null,
      currentIndex: -1,
    });

    PlayersDataService.findByFirst(this.state.searchFirst)
      .then((response) => {
        this.setState({
          players: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchFirst, players, currentplayers, currentIndex } =
      this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrez joueur par son nom"
              value={searchFirst}
              onChange={this.onChangeSearchFirst}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFirst}
              >
                Chercher
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 text-right">
          <h4>Liste des joueurs</h4>

          <ul className="list-group">
            {players &&
              players.map((players, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePlayers(players, index)}
                  key={index}
                >
                  {players.first}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPlayers}
          >
            Tout supprimer
          </button>
        </div>
        <div className="col-md-6">
          {currentplayers ? (
            <div>
              <h4>Satistiques</h4>
              <div>
                <label>
                  <strong>FIRSTNAME:</strong>
                </label>{" "}
                {currentplayers.first}
              </div>
              <div>
                <label>
                  <strong>LASTNAME:</strong>
                </label>{" "}
                {currentplayers.last}
              </div>
              <div>
                <label>
                  <strong>OLD:</strong>
                </label>{" "}
                {currentplayers.old}
              </div>
              <div>
                <label>
                  <strong>WINS:</strong>
                </label>{" "}
                {currentplayers.wins}
              </div>
              <div>
                <label>
                  <strong>LOSSES:</strong>
                </label>{" "}
                {currentplayers.losses}
              </div>
              <div>
                <label>
                  <strong>POINTS_SCORE:</strong>
                </label>{" "}
                {currentplayers.points}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentplayers.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/players/" + currentplayers.id}
                className="btn btn-warning"
              >
                Modifier
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Veuillez clicker sur un joueur svp...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}