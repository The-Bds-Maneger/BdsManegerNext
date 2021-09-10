import React from "react";

// CSS
import Css from "../styles/_error.module.css";

class _404 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={Css["CenterDiv"]}>
        <h1>This page does not exist in the project</h1>
        <p>Creeper is not here!</p>
      </div>
    );
  }
}

export default _404;