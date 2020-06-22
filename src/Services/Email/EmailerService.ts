import { Service } from "@tsed/di";
const mjml2html = require("mjml");
import { createTransport } from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import { AuthenticationType } from "nodemailer/lib/smtp-connection";

interface IOptions {
    recipient: string;
    body: string;
    bodyMJ?: string;
    senderEmail: string;
    senderName: string;
    subject: string;
    cc?: string[];
    bcc?: string[];
}

@Service()
export default class EmailerService {

    private readonly server = "smtp.gmail.com";
    private readonly port = 465;
    private token: string = "";
    private mail: Mail;
    private auth: AuthenticationType = { 
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN
    };

    constructor() {
        this.mail = createTransport({
            host: this.server,
            port: this.port,
            secure: true,
            auth: this.auth
        });

        this.mail.on('token', (token: any) => {
            this.token = token.accessToken;
        });

        this.mail.set('oauth2_provision_cb', (_: any, __: any, callback: any) => {
            if (!this.token) {
                return callback(new Error('Unknown user'));
            } else {
                return callback(null, this.token);
            }
        });
    }

    public sendMail(options: IOptions) {
        return this.mail.sendMail({
            from: `${options.senderName} <${options.senderEmail}>`,
            to: options.recipient,
            cc: options?.cc,
            bcc: options?.bcc,
            subject: options.subject,
            html: this.parseMJ(options.body)
        })
    }

    public parseMJ(email: string) {
        const result = mjml2html(email);
        return result.html;
    }

}