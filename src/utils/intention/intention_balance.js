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
function intentionBalance(from) {
    return __awaiter(this, void 0, void 0, function* () {
        let phoneNumber = extractPhoneNumber(from);
        // phoneNumber = "45523070";
        console.log("NUMERO DE TELEFONO FORMATEADO", phoneNumber);
        // Mapping of TIPO values to corresponding words
        const tipoMapping = {
            ANT: "Anticipo",
            ANN: "Anticipo",
            CPM: "Credito",
            FEA: "Factura",
            FCB: "Factura",
            FEB: "Factura",
            FCN: "Factura",
            CNA: "Crédito",
            CEA: "Crédito",
            CNB: "Crédito",
            CEB: "Crédito",
            CNN: "Crédito",
            BEA: "Debito",
            BEB: "Debito",
            BN: "Debito",
        };
        try {
            const response = yield (0, services_1.get_balance)(phoneNumber);
            console.log("ACA RESPUESTA DE EP DE BALANCE", response);
            // Format the response
            let formattedResponse = response.map((invoice) => {
                const date = new Date(invoice.FECHA);
                const formattedDate = new Intl.DateTimeFormat("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }).format(date);
                const formattedTotal = new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                }).format(invoice.TOTAL);
                const tipoWord = tipoMapping[invoice.TIPO] || invoice.TIPO;
                return `*${tipoWord} ${invoice.NUM}* (${formattedDate})      ${formattedTotal}`;
            });
            // Add line breaks between each item
            formattedResponse = formattedResponse.join("\n").split("\n");
            // Calculate total sum of TOTAL values
            const totalSum = response.reduce((acc, invoice) => acc + invoice.TOTAL, 0);
            const formattedTotalSum = new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
            }).format(totalSum);
            const totalSumNumber = Number(totalSum); // Convert totalSum to a number
            if (totalSumNumber === 0) {
                formattedResponse.push(`*No tiene saldos pendientes*`);
            }
            else {
                formattedResponse.push(`\n *Saldo Total: ${formattedTotalSum}*`);
            }
            return formattedResponse.join("\n");
        }
        catch (error) {
            console.error("Error fetching data for XREF:", error);
            throw error;
        }
    });
}
exports.default = intentionBalance;
