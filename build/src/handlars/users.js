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
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.token;
const user_obj = new users_1.User();
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.token;
            const permession = jsonwebtoken_1.default.verify(token, secret);
            if (permession) {
                try {
                    const result = yield user_obj.index();
                    res.status(200).json(result);
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
                    const result = yield user_obj.show(parseInt(req.params.id));
                    res.status(200).json(result);
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
        try {
            const token = req.headers.token;
            const permession = jsonwebtoken_1.default.verify(token, secret);
            if (permession) {
                try {
                    const u = {
                        id: req.params.id,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        password: ''
                    };
                    const result = yield user_obj.update(u);
                    const newToken = jsonwebtoken_1.default.sign({ user: result }, secret);
                    res.status(200).json(newToken);
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
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hash = bcrypt_1.default.hashSync(req.body.password + process.env.extra, parseInt(process.env.round));
            const u = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: hash
            };
            const result = yield user_obj.create(u);
            const token = jsonwebtoken_1.default.sign({ user: result }, secret);
            res.status(200).json(token);
        }
        catch (e) {
            res.status(400).json(`${e}`);
        }
    });
}
function delete_(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const permession = jsonwebtoken_1.default.verify(token, secret);
        if (permession) {
            try {
                const result = yield user_obj.delete(parseInt(req.params.id));
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
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const result = yield user_obj.auth(username, password);
            if (result != null)
                res.status(200).send('succeed');
            else
                res.status(400).send('faild');
        }
        catch (e) {
            res.status(400).json(`${e}`);
        }
    });
}
function get_token(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield user_obj.show(parseInt(req.params.id));
            const token = jsonwebtoken_1.default.sign({ user: result }, secret);
            res.status(200).json(token);
        }
        catch (e) {
            res.status(400).json(`${e}`);
        }
    });
}
function mainRoutes(app) {
    app.post('/login', login);
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.get('/users/:id/get_token', get_token);
    app.patch('/users/:id', update);
    app.delete('/users/:id', delete_);
}
exports.default = mainRoutes;
