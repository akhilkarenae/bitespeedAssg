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
const sequelize_1 = require("sequelize");
const contacts_models_1 = __importDefault(require("../db/models/contacts.models"));
class ContactRepository {
    static findContacts(email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield contacts_models_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [{ email: email !== null && email !== void 0 ? email : '' }, { phoneNumber: phoneNumber !== null && phoneNumber !== void 0 ? phoneNumber : '' }]
                    }
                });
                return contacts;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static createContact(contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = yield contacts_models_1.default.create(contactData);
                return newContact;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static updateContactLinkedPrecedence(contactId, linkedId, linkedPrecedence) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield contacts_models_1.default.update({ linkedId, linkedPrecedence }, {
                where: { id: contactId }
            });
        });
    }
    static updateContactLinkedId(linkedId, newLinkedId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield contacts_models_1.default.update({ linkedId: newLinkedId }, { where: { linkedId: linkedId } });
        });
    }
    static getAllContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield contacts_models_1.default.findAll();
        });
    }
}
exports.default = ContactRepository;
