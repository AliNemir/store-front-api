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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const users_1 = require("../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.token;
const user_ = new users_1.User();
const api = (0, supertest_1.default)(index_1.default);
let permession, token;
describe('products handlars api test', () => {
    it('products index route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api.get('/products');
        expect(res.status).toBe(200);
    }));
    it('products show route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api.get('/products/1');
        expect(res.status).toBe(200);
    }));
    //name, price, catogery
    it('products create route', () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield user_.show(1);
        permession = jsonwebtoken_1.default.sign({ user: token }, secret);
        const d = {
            name: 'laptop',
            price: 5000,
            catogery: 'none'
        };
        const res = yield api.post('/products').send(d).set({ token: permession });
        expect(res.status).toBe(200);
    }));
    //name, price category
    it('products update route', () => __awaiter(void 0, void 0, void 0, function* () {
        const d = {
            name: 'laptop',
            price: 4000,
            catogery: 'laptops'
        };
        const res = yield api.patch('/products/1').send(d).set({ token: permession });
        expect(res.status).toBe(200);
    }));
    it('products delete route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api.delete('/products/2').set({ token: permession });
        expect(res.status).toBe(200);
    }));
});
