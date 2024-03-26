"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const wa_1 = require("./wa");
const routeHandlers_1 = require("./routeHandlers");
const config_1 = require("./config/config");
server_1.io.on("connection", () => {
    server_1.io.emit("status", wa_1.status);
});
server_1.app.get("/", routeHandlers_1.indexRouteHandler);
server_1.app.post("/send", routeHandlers_1.sendRouteHandler);
server_1.app.post("/broadcast", routeHandlers_1.broadCastRouteHandler);
// listen on port 3000
server_1.server.listen(config_1.config.server.port, () => {
    wa_1.client.initialize();
    console.log("Server listening on port 3000");
});
