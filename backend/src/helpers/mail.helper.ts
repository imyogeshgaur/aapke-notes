import { createTransport } from 'nodemailer'
import { config } from 'dotenv'
import { resolve } from 'path'
config({path:resolve("src/.env")})

const myTransport = createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
})

const passwordResetMail = async (receiverMail: string, uuid: string) => {
    try {
        const info = await myTransport.sendMail({
            from: process.env.MAIL_ID,
            to: receiverMail,
            subject: "Password Reset Link",
            html: `
            <html>
            <head>
            </head>
            <body>
                <p> Dear User, </p>   
                <p>There was a request to change your password!
                <br>
                If you did not make this request then please ignore this email.
                <br>
                Otherwise, <a href="${process.env.FRONTEND_URL}/resetPassword/${uuid}">
                Click Here</a> to Login !!!</p>
                Thanks and Regards
                <br>
                Team Aapke Notes
            </body>
            </html>
        `
        })
        console.log("Mail Send Successfully !!!")
        if (info.messageId) {
            return { message: "Check Mail For Login !!!" };
        } else {
            return { message: "Mail Not Send Successfully  !!!" };
        }
    } catch (error) {
        console.log("Password Reset Mail's Helper Error : ", error)
    }
}

export default passwordResetMail;