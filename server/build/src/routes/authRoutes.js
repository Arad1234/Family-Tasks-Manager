"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const validateSchema_1 = __importDefault(require("../middlewares/express/validateSchema"));
const user_schema_1 = require("../schema/user/user.schema");
const router = express_1.default.Router();
router.post("/login", auth_controllers_1.loginUserHandler);
router.post("/register", (0, validateSchema_1.default)(user_schema_1.userValidationSchema), auth_controllers_1.createUserHandler);
router.post("/logout", auth_controllers_1.logoutUserHandler);
exports.default = router;
