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
function extractXREFCodeFromMessage(message) {
    const regex = /XREF\s*\.?\s*(\w+)/i;
    const matches = message.match(regex);
    return matches ? matches[1] : null;
}
function intentionXref(message) {
    return __awaiter(this, void 0, void 0, function* () {
        let code = extractXREFCodeFromMessage(message);
        try {
            const response = yield (0, services_1.get_xref)(code);
            console.log(response);
            const data = response.results;
            const suggestions = response.suggestions;
            let formattedResponse = "";
            if (response.results.length > 0) {
                formattedResponse += `Te paso el listado de equivalencias:\n\n`;
                for (let item of data) {
                    for (let key in item) {
                        formattedResponse += `*${key.toUpperCase()}:* ${item[key]}\n`;
                    }
                }
            }
            else if (suggestions.length > 0) {
                formattedResponse += `No encontré equivalencias para el articulo.\nTe paso un listado de articulos similares:\n\n`;
                for (let suggestion of suggestions) {
                    formattedResponse += `*${suggestion}*\n`;
                }
            }
            else {
                formattedResponse = `No encontre ningúna equivalencia, ni articulo similar al que me pasaste.`;
            }
            return formattedResponse;
        }
        catch (error) {
            console.error("Error fetching data for XREF:", error);
            throw error;
        }
    });
}
exports.default = intentionXref;
