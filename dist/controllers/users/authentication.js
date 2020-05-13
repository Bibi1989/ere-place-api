"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const Auth = async (req: any, res: Response, next: NextFunction) => {
//   let token = req.headers["authorization"];
//   if (token.startsWith("Bearer ")) {
//     // Remove Bearer from string
//     token = token.slice(7, token.length);
//   } else {
//     return res.status(404).json({ error: "You are not authorize, No Bearer" });
//   }
//   // console.log(token);
//   if (!token) {
//     res.status(404).json({ error: "you are not authorise" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };
exports.Auth = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        throw Error("unauthorize user, access denied");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//# sourceMappingURL=authentication.js.map