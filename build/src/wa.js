"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.status = exports.qrBase64 = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_1 = __importDefault(require("qrcode"));
const server_1 = require("./server");
const config_1 = __importDefault(require("../config"));
exports.qrBase64 = null;
exports.status = "pending";
exports.client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth({ clientId: config_1.default.sessionName || "my-session" }),
    puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});
exports.client.on("qr", (qr) => __awaiter(void 0, void 0, void 0, function* () {
    exports.status = "unauthenticated";
    exports.qrBase64 = yield qrcode_1.default.toDataURL(qr);
    server_1.io.emit("status", exports.status);
    server_1.io.emit("qr", exports.qrBase64);
}));
exports.client.on("authenticated", (session) => {
    exports.status = "authenticated";
    server_1.io.emit("status", exports.status);
    server_1.io.emit("session", session);
});
exports.client.on("ready", () => {
    exports.status = "ready";
    server_1.io.emit("status", exports.status);
    console.log("Client is ready!");
});
exports.client.on("message", (msg) => {
    console.log("HOLA");
    console.log(JSON.stringify(msg, null, 2));
    // if (msg.id.fromMe) return;
    if (msg.body === "!ping") {
        msg.reply("pong!");
    }
    else {
        msg.reply("Hello!");
    }
});
