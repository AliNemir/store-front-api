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
const users_1 = require("../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.token;
const user_ = new users_1.User();
let token;
describe('Tests for User model', () => {
    //index function
    it('test index to be define', () => {
        expect(user_.index).toBeDefined();
    });
    it('test index to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_.index();
        expect(res.length).toEqual(1);
    }));
    //create function
    it('test create to be define', () => {
        expect(user_.create).toBeDefined();
    });
    it('test create to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const u = {
            id: 3,
            first_name: '21',
            last_name: '50',
            password: 'marwan'
        };
        const res = yield user_.create(u);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        token = jsonwebtoken_1.default.sign({ user: res }, secret);
        expect(res.first_name).toEqual('21');
    }));
    //show function
    it('test show to be define', () => {
        expect(user_.show).toBeDefined();
    });
    it('test show to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_.show(1);
        expect(res.id).toEqual(1);
    }));
    //update function
    it('test update to define', () => {
        expect(user_.update).toBeDefined();
    });
    it('test update to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const u = {
            id: 1,
            first_name: 'Ali',
            last_name: 'Nemir',
            password: 'password123'
        };
        const res = yield user_.update(u);
        expect(res.first_name).toEqual('Ali');
    }));
    //auth function
    it('test auth to define', () => {
        expect(user_.auth).toBeDefined();
    });
    it('test auth to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const u = {
            id: 3,
            first_name: 'noone',
            last_name: 'nowhere',
            password: 'nothing'
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res1 = yield user_.create(u);
        const res = yield user_.auth('noone', 'nothing');
        expect(res).toEqual('succeed');
    }));
    //delete function
    it('test delete to be define', () => {
        expect(user_.delete).toBeDefined();
    });
    it('test delete to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_.delete(2);
        expect(res).toEqual('deleted');
    }));
});
