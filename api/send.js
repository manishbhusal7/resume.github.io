import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,  // The email user should be the recipient as well
            subject: `New Contact Form Submission from ${name}`,
            text: `You received a new message from ${name} (${email}):\n\n${message}`,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error sending message' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
