"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ajkshines001@gmail.com',
        pass: 'Bobili001&23',
    }
});
var sendMail = function (Email, body) {
    var mailOptions = {
        from: 'ajkshines001@gmail.com',
        to: Email,
        subject: 'Successfully Signed up',
        html: body
    };
    return transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurred: ', err);
        }
        // console.log('Email sent!!:' + data)
    });
};
exports.default = sendMail;
