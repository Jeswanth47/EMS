// utils/email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (emailData) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailData.to,
            subject: emailData.subject,
            text: emailData.text,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;