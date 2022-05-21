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
exports.Product = void 0;
const database_1 = __importDefault(require("../database"));
class Product {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from products;';
                const res = yield conn.query(sql);
                conn.release();
                return res.rows;
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from products where id =($1);';
                const res = yield conn.query(sql, [id]);
                conn.release();
                return res.rows[0];
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'insert into products (name, price, category) values($1,$2,$3)RETURNING *;';
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const res = yield conn.query(sql, [p.name, p.price, p.category]);
                conn.release();
                return 'created';
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    update(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'update products set name=($1), price=($2), category=($3) where id=($4) RETURNING *; ';
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const res = yield conn.query(sql, [p.name, p.price, p.category, p.id]);
                conn.release();
                return 'updated';
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'delete from products where id =($1);';
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const res = yield conn.query(sql, [id]);
                conn.release();
                return 'deleted';
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
}
exports.Product = Product;
