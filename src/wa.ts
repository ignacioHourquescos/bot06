import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import { io } from "./server";
import config from "../config";
import detectIntention from "./utils/detect-intention";
import welcomeFlow from "./flows/welcome-flow";

export let qrBase64: string | null = null;
export let status: "ready" | "pending" | "unauthenticated" | "authenticated" =
  "pending";

export const client = new Client({
  authStrategy: new LocalAuth({ clientId: config.sessionName || "my-session" }),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", async (qr) => {
  status = "unauthenticated";
  qrBase64 = await qrcode.toDataURL(qr);

  io.emit("status", status);
  io.emit("qr", qrBase64);
});

client.on("authenticated", (session) => {
  status = "authenticated";
  io.emit("status", status);
  io.emit("session", session);
});

client.on("ready", () => {
  status = "ready";
  io.emit("status", status);
  console.log("Client is ready!");
});

// client.on("message_reaction", (msg) => {
//   console.log(msg);
// });

// client.on("message_ack", (msg) => {
//   console.log(msg);
// });

// client.on("message_create", (msg) => {
//   console.log("MESSAGE CREATE", msg);
// });

client.on("message", (msg) => {
  console.log("ENTRO A FLOW");
  // console.log(JSON.stringify(msg, null, 2));

  const { from, to, body, deviceType } = msg;

  async function handleIncomingMessage(msg: any) {
    if (from == "5491165106333@c.us") {
      try {
        const intentionDetected = await detectIntention(from, msg.body);
        if (intentionDetected) {
          client.sendMessage(from, intentionDetected);
        } else {
          client.sendMessage(from, welcomeFlow());
        }
      } catch (error) {
        console.error("Error detecting intention:", error);
      }
    } else {
      return;
    }
  }

  handleIncomingMessage(msg);
});
