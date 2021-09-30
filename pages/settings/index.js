import { Component } from "react";
import io from "socket.io-client";
import Envs from "../../.env.json";

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
      seed: "",
      loadConfig: false,
      AvaiblesPlatforms: [],
      Platform: null,
    }
  }
  componentDidMount() {
    this.socket = io();
    fetch("http://localhost:3000/BdsAPI/v2/info/server").then(res => res.json()).then(Server_Info => {
      fetch("/BdsAPI/PlatformValid").then(res => res.json()).then(Platform_Valid => {
        const ServerSettings = Server_Info.Config;
        const CurrentAvaible = Object.getOwnPropertyNames(Platform_Valid.valid_platform).filter(Platform => Platform_Valid.valid_platform[Platform]);
        this.setState({
          world: ServerSettings.world,
          description: ServerSettings.description,
          gamemode: ServerSettings.gamemode,
          difficulty: ServerSettings.difficulty,
          players: ServerSettings.players,
          commands: ServerSettings.commands,
          account: ServerSettings.account,
          whitelist: ServerSettings.whitelist,
          port: ServerSettings.port,
          portv6: ServerSettings.portv6,
          seed: ServerSettings.seed,
          loadConfig: true,
          Platform: Server_Info.Platform,
          AvaiblesPlatforms: CurrentAvaible || [],
        });
      }).catch(err => {});
    }).catch(err => {});
  }
  componentDidUpdate() {
    // auto save server settings
    fetch("/BdsAPI/v2/save_settings", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: Envs.API_TOKEN,
        Token: Envs.API_TOKEN,
        WorldName: this.state.world,
        ServerDescription: this.state.description,
        DefaultGamemode: this.state.gamemode,
        ServerDifficulty: this.state.difficulty,
        MaxPlayer: this.state.players,
        WorldSeed: this.state.seed,
        AllowCommands: this.state.commands,
        RequireLogin: this.state.account,
        EnableWhitelist: this.state.whitelist,
        port_v4: this.state.port,
        port_v6: this.state.portv6
      })
    }).catch(err => {});

    // auto save Bds Config
    fetch("/BdsAPI/Updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        platform: this.state.Platform,
      })
    }).catch(err => {});
  }
  render() {
    return (
      <div>
        <h1>Bds Maneger</h1>
        <ul>
          <span>Select Aviable Bds Maneger Platform: {" "}
            <select onChange={(e) => {this.setState({Platform: e.target.value})}} value={this.state.Platform}>{this.state.AvaiblesPlatforms.length || 0  > 0 ? this.state.AvaiblesPlatforms.map((platform, key) => (<option key={key} value={platform}>{platform}</option>)) : <option>Loading...</option>}</select>
          </span>
        </ul>
        <h1>Server Settings</h1>
        <ul>
          {/* Wolrd */}
          <h3>World</h3>
          <ul>
            {/* World Name */}
            <span>World Name: <input type="text" placeholder="World Name" value={this.state.world} onChange={(e) => this.setState({world: e.target.value})} /></span>
            {/* World Description */}
            <p><span>World Description: <input type="text" placeholder="World Description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} /></span></p>
            {/* Gamemode */}
            <p>
            <span>Gamemode:{" "}
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
            <span>Difficulty:{" "}
              <select value={this.state.difficulty} onChange={(e) => this.setState({difficulty: e.target.value})}>
                <option value="peaceful">Peaceful</option>
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
              </select>
            </span>
            </p>

            {/* Seed */}
            <p>
              <span>Seed: <input type="text" placeholder="Seed" value={this.state.seed} onChange={(e) => this.setState({seed: e.target.value})} /></span>
            </p>
            {/* Commands */} {/* Account */} {/* Whitelist */}
            <p><span onClick={() => document.getElementById("CommandCheck").checked = !document.getElementById("CommandCheck").checked}>Enable Commands:</span> <input type="checkbox" id="CommandCheck" checked={this.state.commands} onChange={(e) => this.setState({commands: e.target.checked})} /></p>
            <p><span onClick={() => document.getElementById("AccountCheck").checked = !document.getElementById("AccountCheck").checked}>Require Account to connect in server:</span> <input type="checkbox" id="AccountCheck" checked={this.state.account} onChange={(e) => this.setState({account: e.target.checked})} /></p>
            <p><span onClick={() => document.getElementById("WhitelistCheck").checked = !document.getElementById("WhitelistCheck").checked}>Enable Whitelist:</span> <input type="checkbox" id="WhitelistCheck" checked={this.state.whitelist} onChange={(e) => this.setState({whitelist: e.target.checked})} /></p>
          </ul>
          {/* Server */}
          <h3>Server</h3>
          <ul>
            {/* Port */}
            <p><span>Server Port: <input type="number" placeholder="Port" value={this.state.port} onChange={(e) => this.setState({port: parseInt(e.target.value) || 19132})} /></span></p>
            <p><span>Server Port IPv6: <input type="number" placeholder="Port IPv6" value={this.state.portv6} onChange={(e) => this.setState({portv6: parseInt(e.target.value) || 19133})} /></span></p>
            {/* Max Players */}
            <p><span>Max Players: <input type="number" placeholder="Max Players" value={this.state.players} onChange={(e) => this.setState({players: e.target.value})} /></span></p>
          </ul>
        </ul>
      </div>
    )
  }
}

export default ServerSettings;