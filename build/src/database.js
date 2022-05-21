"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { db_host, db_user, db_password, db_name, env, db_name_test } = process.env;
let db;
if (env == 'test') {
    db = db_name_test;
}
else {
    db = db_name;
}
const Client = new pg_1.Pool({
    host: db_host,
    database: db,
    user: db_user,
    password: db_password
});
exports.default = Client;
