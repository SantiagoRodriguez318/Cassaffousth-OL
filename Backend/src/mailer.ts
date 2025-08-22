import nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(
    {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports,
    auth:{
            user: 'SantiagoMKiller123@gmail.com', // generated ethereal user
            pass: 'jupl ugbv finr aqzm', // generated ethereal password
        },
    }
);

transporter.verify().then(() => {
    console.log("Ready to send emails");
});