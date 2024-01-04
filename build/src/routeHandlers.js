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
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadCastRouteHandler = exports.sendRouteHandler = exports.indexRouteHandler = void 0;
const wa_1 = require("./wa");
const indexRouteHandler = (req, res) => {
    res.sendFile(__dirname + "/index.html");
};
exports.indexRouteHandler = indexRouteHandler;
const sendRouteHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, text } = req.body;
    if (to && text) {
        yield wa_1.client.sendMessage(`${to}@s.whatsapp.net`, text);
        res.status(200).send("Message sent");
    }
    else {
        res.status(400).send("Invalid message");
    }
});
exports.sendRouteHandler = sendRouteHandler;
const broadCastRouteHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, text } = req.body;
    if (to && text) {
        for (const contact of to) {
            yield wa_1.client.sendMessage(`${contact}@s.whatsapp.net`, text);
        }
        res.status(200).send("Message sent");
    }
    else {
        res.status(400).send("Invalid message");
    }
});
exports.broadCastRouteHandler = broadCastRouteHandler;
