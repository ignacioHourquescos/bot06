import { RequestHandler } from "express";
import { client } from "./wa";

export const indexRouteHandler: RequestHandler = (req, res) => {
  res.sendFile(__dirname + "/index.html");
};

export const sendRouteHandler: RequestHandler = async (req, res) => {
  const { to, text } = req.body;

  if (to && text) {
    await client.sendMessage(`${to}@s.whatsapp.net`, text);
    res.status(200).send("Message sent");
  } else {
    res.status(400).send("Invalid message");
  }
};

export const broadCastRouteHandler: RequestHandler = async (req, res) => {
  const { to, text } = req.body;
  console.log("to", to, "text", text);
  if (to && text) {
    for (const contact of to) {
      // await client.sendMessage(`${contact}`, text);
      await client.sendMessage("+5491165106333@c.us", text);
    }
    res.status(200).send("Message sent");
  } else {
    res.status(400).send("Invalid message");
  }
};
