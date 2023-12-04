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
exports.init = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url;
            if (process.env.NODE_ENV == 'dev') {
                url = process.env.MONGO_URI;
            }
            else if (process.env.NODE_ENV == 'prod') {
                url = process.env.MONGO_URI;
            }
            else {
                url = process.env.MONGO_URI;
            }
            console.log(url);
            yield (0, mongoose_1.connect)(`${url}`, {
                useUnifiedTopology: true
            });
            console.log("MongoDB initialized");
        }
        catch (error) {
            console.log("Error connecting to database::");
        }
    });
}
exports.init = init;
