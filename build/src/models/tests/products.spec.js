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
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
const product_ = new products_1.Product();
const p = {
    id: 2,
    name: 'test',
    price: 6,
    category: '5'
};
describe('Tests for Product model', () => {
    //index function
    it('test index be define', () => {
        expect(product_.index).toBeDefined();
    });
    it('test index to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield product_.index();
        expect(res.length).toEqual(1);
    }));
    //create function
    it('test create be define', () => {
        expect(product_.create).toBeDefined();
    });
    it('test create to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield product_.create(p);
        expect(res).toEqual('created');
    }));
    //show function
    it('test show be define', () => {
        expect(product_.show).toBeDefined();
    });
    it('test show to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield product_.show(1);
        expect(res).toEqual({ id: 1, name: 'marwan', price: 20, category: 'marwan' });
    }));
    //update function
    it('test update be define', () => {
        expect(product_.update).toBeDefined();
    });
    it('test update to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const p_ = {
            id: 2,
            name: '100',
            price: 6,
            category: '5'
        };
        const res = yield product_.update(p_);
        expect(res).toEqual('updated');
    }));
    //delete function
    it('test delete be define', () => {
        expect(product_.delete).toBeDefined();
    });
    it('test delete to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield product_.delete(2);
        expect(res).toEqual('deleted');
    }));
});
