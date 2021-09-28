"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authorization(req, res, next) {
    const jwtToken = req.headers.token || req.cookies.token;
    console.log(jwtToken);
    if (!jwtToken) {
        return res.status(401).json({
            status: '401 Not Authorized',
            message: "Please login to have access"
        });
    }
    try {
        const authorization = jsonwebtoken_1.default.verify(jwtToken.toString(), process.env.ACCESS_TOKEN_SECRET);
        req.user = authorization.user_id;
        next();
    }
    catch (err) {
        res.status(401).json({
            status: "Failed",
            message: "Invalid token"
        });
    }
}
exports.default = authorization;
//# sourceMappingURL=authorization.js.map