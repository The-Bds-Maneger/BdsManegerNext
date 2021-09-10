import Head from "next/head";
import { Component } from "react";
import io from "socket.io-client";

// CSS
import Style from "../styles/Home.module.css"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.socket = io();
    
    // Reciver Log
    this.socket.on("Log", data => {
      [...data.log].forEach(log => {
        const Element = document.createElement("p");
        Element.innerHTML = log;
        document.getElementById("liveLog").appendChild(Element);
      });
    });

    // Send Command
    this.SendCommand = (command = "") => {
      this.socket.emit("Command", command);
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <div id="liveLog" className={Style.logDiv}></div>
        <p>
          <div>
            <input type="text" style={{width: "88%"}} placeholder="Send commands to the server" id="Command" onKeyPress={function (e) {
              if (e.key === "Enter") {
                const Send = document.getElementById("SendButton");
                Send.click();
              }
            }} />
            <button style={{marginLeft: "1vw"}} id="SendButton" onClick={() => {
              const CommandDOM = document.getElementById("Command");
              this.SendCommand(CommandDOM.value)
              CommandDOM.value = "";
            }} >Send</button>
          </div>
        </p>
      </div>
    )
  }
}

export default Home
