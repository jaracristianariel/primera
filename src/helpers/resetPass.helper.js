import { transport } from "./email.helper.js";

const resetPass = async(email, token) => {
    try {
        const resetLink = `${process.env.BASE_URL}/reset/${token}`
        await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "mail de restauracion de pw",
            html: `<p> hace click en el enlace para recuperar contraseña, el link vence en 1 hora</p>
            <a href="${resetLink}">resetear contraseña</a>`,
        })
    } catch (error) {
        throw error
    }
}

export default resetPass;