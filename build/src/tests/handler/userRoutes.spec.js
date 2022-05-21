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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const user_ = new users_1.User();
const api = (0, supertest_1.default)(index_1.default);
let token;
describe('users handlars api test', () => {
    it('users index route', () => __awaiter(void 0, void 0, void 0, function* () {
        const u = {
            id: 1,
            first_name: 'Ali',
            last_name: 'Nemir',
            password: 'password123'
        };
        token = jsonwebtoken_1.default.sign({ user: u }, secret);
        const res = yield api.get('/users').set({ token: token });
        expect(res.status).toBe(200);
    }));
    it('users show route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api.get('/users/1').set({ token: token });
        expect(res.status).toBe(200);
    }));
    it('users create route', () => __awaiter(void 0, void 0, void 0, function* () {
        const d = {
            first_name: 'Ali',
            last_name: 'Nemir',
            password: 'password123'
        };
        const res = yield api.post('/users').send(d);
        token = jsonwebtoken_1.default.sign({ user: res }, secret);
        expect(res.status).toBe(200);
    }));
    it('users update route', () => __awaiter(void 0, void 0, void 0, function* () {
        const d = {
            first_name: 'Ali',
            last_name: 'Essam'
        };
        const res = yield api.patch('/users/1').send(d).set({ token: token });
        expect(res.status).toBe(200);
    }));
    it('users login route', () => __awaiter(void 0, void 0, void 0, function* () {
        const d = {
            token: token
        };
        const res = yield api.post('/login').set(d);
        expect(res.status).toBe(200);
    }));
    it('users get token route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api.get('/users/2/get_token').set({ token: token });
        expect(res.status).toBe(200);
    }));
    it('users delete route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api.delete('/users/2').set({ token: token });
        expect(res.status).toBe(200);
    }));
});
