"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constants_1 = require("../../utils/constants");
const errorHandler = (error, _req, res, _next) => {
    let errorMessage;
    if (error.message.includes("11000")) {
        errorMessage = "Email already exists!";
    }
    else {
        errorMessage = error.message;
    }
    res.status(constants_1.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
};
exports.errorHandler = errorHandler;
