import Head from "next/head";
import { Component } from "react";
import io from "socket.io-client";
import NextRouter from "next/router";
import React from "react";

// CSS
import PlayerCSS from "./Player.module.css";

function getQuery(){
  return NextRouter.router.query;
}

class PlayerList extends React.Component {
  render() {
      return (
          <p className="sidebar__category container-fluid">
            {
            this.props.Player
            .map((Data, key) => (
              <div key={key} className="PlayerList">
                <span>Player: {Data.Player}</span>
                <p>
                  <span>Date: <input type="date" disabled value={new Date(Data.value)} /></span>
                </p>
              </div>
            ))
          }
        </p>
      );
  }
}

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: [],
      Server: ""
    }
    this.PlayerArray = [];
  }
  componentDidMount() {
    this.socket = io();
    const Querys = getQuery();
    this.setState(Querys);
    // Player Array
    this.socket.on("PlayerList", data => {
      console.log(data);
      this.setState({
        player: data.filter((thing, index, self) => index === self.findIndex((t) => (t.place === thing.place && t.Player === thing.Player))),
      });
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{this.state.player.length >= 1 ?  `Player: ${this.state.player.length}` : "No Players"} || Server: {this.state.Server !== "" ?  this.state.Server : "The Bds Maneger"}</title>
        </Head>
        <div id="PlayerList" className={PlayerCSS["PlayerList"]}>
          {
            this.state.player.length >= 1 ? <PlayerList Player={this.state.player}/> : <p className={PlayerCSS["CenterNoPLayer"]}>No Players</p>
          }
        </div>
      </div>
    )
  }
}

export default Player;