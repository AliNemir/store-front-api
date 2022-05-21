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
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.token;
const order_obj = new orders_1.Order();
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.token;
            const permession = jsonwebtoken_1.default.verify(token, secret);
            if (permession) {
                try {
                    const result = yield order_obj.index(parseInt(req.params.user_id));
                    res.json(result);
                }
                catch (e) {
                    res.status(400).json(`${e}`);
                }
            }
            else
                res.send('Not allowed login first!!');
        }
        catch (e) {
            res.status(400).send(`${e}`);
        }
    });
}
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.token;
            const permession = jsonwebtoken_1.default.verify(token, secret);
            if (permession) {
                try {
                    const result = yield order_obj.show(parseInt(req.params.order_id), parseInt(req.params.user_id));
                    res.json(result);
                }
                catch (e) {
                    res.status(400).json(`${e}`);
                }
            }
            else
                res.send('Not allowed login first!!');
        }
        catch (e) {
            res.status(400).send(`${e}`);
        }
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const permession = jsonwebtoken_1.default.verify(token, secret);
        if (permession) {
            try {
                const o = {
                    id: parseInt(req.params.order_id),
                    status: req.body.status,
                    user_id: parseInt(req.params.user_id)
                };
                const result = yield order_obj.update(o);
                res.json(result);
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
                const o = {
                    status: req.body.status,
                    user_id: parseInt(req.params.user_id)
                };
                const result = yield order_obj.create(o);
                res.json(result);
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
                const result = yield order_obj.delete(parseInt(req.params.order_id), parseInt(req.params.user_id));
                res.json(result);
            }
            catch (e) {
                res.status(400).json(`${e}`);
            }
        }
        else
            res.send('Not allowed login first!!');
    });
}
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order_id = parseInt(req.params.order_id);
            const product_id = parseInt(req.body.product_id);
            const quantity = parseInt(req.body.quantity);
            const token = req.headers.token;
            const permession = jsonwebtoken_1.default.verify(token, secret);
            if (permession) {
                const result = yield order_obj.addProduct(order_id, product_id, quantity);
                res.json(result);
            }
            else
                res.send('Not allowed login first!!');
        }
        catch (e) {
            res.status(400).json(`${e}`);
        }
    });
}
function mainRoutes(app) {
    app.get('/users/:user_id/orders', index);
    app.get('/users/:user_id/orders/:order_id', show);
    app.post('/users/:user_id/orders', create);
    app.post('/users/:user_id/orders/:order_id/products', addProduct);
    app.patch('/users/:user_id/orders/:order_id', update);
    app.delete('/users/:user_id/orders/:order_id', delete_);
}
exports.default = mainRoutes;
