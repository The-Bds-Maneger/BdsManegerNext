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
      const ParseDateToInput = (dateRecive = new Date()) => {
        const date = new Date(dateRecive);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        return `${year}/${month}/${day} ${hour}:${min}:${sec}`;
      }
      return (
        <div>
          {
            this.props.Player.map((Data, key) => (
              <div key={key} className="PlayerList">
                <a href={`player/log/${Data.Player}`}>Player: {Data.Player}</a>
              </div>
            ))
          }
        </div>
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
        <div id="PlayerList">
          {
            this.state.player.length >= 1 ? <PlayerList Player={this.state.player}/> : <p className={PlayerCSS["CenterNoPLayer"]}>No Players</p>
          }
        </div>
      </div>
    )
  }
}

export default Player;