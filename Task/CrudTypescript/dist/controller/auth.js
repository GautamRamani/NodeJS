"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = exports.Health = void 0;
const user_1 = __importDefault(require("../model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Health(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).send({ data: "Health", msg: "Success" });
        }
        catch (error) {
            res.status(400).send({ data: {}, msg: "Error in Health" });
            console.log("Error in Health::");
        }
    });
}
exports.Health = Health;
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        let user = yield user_1.default.findOne({ email: email });
        if (!user) {
            let hashPassword = yield bcrypt_1.default.hash(password, 10);
            user = yield user_1.default.create({
                name,
                email,
                password: hashPassword
            });
            res.status(200).send({ data: {}, success: true, msg: "user register succesfully" });
        }
        else {
            next(new Error('User is not found'));
        }
    });
}
exports.signUp = signUp;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        let isUser = yield user_1.default.findOne({ email: email });
        if (!isUser) {
            res.status(400).send({ data: "email does not exist" });
        }
        else {
            let isPassword = yield bcrypt_1.default.compare(password, isUser.password);
            if (isPassword) {
                let secret = process.env.SECRET;
                let token = jsonwebtoken_1.default.sign({ id: isUser._id }, secret);
                let user = yield user_1.default.findOneAndUpdate({ _id: isUser._id }, { $set: { token: token } });
                let data = {
                    name: user === null || user === void 0 ? void 0 : user.name,
                    email: user === null || user === void 0 ? void 0 : user.email
                };
                res.status(200).send({ data: data, success: true, msg: "user login succesfully" });
                next();
            }
            else {
                res.status(400).send({ data: "password does not match" });
                next();
            }
        }
    });
}
exports.login = login;
