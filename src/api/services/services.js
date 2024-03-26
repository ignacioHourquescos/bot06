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
exports.get_client_number_by_phone_number = exports.get_balance = exports.get_sku = exports.get_xref = void 0;
const axios_instance_1 = __importDefault(require("../axios-instance"));
const axios_1 = __importDefault(require("axios"));
const get_xref = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_instance_1.default.get(`https://renovaapi-heroku-20.herokuapp.com/bot/xref?article=${code}`);
    // console.log("AXIOS", response.data);
    return response.data;
});
exports.get_xref = get_xref;
const get_sku = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://renovaapi-heroku-20.herokuapp.com/bot/getSpecificArticle?article=${code}`);
    return response.data;
});
exports.get_sku = get_sku;
const get_balance = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://renovaapi-heroku-20.herokuapp.com/bot/getBalance?phoneNumber=${phoneNumber}`);
    return response.data;
});
exports.get_balance = get_balance;
const get_client_number_by_phone_number = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://renovaapi-heroku-20.herokuapp.com/bot/getClientNumberByPhoneNumber?phoneNumber=${phoneNumber}`);
    return response.data;
});
exports.get_client_number_by_phone_number = get_client_number_by_phone_number;
