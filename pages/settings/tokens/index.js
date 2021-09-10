import React from "react";

import Env from "../../../.env.json"

class Tokens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
    }
  }
  componentDidMount() {
    fetch("/BdsAPI/bds/tokens", {
      method: "POST",
      body: JSON.stringify({token: Env.API_TOKEN}),
      mode: "cors"
    }).then(res => res.json()).then(res => {
      this.setState({
        tokens: res
      })
    });
  }
  render() {
    return (
      <div>
        <h1>Tokens</h1>
      </div>
    );
  }
}

export default Tokens;