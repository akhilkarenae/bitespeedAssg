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
const contact_services_1 = __importDefault(require("../services/contact.services"));
class ContactControllers {
    static customersIdentity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, phoneNumber } = req.body;
            try {
                const contact = yield contact_services_1.default.identifyCustomer(email, phoneNumber);
                return res.status(200).json({ contact });
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal error occured or test case failed" });
            }
        });
    }
    static getAllContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield contact_services_1.default.allContacts();
                return res.status(200).json(contacts);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: err });
            }
        });
    }
}
exports.default = ContactControllers;
