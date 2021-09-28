"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authorization(req, res, next) {
    if (!req.user) {
        res.redirect("/");
    }
    else {
        next();
    }
}
exports.default = authorization;
//# sourceMappingURL=authorization-passport.js.map