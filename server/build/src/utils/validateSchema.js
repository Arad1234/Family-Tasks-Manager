"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateSchema = (schema, data, next) => {
    console.log(data);
    try {
        schema.parse(data);
        next();
    }
    catch (error) {
        next(error); // This will call the "error" event listener on the server.
    }
};
exports.default = validateSchema;
