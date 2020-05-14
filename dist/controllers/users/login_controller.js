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
const pg_connect_1 = require("../../models/pg-connect");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validations_1 = require("../../utils/validations");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const error = validations_1.loginValidation(email, password);
    if (error.email)
        return res.status(404).json({ error: error.email });
    if (error.password)
        return res.status(404).json({ error: error.password });
    let [user] = yield pg_connect_1.db.query(pg_connect_1.sql `SELECT * FROM users WHERE email=${email}`);
    if (!user)
        return res.status(404).json({ error: "User have not register" });
    try {
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword)
            return res.status(404).json({ error: "Password is invalid" });
        const token = yield jsonwebtoken_1.default.sign({ user }, process.env.SECRET_KEY);
        res.header("authorization", token);
        res.json({ data: user, token });
        return;
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
//# sourceMappingURL=login_controller.js.map