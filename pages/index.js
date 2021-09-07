import Head from "next/head";
import { Component } from "react";
import io from "socket.io-client";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: ""
    }
  }
  componentDidMount() {
    this.socket = io();
    this.socket.on("now", data => {
      this.setState({
        hello: data.message
      });
    });
  }

  render() {
    return (
      <h1>{this.state.hello}</h1>
    )
  }
}

export default Home
