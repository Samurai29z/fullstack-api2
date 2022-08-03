import React, { Component } from "react";
import PlayersDataService from "../services/tutorial.service";

export default class players extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirst = this.onChangeFirst.bind(this);
    this.onChangeLast = this.onChangeLast.bind(this);
    this.onChangeOld = this.onChangeOld.bind(this);
    this.onChangeWins = this.onChangeWins.bind(this);
    this.onChangeLosses = this.onChangeLosses.bind(this);
    this.onChangePoints = this.onChangePoints.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.deletePlayers = this.deletePlayers.bind(this);

    this.state = {
      currentPlayers: {
        id: null,
      first: "",
      last: "",
      old: "",
      wins: "",
      losses: "",
      points: "",
      published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getPlayers(this.props.match.params.id);
  }

  onChangeFirst(e) {
    const first = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPlayers: {
          ...prevState.currentPlayers,
          first: first,
        },
      };
    });
  }

  onChangeLast(e) {
    const last = e.target.value;

    this.setState((prevState) => ({
      currentPlayers: {
        ...prevState.currentPlayers,
        last: last,
      },
    }));
  }
  onChangeOld(e) {
    const old = e.target.value;

    this.setState((prevState) => ({
      currentPlayers: {
        ...prevState.currentPlayers,
        old: old,
      },
    }));
  }
  onChangeWins(e) {
    const wins = e.target.value;

    this.setState((prevState) => ({
      currentPlayers: {
        ...prevState.currentPlayers,
        wins: wins,
      },
    }));
  }
  onChangeLosses(e) {
    const losses = e.target.value;

    this.setState((prevState) => ({
      currentPlayers: {
        ...prevState.currentPlayers,
        losses: losses,
      },
    }));
  }
  onChangePoints(e) {
    const points = e.target.value;

    this.setState((prevState) => ({
      currentPlayers: {
        ...prevState.currentPlayers,
        points: points,
      },
    }));
  }

  getPlayers(id) {
    PlayersDataService.get(id)
      .then((response) => {
        this.setState({
          currentPlayers: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentPlayers.id,
      first: this.state.currentPlayers.first,
      last: this.state.currentPlayers.last,
      old: this.state.currentPlayers.old,
      wins: this.state.currentPlayers.wins,
      losses: this.state.currentPlayers.losses,
      points: this.state.currentPlayers.points,
      published: status,
    };

    PlayersDataService.update(this.state.currentPlayers.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentPlayers: {
            ...prevState.currentPlayers,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePlayers() {
    PlayersDataService.update(
      this.state.currentPlayers.id,
      this.state.currentPlayers
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The players was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deletePlayers() {
  PlayersDataService.delete(this.state.currentPlayers.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/players");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentPlayers } = this.state;

    return (
      <div>
        {currentPlayers ? (
          <div className="edit-form">
            <h4>players</h4>
            <form>
              <div className="form-group">
              <label htmlFor="name">first_name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={currentPlayers.first}
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
                value={currentPlayers.last}
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
                value={currentPlayers.old}
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
                value={currentPlayers.wins}
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
                value={currentPlayers.losses}
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
                value={currentPlayers.points}
                onChange={this.onChangePoints}
                name="points"
              />
            </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPlayers.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPlayers.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button className="btn btn-danger" onClick={this.deletePlayers}>
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updatePlayers}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a players...</p>
          </div>
        )}
      </div>
    );
  }
}