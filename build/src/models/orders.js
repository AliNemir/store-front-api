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
exports.Order = void 0;
const database_1 = __importDefault(require("../database"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var STATUS;
(function (STATUS) {
    STATUS[STATUS["open"] = 0] = "open";
    STATUS[STATUS["closed"] = 1] = "closed";
})(STATUS || (STATUS = {}));
class Order {
    index(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders where user_id=($1);';
                const res = yield conn.query(sql, [id]);
                conn.release();
                return res.rows;
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    show(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const q = 'SELECT * FROM orders where id=($1) and user_id=($2);';
                const res = yield conn.query(q, [id, user_id]);
                conn.release();
                return res.rows[0];
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'insert into orders (status, user_id) values($1,$2)RETURNING *;';
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const res = yield conn.query(sql, [o.status, o.user_id]);
                conn.release();
                return 'created';
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    update(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = 'SELECT user_id FROM orders WHERE id=($1)';
                const id_of_user = yield conn.query(query, [o.id]);
                const user = id_of_user.rows[0];
                if (user.user_id == o.user_id) {
                    const sql = 'update orders set status=($1) where id=($2) RETURNING *; ';
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const res = yield conn.query(sql, [o.status, o.id]);
                    conn.release();
                    return 'updated';
                }
                return 'not allowed';
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    delete(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                let result;
                const conn = yield database_1.default.connect();
                const q = 'SELECT user_id FROM orders where id=($1) and user_id=($2)';
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const id_of_user = yield conn.query(q, [id, user_id]);
                conn.release();
                return 'deleted';
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    addProduct(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'insert into order_products (quantity, order_id, product_id) values($1,$2,$3)RETURNING *;';
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const res = yield conn.query(sql, [quantity, order_id, product_id]);
                conn.release();
                return 'added';
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
}
exports.Order = Order;
