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
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, phone, is_seller, email, password, image_url, } = req.body;
    const error = validations_1.registerValidation(first_name, last_name, phone, is_seller, email, password);
    if (error.first_name)
        return res.status(404).json({ error: error.first_name });
    if (error.last_name)
        return res.status(404).json({ error: error.last_name });
    if (error.phone)
        return res.status(404).json({ error: error.phone });
    if (error.is_seller)
        return res.status(404).json({ error: error.is_seller });
    if (error.email)
        return res.status(404).json({ error: error.email });
    if (error.password)
        return res.status(404).json({ error: error.password });
    let [user] = yield pg_connect_1.db.query(pg_connect_1.sql `SELECT email FROM users WHERE email=${email}`);
    if (user) {
        return res.status(404).json({ error: "User exist" });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const bool = is_seller === "seller" ? true : false;
    try {
        user = yield pg_connect_1.db.query(pg_connect_1.sql `INSERT INTO users(first_name, last_name, phone, is_seller, email, password, user_image) VALUES (${first_name}, ${last_name}, ${phone}, ${bool}, ${email}, ${hashedPassword}, ${image_url}) returning *`);
        const token = yield jsonwebtoken_1.default.sign({ user }, process.env.SECRET_KEY);
        res.header("authorization", token);
        res.json({ data: user, token });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
    // cloudinary.v2.uploader.upload(req.files.image.path, async (result: any) => {
    //   console.log(result.url);
    // });
});
//# sourceMappingURL=register_controller.js.map