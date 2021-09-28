"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
function authorization(req, res, next) {
    if (!req.user) {
        res.redirect("/");
    }
    else {
        next();
    }
}
exports.authorization = authorization;
//# sourceMappingURL=authorization-passport.js.map