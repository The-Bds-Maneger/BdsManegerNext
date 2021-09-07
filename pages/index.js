import Head from "next/head";
import { Component } from "react";
import io from "socket.io-client";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {hello: ""}
  }
  componentDidMount() {
    this.socket = io();
    this.socket.on("now", data => {
      this.state.hello += data.message + "\n"
      this.setState(this.state)
    });
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="/style.css" />
        </Head>
        <textarea value={this.state.hello}></textarea>
      </div>
    )
  }
}

export default Home
