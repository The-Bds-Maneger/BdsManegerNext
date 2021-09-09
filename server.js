#!/usr/bin/env node
// Internal Dependencies
const path = require("path");
const fs = require("fs");

// External Dependencies
const app = require("express")();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const next = require("next");
const Bds_Backend = require("@the-bds-maneger/core");

// Next App Setup
const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;
io.on("connect", socket => {
  // Current Log
  let CurrentLog = fs.readFileSync(path.join(Bds_Backend.getBdsConfig().paths.log, "latest.log"), "utf8");
  if (fs.existsSync(path.join(Bds_Backend.getBdsConfig().paths.log, "latest.log")) && Bds_Backend.detect()) {
    socket.emit("Log", {
      log: CurrentLog.split(/\n|\r/gi),
    });
  }

  // Send Players JSON
  let Players = JSON.parse(fs.readFileSync(Bds_Backend.getBdsConfig().paths.player, "utf8"));
  socket.emit("PlayerList", Players[Bds_Backend.BdsSettigs.GetPlatform()]);

  // Send Server Config
  socket.emit("LoadConfig", Bds_Backend.get_config());
  
  // Save Server Config
  socket.on("SaveConfig", data => {
    console.log(data);
    Bds_Backend.set_config(data);
    socket.emit("LoadConfig", Bds_Backend.get_config());
  });

  // Backend Control
  socket.on("control", data => {
    console.log(data);
    if (data.type === "start") {
      StartServer();
    } else if (data.type === "stop") {
      StopServer();
    }
  });
});

// Bds Core Backend
function StartServer() {
  if (Bds_Backend.detect()) {
    return false;
  } else {
    const Server = Bds_Backend.start();
    Server.log(data => {
      process.stdout.write(data);
      io.emit("Log", { log: data.split(/\n|\r/gi) })
    });
    Server.on("all", data => io.emit("OnServer", { data }));
    global.globalRunID = Server.uuid;
    return Server;
  }
}

function StopServer() {
  if (global.globalRunID) {
    global.BdsExecs[global.globalRunID].stop();
    global.globalRunID = null;
    return true;
  } else {
    return false;
  }
}

// Prepare Next App
nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
