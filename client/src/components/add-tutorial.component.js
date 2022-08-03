import React, { Component } from "react";
import PlayersDataService from "../services/tutorial.service";

export default class AddPlayers extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirst = this.onChangeFirst.bind(this);
    this.onChangeLast = this.onChangeLast.bind(this);
    this.onChangeOld = this.onChangeOld.bind(this);
    this.onChangeWins = this.onChangeWins.bind(this);
    this.onChangeLosses = this.onChangeLosses.bind(this);
    this.onChangePoints = this.onChangePoints.bind(this);
    this.savePlayers = this.savePlayers.bind(this);
    this.newPlayers = this.newPlayers.bind(this);

    this.state = {
      id: null,
      first: "",
      last: "",
      old: "",
      wins: "",
      losses: "",
      points: "",
      published: false,

      submitted: false,
    };
  }

  onChangeFirst(e) {
    this.setState({
      first: e.target.value,
    });
  }
  onChangeLast(e) {
    this.setState({
      last: e.target.value,
    });
  }
  onChangeOld(e) {
    this.setState({
      old: e.target.value,
    });
  }
  onChangeWins(e) {
    this.setState({
      wins: e.target.value,
    });
  }
  onChangeLosses(e) {
    this.setState({
      losses: e.target.value,
    });
  }

  onChangePoints(e) {
    this.setState({
      points: e.target.value,
    });
  }

  savePlayers() {
    var data = {
      first: this.state.first,
      last: this.state.last,
      old: this.state.old,
      wins: this.state.wins,
      losses: this.state.losses,
      points: this.state.points,
      
    };

    PlayersDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          first: response.data.first,
          last: response.data.last,
          old: response.data.old,
          wins: response.data.wins,
          losses: response.data.losses,
          points: response.data.points,
          published: response.data.published,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newPlayers() {
    this.setState({
      id: null,
      first: "",
      last: "",
      old: "",
      wins: "",
      losses: "",
      points: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Sauvegardé avec succés!</h4>
            <button className="btn btn-success" onClick={this.newPlayers}>
              Ajoutez une nouvelle entrée
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">first_name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.first}
                onChange={this.onChangeFirst}
                name="first"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">last_name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.last}
                onChange={this.onChangeLast}
                name="last"
              />
            </div>

            <div className="form-group">
              <label htmlFor="old">old</label>
              <input
                type="text"
                className="form-control"
                id="old"
                required
                value={this.state.old}
                onChange={this.onChangeOld}
                name="old"
              />
            </div>

            <div className="form-group">
              <label htmlFor="wins">wins</label>
              <input
                type="text"
                className="form-control"
                id="wins"
                required
                value={this.state.wins}
                onChange={this.onChangeWins}
                name="wins"
              />
            </div>

            <div className="form-group">
              <label htmlFor="losses">losses</label>
              <input
                type="text"
                className="form-control"
                id="losses"
                required
                value={this.state.losses}
                onChange={this.onChangeLosses}
                name="losses"
              />
            </div>

            <div className="form-group">
              <label htmlFor="points">points</label>
              <input
                type="text"
                className="form-control"
                id="points"
                required
                value={this.state.points}
                onChange={this.onChangePoints}
                name="points"
              />
            </div>

            <button onClick={this.savePlayers} className="btn btn-success">
              Envoyez
            </button>
          </div>
        )}
      </div>
    );
  }
}