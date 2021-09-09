import { Component } from "react";
import io from "socket.io-client";

// Start buttom
class StartButtom extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.socket = io();
    this.BackendControl = (type = "start") => {
      this.socket.emit("control", {
          type: type
      });
    }
  }
  render() {
    return (
      <li className="nav-item" href="#Start" id="start">
        <a href="#" className="nav-link">
          <svg width="1%" viewBox="0 0 16 16" className="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
          </svg>
          <span className="link-text" onClick={() => this.BackendControl("start")}>Start</span>
        </a>
      </li>
    )
  }
}

// Stop buttom
class StopButtom extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.socket = io();
    this.BackendControl = (type = "start") => {
      this.socket.emit("control", {
          type: type
      });
    }
  }
  render() {
    return (
      <li className="nav-item" href="#Stop" id="stop">
        <a href="#" className="nav-link" id="StopButtom">
          <svg width="1%" viewBox="0 0 16 16" className="bi bi-pause" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
          </svg>
          <span className="link-text" onClick={() => this.BackendControl("stop")}>Stop</span>
        </a>
      </li>
    )
  }
}

// Settings buttom
class SettingsButtom extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.socket = io();
  }
  render() {
    return (
      <li className="nav-item">
        <a href={"/settings"} className="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="2%" viewBox="0 0 24 24">
            <g>
              <path d="M0,0h24v24H0V0z" fill="none"/>
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </g>
          </svg>
          <span className="link-text">Settings</span>
        </a>
      </li>
    )
  }
}

// Player Settings
class PlayerShotcurt extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.socket = io();
  }
  render() {
    return (
      <li className="nav-item">
        <a className="nav-link" href="players">
          <svg version="1.1" fill="currentColor" x="0px" y="0px" viewBox="0 0 384.971 384.971">
            <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,00.91,180.455,360.10z"/>
          </svg>
          <span className="link-text">Player</span>
        </a>
      </li>
    )
  }
}

// backup Settings
class Backup extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.socket = io();
  }
  render() {
    return (
      <li className="nav-item">
        <a className="nav-link">
          <svg version="1.1" fill="currentColor" x="0px" y="0px" viewBox="0 0 384.971 384.971">
            <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,00.91,180.455,360.10z"/>
          </svg>
          <span className="link-text">Backup</span>
        </a>
      </li>
    )
  }
}

// backup Settings
class Logout extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.socket = io();
  }
  render() {
    return (
      <li className="nav-item">
        <a className="nav-link">
          <svg version="1.1" fill="currentColor" x="0px" y="0px" viewBox="0 0 384.971 384.971">
            <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"/>
            <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
          </svg>
          <span className="link-text">Logout</span>
        </a>
      </li>
    )
  }
}

// Nav Bar
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <nav className="navbar" id="navbarID">
          <ul className="navbar-nav" style={{listStyleType: "none"}}>
              <li>
                  <a href={"/"} className="nav-link">
                      <span className="link-text">Bds Maneger</span>
                  </a>
              </li>
              <li className="nav-link"></li>
              {/* Start Buttom */}
              <StartButtom />

              {/* Stop Buttom */}
              <StopButtom />

              {/* Settings Buttom */}
              <SettingsButtom />
          </ul>
      </nav>
    )
  }
}
export default Navbar;
