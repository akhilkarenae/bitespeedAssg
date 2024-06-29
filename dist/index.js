"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./db/connection"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
dotenv_1.default.config({ path: "./.env.dev" });
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
(0, connection_1.default)();
app.use(contact_routes_1.default);
app.get("/test", (req, res) => {
    res.status(200).send({ message: "hi" });
});
app.listen(port, () => {
    console.log('server running on ' + port);
});
