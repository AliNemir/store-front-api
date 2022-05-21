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
const orders_1 = require("../../models/orders");
const order_ = new orders_1.Order();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
describe('Tests for Orders model', () => {
    //index function
    it('test index to be define', () => {
        expect(order_.index).toBeDefined();
    });
    it('test index to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield order_.index(1);
        expect(res.length).toEqual(2);
    }));
    //create function
    it('test create be define', () => {
        expect(order_.create).toBeDefined();
    });
    it('test to create to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const o_ = {
            id: 3,
            status: 'open',
            user_id: 1
        };
        const res = yield order_.create(o_);
        expect(res).toEqual('created');
    }));
    //show function
    it('test show be define', () => {
        expect(order_.show).toBeDefined();
    });
    it('test to show to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield order_.show(1, 1);
        expect(res.id).toEqual(1);
    }));
    //update function
    it('test update be define', () => {
        expect(order_.update).toBeDefined();
    });
    it('test to update to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const o_ = {
            id: 2,
            status: 'complete',
            user_id: 1
        };
        const res = yield order_.update(o_);
        expect(res).toEqual('updated');
    }));
    //delete function
    it('test delete be define', () => {
        expect(order_.delete).toBeDefined();
    });
    it('test delete to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield order_.delete(2, 1);
        expect(res).toEqual('deleted');
    }));
    //add product
    it('test add product be define', () => {
        expect(order_.addProduct).toBeDefined();
    });
    it('test add product to equal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield order_.addProduct(1, 1, 5);
        expect(res).toEqual('added');
    }));
});
