"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let handler = (error, req, res, next) => {
    const statusCode = 404 || 500 || error.status;
    const message = error.message || "Something went wrong";
    res.send({
        message,
        status: "error",
        success: false,
        statusCode
    });
};
exports.default = handler;
