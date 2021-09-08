import Head from "next/head";
import Style from "../styles/Home.module.css"
import { Component } from "react";
import io from "socket.io-client";

import Navbar from "./nav";
import NavBarStyle from "../styles/nav.module.css";

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
        <Navbar />
        <div className={NavBarStyle.root}>
          <Head>
            <title>Home</title>
          </Head>
          <div id="liveLog" className={Style.logDiv}></div>
        </div>
      </div>
    )
  }
}

export default Home
