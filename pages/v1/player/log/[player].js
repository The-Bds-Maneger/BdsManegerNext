import Head from "next/head";
import React from "react";
import { withRouter } from "next/router";

function ConvertDateToHumanReadable(date) {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getHours()}:${d.getSeconds()}`
}

class MountPlayer extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    const { PlayerName, PlayerArray } = this.props;
    return (
      <div>
        {
          [...PlayerArray].map((player, key) => {
            return (
              <div key={key}>
                <p>
                  {
                    player.Action === "connect" ?
                      <span style={{color: "green"}}>
                        The {PlayerName} has connected to {ConvertDateToHumanReadable(player.Date)}
                      </span>
                    :
                      <span style={{color: "red"}}>
                        The {PlayerName} has disconnected from {ConvertDateToHumanReadable(player.Date)}
                      </span>
                  }
                </p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

class PlayerLog extends React.Component {
  constructor (props) {
    super(props);
    this.Query = {};
    this.state = {
      PlayerArray: [],
      Query: this.props.router.query,
      OriginalArray: [],
    };
  }
  componentDidMount() {
    const { query } = this.props.router;
    fetch("/BdsAPI/players").then(res => res.json())
    .then(data => [...data])
    .then(data => {this.setState({OriginalArray: data});return data})
    .then(data => {this.setState({PlayerArray: data})});
  }
  render() {
    const { query } = this.props.router;
    return (
      <div>
        <Head>
          <title>{(function (PlayersArray = [], PlayerName = ""){if (PlayersArray.length >= 1) {if (PlayersArray[PlayersArray.length - 1].Action === "connect") {return `${PlayerName} are playing`;}else if (PlayersArray[PlayersArray.length - 1].Action === "disconnect") {return `${PlayerName} is not playing`}} else {return PlayerName;}})(this.state.PlayerArray.filter(b => b.Player === query.player), query.player)}</title>
        </Head>
        <h1>Connection history for {query.player}</h1>
        {this.state.PlayerArray.length >= 1 ? <MountPlayer PlayerArray={this.state.PlayerArray.filter(b => b.Player === query.player)} PlayerName={query.player} /> : <p>No Player Avaible with {query.player}</p>}
      </div>
    );
  }
}

export default withRouter(PlayerLog);