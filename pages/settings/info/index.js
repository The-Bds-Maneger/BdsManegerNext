import React from "react";

import { contributors } from "@the-bds-maneger/core/BdsManegerInfo.json"

class Contri extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {
          contributors.map((item, index) => {
            return (
              <p key={index}>
                <h1>{item.name}</h1>
                <p>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">Web Site</a> : null} {" "} {item.email ? <a href={`mailto:${item.email}`}>Send E-Mail</a> : null}</p>
              </p>
            )
          })
        }
      </div>
    )
  }
}

export default Contri;