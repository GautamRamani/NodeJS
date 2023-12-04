"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const user_1 = require("../controller/user");
const authorization_1 = require("../middleware/authorization");
const router = express_1.default.Router();
//health
router.get("/", auth_1.Health);
//auth
router.post("/register", auth_1.signUp);
router.post("/login", auth_1.login);
//user page
router.post("/user", authorization_1.authMiddleware, user_1.user);
exports.default = router;
