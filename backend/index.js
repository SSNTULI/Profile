import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const myEmail = "sihlentuli49@gmail.com";
const app = express();

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myEmail,
        pass: 'gzjb uzsc afta cfah'
    }
});

app.use(express.static(path.join(__dirname,"../frontend")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","index.html"));
});

app.post("/send", (req, res) => {
    console.log(req.body);

    let mailOptions = {
        from: myEmail,
        to: myEmail,
        subject: "Mail from your Profile",
        text: `Name: ${req.body.name}
        Surname: ${req.body.surname}
        Email: ${req.body.email}
        ${req.body.message}`
    };

    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Email failed" });
        }
        console.log("Email sent:", info.response);
        return res.json({message: "Email sent successfully"});
    });
});

app.listen(port, () => {
    console.log(`Server Running On Port 3000`);
});
