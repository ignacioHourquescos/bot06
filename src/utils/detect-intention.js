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
const intention_balance_1 = __importDefault(require("./intention/intention_balance"));
const intention_order_1 = __importDefault(require("./intention/intention_order"));
const intention_sku_1 = __importDefault(require("./intention/intention_sku"));
const intention_xref_1 = __importDefault(require("./intention/intention_xref"));
function getIntentionType(message) {
    if (message.includes("SKU"))
        return "SKU";
    if (message.includes("XREF"))
        return "XREF";
    if (message.includes("SALDO"))
        return "SALDO";
    if (message.includes("PEDIDO"))
        return "PEDIDO";
    return "UNKNOWN";
}
function detectIntention(from, message) {
    return __awaiter(this, void 0, void 0, function* () {
        message = message.toUpperCase();
        const intentionType = getIntentionType(message);
        switch (intentionType) {
            case "SKU":
                return yield (0, intention_sku_1.default)(message);
            case "XREF":
                return yield (0, intention_xref_1.default)(message);
            case "SALDO":
                return yield (0, intention_balance_1.default)(from);
            case "PEDIDO":
                return yield (0, intention_order_1.default)(from);
            default:
                return null;
        }
    });
}
exports.default = detectIntention;
