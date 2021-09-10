import React from "react";

// CSS
import Css from "../styles/_error.module.css";

class _500 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={Css["CenterDiv"]}>
        <h1>Sorry we had an error in the backend</h1>
        <p>A Creeper blew up our backend, contact the Server Administrator</p>
      </div>
    );
  }
}

export default _500;