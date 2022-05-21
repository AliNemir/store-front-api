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
exports.User = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { extra, round } = process.env;
class User {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from users;';
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
                const sql = 'select * from users where id =($1);';
                const res = yield conn.query(sql, [id]);
                conn.release();
                return res.rows[0];
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = bcrypt_1.default.hashSync(u.password + extra, parseInt(round));
            try {
                const conn = yield database_1.default.connect();
                const sql = 'insert into users (first_name, last_name, password) values($1,$2,$3)RETURNING*;';
                const res = yield conn.query(sql, [u.first_name, u.last_name, hash]);
                conn.release();
                return res.rows[0];
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'update users set first_name=($1), last_name=($2) where id=($3)RETURNING*; ';
                const res = yield conn.query(sql, [u.first_name, u.last_name, u.id]);
                conn.release();
                return res.rows[0];
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
                const sql = 'delete from users where id =($1) ;';
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
    auth(username, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from users where first_name=($1);';
                const res = yield conn.query(sql, [username]);
                if (res.rows.length) {
                    const isExist = bcrypt_1.default.compareSync(pass + extra, res.rows[0].password);
                    if (isExist)
                        return 'succeed';
                }
                return 'faild';
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
}
exports.User = User;
