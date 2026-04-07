const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        let transporter;
        
        if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
            transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE || 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
        } else {
            // Automatically generate a test ethereal account for development
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, 
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        }

        const mailOptions = {
            from: '"FinTrack Support" <support@fintrack.com>',
            to: options.email,
            subject: options.subject,
            html: options.html || `<p>${options.message}</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent! Message ID:", info.messageId);
        
        if (!process.env.EMAIL_USERNAME) {
            console.log("Preview your email here: %s", nodemailer.getTestMessageUrl(info));
        }
        
        return true;
    } catch (error) {
        console.error("Error sending email: ", error);
        return false;
    }
};

module.exports = sendEmail;
