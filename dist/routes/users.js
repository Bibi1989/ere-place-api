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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const register_controller_1 = require("../controllers/users/register_controller");
const login_controller_1 = require("../controllers/users/login_controller");
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield register_controller_1.register(req, res);
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield login_controller_1.login(req, res);
}));
exports.default = router;
//# sourceMappingURL=users.js.map