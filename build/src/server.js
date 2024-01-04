"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
exports.io = new socket_io_1.Server(exports.server, { cors: { origin: "*" } });
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
