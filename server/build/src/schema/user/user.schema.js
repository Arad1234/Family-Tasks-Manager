"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = (0, zod_1.object)({
    username: (0, zod_1.string)({ required_error: "name is required!" }),
    password: (0, zod_1.string)({ required_error: "password is required!" }).min(6, "Password too short - should be 6 chars minimum!"),
    confirmPassword: (0, zod_1.string)({
        required_error: "confirmPassword is required!",
    }),
    email: (0, zod_1.string)({
        required_error: "email is required!",
    }).email("not a valid email"),
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
