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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongodb_1 = require("./connections/mongodb");
const index_1 = __importDefault(require("./routes/index"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        Promise.all([
            this.connectDatabase(),
            this.initializeMiddleware(),
            this.initializeController(),
            this.initializeErrorHandling(),
        ]).then(() => {
            this.listen();
        });
    }
    connectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, mongodb_1.init)();
        });
    }
    initializeMiddleware() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(body_parser_1.default.json({ limit: "50MB" })),
                this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, cors_1.default)()),
                this.app.use((0, morgan_1.default)("tiny"));
        });
    }
    initializeController() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use("/", index_1.default);
        });
    }
    initializeErrorHandling() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(errorHandler_1.default);
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            let server = http_1.default.createServer(this.app);
            if (process.env.KEY || process.env.CERT) {
                const HTTP_KEY = process.env.KEY;
                const HTTP_CERT = process.env.CERT;
                const KEY = fs_1.default.readFileSync(HTTP_KEY);
                const CERT = fs_1.default.readFileSync(HTTP_CERT);
                server = https_1.default.createServer({ key: KEY, cert: CERT }, this.app);
            }
            server.listen(3000, () => {
                console.log(`server listening on 3000`);
            });
        });
    }
}
try {
    new App();
}
catch (error) {
    console.log("Error in project startup", error.message);
}
exports.default = App;
