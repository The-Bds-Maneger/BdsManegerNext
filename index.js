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
      log: CurrentLog.replace(/\r\n/gi, "\n").split(/\n/gi),
    });
  }

  // Send Players JSON
  let Players = JSON.parse(fs.readFileSync(Bds_Backend.getBdsConfig().paths.player, "utf8"));
  socket.emit("PlayerList", Players[Bds_Backend.BdsSettigs.GetPlatform()]);

  // Command
  socket.on("Command", (data = "", callback = () => {}) => {
    if (global.globalRunID) {
      global.BdsExecs[global.globalRunID].command(data, () => {
        callback(true);
      });
    } else callback(false);
  });
});

// Backend Control
app.post("/BdsBackend/control", (req, res) => {
  const { typeaction } = req.headers;
  if (typeaction === "start") {
    StartServer();
  } else if (typeaction === "stop") {
    StopServer();
  }
  res.send("OK");
});

// Bds Core Backend
function StartServer() {
  if (Bds_Backend.detect()) {
    return false;
  } else {
    const Server = Bds_Backend.start();
    Server.log(data => {
      process.stdout.write(data);
      io.emit("Log", { log: data.replace(/\r\n/gi, "\n").split(/\n/gi) })
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

// Load Root API Token
const rootToken = JSON.parse(fs.readFileSync(path.join(Bds_Backend.BdsSettigs.bds_dir, "bds_tokens.json"), "utf8"));
if (rootToken.length > 0) process.env.API_TOKEN = rootToken[0].token;
else {
  process.env.API_TOKEN = Bds_Backend.token_register();
}

fs.readFile("./.env.json", "utf8", (err, data) => {
  if (err) {
    fs.writeFileSync("./.env.json", JSON.stringify({
      API_TOKEN: process.env.API_TOKEN,
    }, null, 2));
  } else {
    data = JSON.parse(data);
    data.API_TOKEN ? console.log(data.API_TOKEN) : process.env.API_TOKEN = Bds_Backend.token_register();
    fs.writeFileSync("./.env.json", JSON.stringify(data));
  }
});

// Prepare Next App
nextApp.prepare().then(() => {
  app.use("/BdsAPI", Bds_Backend.api.BdsRoutes);
  app.get("/BdsAPI/PlatformValid", async (req, res) => {
    res.send(await (await (require("@the-bds-maneger/core/lib/BdsSystemInfo"))()));
  });
  app.post("/BdsAPI/Updates", (req, res) => {
    const { platform } = req.body;
    if (platform) {
      Bds_Backend.BdsSettigs.UpdatePlatform(platform);
      res.send("OK");
    } else res.send("ERROR");
  });
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
