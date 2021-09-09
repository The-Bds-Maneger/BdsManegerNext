import Head from "next/head";
import { Component } from "react";
import io from "socket.io-client";

// CSS
import Style from "../styles/Home.module.css"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {hello: ""}
  }
  componentDidMount() {
    this.socket = io();
    this.socket.on("Log", data => {
      [...data.log].forEach(log => {
        const Element = document.createElement("p");
        Element.innerHTML = log;
        document.getElementById("liveLog").appendChild(Element);
      });
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <div id="liveLog" className={Style.logDiv}></div>
      </div>
    )
  }
}

export default Home
