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
const services_1 = require("../../api/services/services");
function extractPhoneNumber(number) {
    const regex = /(\d{10})@/;
    const matches = number.match(regex);
    return matches ? matches[1] : null;
}
function intentionOrder(from) {
    return __awaiter(this, void 0, void 0, function* () {
        let phoneNumber = extractPhoneNumber(from);
        console.log("NUMERO DE TELEFONO FORMATEADO", phoneNumber);
        try {
            const response = yield (0, services_1.get_client_number_by_phone_number)(phoneNumber);
            console.log("ACA RESPUESTA DE EP DE BALANCE", response);
            const clientNumber = `${response.NUM_CLIENTE}`;
            const encodedclientNumber = encodeURIComponent(clientNumber);
            const clientName = `${response.RAZON}`;
            const encodedClientName = encodeURIComponent(clientName);
            const whatsappUrl = `Entra en este enlace para ingresar tu pedido:\n https://renova-pedidos-bot.vercel.app//NewOrderClient?clientNumber=${encodedclientNumber}&clientName=${encodedClientName}`;
            return whatsappUrl;
        }
        catch (error) {
            console.error("Error fetching data for XREF:", error);
            throw error;
        }
    });
}
exports.default = intentionOrder;
