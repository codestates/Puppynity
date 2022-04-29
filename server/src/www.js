"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var app_1 = __importDefault(require("./app"));
var port = Number(process.env.port) || 3000;
var server = (0, http_1.createServer)(app_1.default);
server.listen(port, function () {
    console.log("".concat(port, "\uD3EC\uD2B8 \uC11C\uBC84 \uB300\uAE30 \uC911!"));
});
exports.default = server;
