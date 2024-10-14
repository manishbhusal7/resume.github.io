
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Serve static files from the current directory
// app.use(express.static(path.join(__dirname)));

// // POST route to handle contact form submission
// app.post('/send', (req, res) => {
//     const { name, email, message } = req.body;

//     // Set up Nodemailer transport
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'manishbhusal2003@gmail.com',
//             pass: 'nblv yoyu doql jzmp',  // Store this securely
//         },
//     });

//     const mailOptions = {
//         from: email,
//         to: 'manishbhusal2003@gmail.com',
//         subject: `New Contact Form Submission from ${name}`,
//         text: `You received a new message from ${name} (${email}):\n\n${message}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send('Error sending message');
//         } else {
//             console.log('Email sent: ' + info.response);
//             // Serve a success message page
//             res.send(`
//                 <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Message Sent</title>
//                     <link rel="stylesheet" href="/style.css">
//                 </head>
//                 <body>
//                     <div class="message-box">
//                         <div class="icon">✔️</div>
//                         <h1>Message Sent Successfully!</h1>
//                         <p>Thank you for reaching out. We will get back to you soon.</p>
//                     </div>
//                 </body>
//                 </html>
//             `);
//         }
//     });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

require('dotenv').config();  

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Ensure compatibility with different environments

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// POST route to handle contact form submission
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Set up Nodemailer transport using environment variables
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Fetch from environment variables
            pass: process.env.EMAIL_PASS, // Fetch from environment variables
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // The email user should be the recipient as well
        subject: `New Contact Form Submission from ${name}`,
        text: `You received a new message from ${name} (${email}):\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending message');
        } else {
            console.log('Email sent: ' + info.response);
            // Serve a success message page
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Message Sent</title>
                    <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                    <div class="message-box">
                        <div class="icon">✔️</div>
                        <h1>Message Sent Successfully!</h1>
                        <p>Thank you for reaching out. We will get back to you soon.</p>
                    </div>
                </body>
                </html>
            `);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
