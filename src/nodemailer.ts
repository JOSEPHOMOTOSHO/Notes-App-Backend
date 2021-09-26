const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ajkshines001@gmail.com',
        pass: 'Bobili001&23',
    }
})
const sendMail = (Email:string, body: string) => {
    let mailOptions = {
        from: 'ajkshines001@gmail.com',
        to: Email,
        subject: 'Successfully Signed up',
        html: body
    }
    return transporter.sendMail(mailOptions, (err:any, data:any) => {
        if (err) {
            console.log('Error Occurred: ', err)
        }
        console.log('Email sent!!:' + data)
    })
}
export default sendMail;
