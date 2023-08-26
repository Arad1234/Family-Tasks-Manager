"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fn) => {
    return (req, res, next) => {
        console.log("tttttt");
        fn(req, res, next).catch((err) => next(err));
    };
};
exports.catchAsync = catchAsync;
