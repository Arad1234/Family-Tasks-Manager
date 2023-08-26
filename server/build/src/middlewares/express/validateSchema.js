"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../utils/constants");
// This function validates the zod schema whenever the user want to access/change/add a resource.
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(constants_1.BAD_REQUEST).json({ error: error });
    }
};
exports.default = validateSchema;
