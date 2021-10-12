"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Function to authorization the routes with password
function authorization(req, res, next) {
    if (!req.user) {
        res.redirect('/users');
    }
    else {
        next();
    }
}
//muaze
exports.default = authorization;
