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
const products_1 = require("../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.token;
const product_obj = new products_1.Product();
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield product_obj.index();
            res.status(200).json(result);
        }
        catch (e) {
            res.status(400).json(`${e}`);
        }
    });
}
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield product_obj.show(req.params.id);
            res.status(200).json(result);
        }
        catch (e) {
            res.status(400).json(`${e}`);
        }
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const permession = jsonwebtoken_1.default.verify(token, secret);
        if (permession) {
            try {
                const p = {
                    id: req.params.id,
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.catogery
                };
                const result = yield product_obj.update(p);
                res.status(200).json(result);
            }
            catch (e) {
                res.status(400).json(`${e}`);
            }
        }
        else
            res.send('Not allowed login first!!');
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const permession = jsonwebtoken_1.default.verify(token, secret);
        if (permession) {
            try {
                const p = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.catogery
                };
                const result = yield product_obj.create(p);
                res.status(200).json(result);
            }
            catch (e) {
                res.status(400).json(`${e}`);
            }
        }
        else
            res.send('Not allowed login first!!');
    });
}
function delete_(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const permession = jsonwebtoken_1.default.verify(token, secret);
        if (permession) {
            try {
                const result = yield product_obj.delete(req.params.id);
                res.status(200).json(result);
            }
            catch (e) {
                res.status(400).json(`${e}`);
            }
        }
        else
            res.send('Not allowed login first!!');
    });
}
function mainRoutes(app) {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.patch('/products/:id', update);
    app.delete('/products/:id', delete_);
}
exports.default = mainRoutes;
