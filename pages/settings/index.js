import { Component } from "react";
import io from "socket.io-client";

import NavBar from "../nav";
import NavBarStyle from "../../styles/nav.module.css";

class ServerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      world: "Bds Maneger",
      description: "The Bds Maneger",
      gamemode: "creative",
      difficulty: "normal",
      players: 10,
      commands: true,
      account: true,
      whitelist: false,
      port: 19132,
      portv6: 19133,
      seed: ""
    }
  }
  componentDidMount() {
    this.socket = io();
    this.socket.on("LoadConfig", data => {
      this.setState({
        world: data.world,
        description: data.description,
        gamemode: data.gamemode,
        difficulty: data.difficulty,
        players: data.players,
        commands: data.commands,
        account: data.account,
        whitelist: data.whitelist,
        port: data.port,
        portv6: data.portv6,
        seed: data.seed
      });
    });
  }

  render() {
    return (
      <div>
      <NavBar />
      <div className={NavBarStyle.root}>
        {/* World Name */}
        <span>World Name: <input type="text" placeholder="World Name" value={this.state.world} onChange={(e) => this.setState({world: e.target.value})} /></span>
        {/* World Description */}
        <p><span>World Description: <input type="text" placeholder="World Description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} /></span></p>
        {/* Gamemode */}
        <p>
        <span>Gamemode:
          <select value={this.state.gamemode} onChange={(e) => this.setState({gamemode: e.target.value})}>
            <option value="survival">Survival</option>
            <option value="creative">Creative</option>
            <option value="adventure">Adventure</option>
            {/* <option value="spectator">Spectator</option> */}
          </select>
        </span>
        </p>
        {/* Difficulty */}
        <p>
        <span>Difficulty:
          <select value={this.state.difficulty} onChange={(e) => this.setState({difficulty: e.target.value})}>
            <option value="peaceful">Peaceful</option>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </span>
        </p>
        {/* Max Players */}
        <p>
          <span>Max Players: <input type="number" placeholder="Max Players" value={this.state.players} onChange={(e) => this.setState({players: e.target.value})} /></span>
        </p>
        {/* Commands */} {/* Account */} {/* Whitelist */}
        <p>
          <span onClick={() => document.getElementById("CommandCheck").checked = !document.getElementById("CommandCheck").checked}>Enable Commands: <input type="checkbox" id="CommandCheck" checked={this.state.commands} onChange={(e) => this.setState({commands: e.target.checked})} /></span>
          <span onClick={() => document.getElementById("AccountCheck").checked = !document.getElementById("AccountCheck").checked}>, Require Account to connect in server: <input type="checkbox" id="AccountCheck" checked={this.state.account} onChange={(e) => this.setState({account: e.target.checked})} /></span>
          <span onClick={() => document.getElementById("WhitelistCheck").checked = !document.getElementById("WhitelistCheck").checked}>, Whitelist: <input type="checkbox" id="WhitelistCheck" checked={this.state.whitelist} onChange={(e) => this.setState({whitelist: e.target.checked})} /></span>
        </p>
        {/* Port */}
        <p>
          <span>
            Server Port: <input type="number" placeholder="Port" value={this.state.port} onChange={(e) => this.setState({port: parseInt(e.target.value) || 19132})} />
            , Server Port IPv6: <input type="number" placeholder="Port IPv6" value={this.state.portv6} onChange={(e) => this.setState({portv6: parseInt(e.target.value) || 19133})} /></span>
        </p>
        {/* Seed */}
        <p>
          <span>Seed: <input type="text" placeholder="Seed" value={this.state.seed} onChange={(e) => this.setState({seed: e.target.value})} /></span>
        </p>
        {/* Submit */}
        <button onClick={() => {
          this.socket.emit("SaveConfig", {
            world: this.state.world,
            description: this.state.description,
            gamemode: this.state.gamemode,
            difficulty: this.state.difficulty,
            players: this.state.players,
            commands: this.state.commands,
            account: this.state.account,
            whitelist: this.state.whitelist,
            port: this.state.port,
            portv6: this.state.portv6,
            seed: this.state.seed
          });
        }}>Save</button>
      </div>
    </div>
    )
  }
}

export default ServerSettings;