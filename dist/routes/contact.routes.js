"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controllers_1 = __importDefault(require("../controllers/contact.controllers"));
const contactRouter = (0, express_1.Router)();
contactRouter.post('/identify', contact_controllers_1.default.customersIdentity);
contactRouter.get('/contacts', contact_controllers_1.default.getAllContacts);
exports.default = contactRouter;
