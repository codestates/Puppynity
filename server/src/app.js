"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var helmet = require('helmet');
var morgan = require('morgan');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
// const { sequelize } = require('./models');
var indexRouter = require('./routes/index');
dotenv.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// index 라우팅
app.use('/', indexRouter);
app.get('/', function (req, res) {
    res.send('Hello Puppynity Fuck typescript');
});
exports.default = app;
