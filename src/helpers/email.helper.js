import { createTransport } from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
    }
})

const sendEmail = async(email, subject, html) => {
    try {
        await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject,
            html,
        })
    } catch (error) {
        throw error
    }
}

export { transport };
export default sendEmail;