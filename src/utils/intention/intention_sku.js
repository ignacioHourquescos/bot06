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
function extractCodeFromMessage(message) {
    const regex = /SKU\s*\.?\s*(\w+)/i;
    const matches = message.match(regex);
    return matches ? matches[1] : null;
}
function intentionSku(message) {
    return __awaiter(this, void 0, void 0, function* () {
        let code = extractCodeFromMessage(message);
        try {
            const response = yield (0, services_1.get_sku)(code);
            let parsedResponse = "";
            for (let item of response) {
                parsedResponse +=
                    `${item.s > 10 ? "🟢" : "🟡"}` +
                        ` *${item.id} ⇒ $${item.p}*` +
                        `\n       _${item.d}_ \n`;
            }
            return parsedResponse;
        }
        catch (error) {
            console.error("Error fetching data for SKU:", error);
            throw error;
        }
    });
}
exports.default = intentionSku;
