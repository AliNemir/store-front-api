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
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.token;
const api = (0, supertest_1.default)(index_1.default);
const user_ = new users_1.User();
const order_ = new orders_1.Order();
const product_ = new products_1.Product();
let token;
let permession;
describe('orders handlars api test', () => {
    it('orders index route', () => __awaiter(void 0, void 0, void 0, function* () {
        const u = {
            id: 1,
            first_name: 'Ali',
            last_name: 'Nemir',
            password: 'Password123'
        };
        token = yield user_.create(u);
        permession = jsonwebtoken_1.default.sign({ user: token }, secret);
        const res = yield api.get('/users/1/orders').set({ token: permession });
        expect(res.status).toBe(200);
    }));
    it('orders show route', () => __awaiter(void 0, void 0, void 0, function* () {
        const o = {
            id: 1,
            status: 'complete',
            user_id: 1
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res1 = yield order_.create(o);
        const res = yield api.get('/users/1/orders/1').set({ token: permession });
        expect(res.status).toBe(200);
    }));
    //status
    it('orders create route', () => __awaiter(void 0, void 0, void 0, function* () {
        const d = {
            status: 'open'
        };
        const res = yield api.post('/users/1/orders').send(d).set({ token: permession });
        expect(res.status).toBe(200);
    }));
    //status
    it('orders update route', () => __awaiter(void 0, void 0, void 0, function* () {
        const d = {
            status: 'compete'
        };
        const res = yield api.patch('/users/1/orders/1').send(d).set({ token: permession });
        expect(res.status).toBe(200);
    }));
    //product_id, quantity
    it('orders add product route test', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = {
            id: 1,
            name: 'laptop',
            price: 5000,
            category: 'none'
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res1 = yield product_.create(p);
        const d = {
            product_id: 1,
            quantity: 5
        };
        const res = yield api.post('/users/1/orders/1/products').send(d).set({ token: permession });
        expect(res.status).toBe(200);
    }));
    it('oreders delete route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api.delete('/users/1/orders/1').set({ token: permession });
        expect(res.status).toBe(200);
    }));
});
