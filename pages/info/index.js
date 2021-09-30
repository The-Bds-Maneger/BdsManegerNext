import Head from "next/head";
import React from "react";
import NPMPackage from "../../package.json";
const BdsCore = require("@the-bds-maneger/core/package.json");

class ServerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SystemInfo: {
        core: {
          version: "Loading ...",
          Total_dependencies: 0
        },
        server: {
          version: "Loading ...",
          versions: {
            bedrock: "Loading ...",
            java: "Loading ...",
            pocketmine: "Loading ...",
            spigot: "Loading ...",
            dragonfly: "Loading ..."
          },
          players: {
            online: 0,
            offline: 0
          }
        },
        host: {
          System: "Loading ...",
          Arch: "Loading ...",
          Kernel: "Loading ...",
          Cpu_Model: "Loading ...",
          IsDocker: false,
          IsNpx: false,
          IsCLI: false
        }
      },
      ServerVersions: {
        latest: {
          bedrock: "Loading ...",
          java: "Loading ...",
          pocketmine: "Loading ...",
          spigot: "Loading ...",
          dragonfly: "Loading ..."
        }
      },
      ServerInfo: {
        version: "Loading ...",
        Platform: "Loading ...",
        players: {
          online: 0,
          offline: 0
        },
        Config: {
          world: "Loading ...",
          description: "Loading ...",
          gamemode: "Loading ...",
          difficulty: "Loading ...",
          players: 0,
          whitelist: "Loading ...",
          portv4: 0,
          portv6: 0,
          account: "Loading ...",
          seed: "Loading ...",
          commands: "Loading ..."
        },
        Process: {
          PID: 0,
          Uptime: 0,
          StartTime: "Loading ..."
        }
      }
    }
  }
  // Update States
  componentDidMount() {
    fetch("/BdsAPI/v2/info").then(res => res.json()).then(BdsInfo => {
      fetch("/BdsAPI/v2/info/Server").then(res => res.json()).then(BdsServerInfo => {
        fetch("https://raw.githubusercontent.com/The-Bds-Maneger/external_files/main/Server.json").then(res => res.json()).then(ServersVersions => {
          this.setState({
            SystemInfo: BdsInfo,
            ServerVersions: ServersVersions,
            ServerInfo: BdsServerInfo
          });
        }).catch(err => {});
      }).catch(err => {});
    }).catch(err => {});
  }
  render() {
    return (
      <>
        <Head>
          <title>Server And Host Info</title>
        </Head>
        <div>
          <h1>Bds Maneger Info</h1>
            <ul>
              <li>Bds Maneger Core: {BdsCore.version}</li>
              <li>Bds Maneger: {NPMPackage.version}</li>
            </ul>
          <h1>Host Info</h1>
          <ul>
            <li>System: {this.state.SystemInfo.host.System}, Arch: {this.state.SystemInfo.host.Arch}</li>
            <li>Kernel: {this.state.SystemInfo.host.Kernel}</li>
            <li>CPU Model: {this.state.SystemInfo.host.Cpu_Model}</li>  
          </ul>
          <p></p>
          <h1>Servers Infos</h1>
          {/* Bedrock */}
          <p>
            <h3>Bedrock</h3>
            <ul>
              <li>Latest Version: {this.state.ServerVersions.latest.bedrock}</li>
              <li>Installed Version: {this.state.SystemInfo.server.versions.bedrock ? this.state.SystemInfo.server.versions.bedrock : "Not Installed"}</li>
            </ul>
          </p>
          {/* Java */}
          <p>
            <h3>Java</h3>
            <ul>
              <li>Latest Version: {this.state.ServerVersions.latest.java}</li>
              <li>Installed Version: {this.state.SystemInfo.server.versions.java ? this.state.SystemInfo.server.versions.java : "Not Installed"}</li>
            </ul>
          </p>
          {/* PocketMine */}
          <p>
            <h3>PocketMine</h3>
            <ul>
              <li>Latest Version: {this.state.ServerVersions.latest.pocketmine}</li>
              <li>Installed Version: {this.state.SystemInfo.server.versions.pocketmine ? this.state.SystemInfo.server.versions.pocketmine : "Not Installed"}</li>
            </ul>
          </p>
          {/* Spigot */}
          <p>
            <h3>Spigot</h3>
            <ul>
              <li>Latest Version: {this.state.ServerVersions.latest.spigot}</li>
              <li>Installed Version: {this.state.SystemInfo.server.versions.spigot ? this.state.SystemInfo.server.versions.spigot : "Not Installed"}</li>
            </ul>
          </p>
          {/* DragonFly */}
          <p>
            <h3>DragonFly</h3>
            <ul>
              <li>Latest Version: {this.state.ServerVersions.latest.dragonfly}</li>
              <li>Installed Version: {this.state.SystemInfo.server.versions.dragonfly ? this.state.SystemInfo.server.versions.dragonfly : "Not Installed"}</li>
            </ul>
          </p>
          {/* Current Server Info */}
          <p></p>
          <h1>Current Server Info</h1>
          <p>
            <p><a>Current Platform: {this.state.ServerInfo.Platform}</a></p>
            <p><a>{this.state.ServerInfo.Platform} Version: {this.state.ServerInfo.version}</a></p>
            <p><a>Players</a></p>
              <ul>
                <li>Online: {this.state.ServerInfo.players.online}</li>
                <li>Offline: {this.state.ServerInfo.players.offline}</li>
              </ul>
            <p><a>Config</a></p>
              <ul>
                <li>World Name: {this.state.ServerInfo.Config.world}</li>
                <li>Description: {this.state.ServerInfo.Config.description}</li>
                <li>Gamemode: {this.state.ServerInfo.Config.gamemode}</li>
                <li>Difficulty: {this.state.ServerInfo.Config.difficulty}</li>
                <li>Numbers of Players Allowed to Play on the Server: {this.state.ServerInfo.Config.players}</li>
                <li>Whitelist enabled: {this.state.ServerInfo.Config.whitelist ? "Yes" : "False"}</li>
                <li>Server Port (V4): {this.state.ServerInfo.Config.portv4}</li>
                <li>Server Port (V6): {this.state.ServerInfo.Config.portv6}</li>
                <li>Required Account or Required logged: {this.state.ServerInfo.Config.account ? "Yes" : "No"}</li>
                <li>Seed: {this.state.ServerInfo.Config.seed ? this.state.ServerInfo.Config.seed : "Without a standard seed"}</li>
                <li>Allow Admins use commands: {this.state.ServerInfo.Config.commands ? "Yes" : "No"}</li>
              </ul>
            <p><a>Process</a></p>
              <ul>
                <li><a href="https://en.wikipedia.org/wiki/Process_identifier" rel="noreferrer" target="_blank">PID</a>: {this.state.ServerInfo.Process.PID}</li>
                <li>Server Uptime: {this.state.ServerInfo.Process.Uptime} ms</li>
                <li>Server started at {(() => {
                  const DateD = new Date(this.state.ServerInfo.Process.StartTime);
                  return `${DateD.getDay()}/${DateD.getMonth()}/${DateD.getFullYear()} ${DateD.getHours()}:${DateD.getMinutes()}:${DateD.getSeconds()}`;
                })()}</li>
              </ul>
          </p>
        </div>
      </>
    );
  }
}

// Export
export default ServerInfo;