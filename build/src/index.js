"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./handlars/users"));
const orders_1 = __importDefault(require("./handlars/orders"));
const products_1 = __importDefault(require("./handlars/products"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//dotenv configrations
dotenv_1.default.config();
//declaration port for server
const port = process.env.port;
//initial the app of the server
const app = (0, express_1.default)();
//usig middel ware cors and body parser
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//listen to the port to run the server
app.listen(port, () => {
    console.log(`server running on port... ${port}`);
});
//run modules of the project
(0, users_1.default)(app);
(0, orders_1.default)(app);
(0, products_1.default)(app);
exports.default = app;
