import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface  SendEmailRequest {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];
}

export interface Attachments {
    fileName: string;
    path: string;
}


export class EmailService {
    private transporter = nodemailer.createTransport(
        {
            service: envs.MAILER_SERVICE,
            auth: {
                user: envs.MAILER_EMAIL,
                pass: envs.MAILER_SECRET_KEY,
            }
        }
    );

    public async sendEmail(options: SendEmailRequest): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options

        try {
            const sentInformation = await  this.transporter.sendMail({
                to:to,
                subject:subject,
                html: htmlBody,
                attachments : attachments
            });
            return  true;
        }catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = "Logs del servidor";
        const htmlBody = `
        <h3>Logs de sistema NOC<h3>
        <p>test</p>
        <p>Ver los adjuntos</p>
        `
        const attachments: Attachments[] =[
            {fileName: "low.log", path: "./logs/low.log"},
            {fileName: "medium.log", path: "./logs/medium.log"},
            {fileName: "high.log", path: "./logs/high.log"},
        ]

        return this.sendEmail({
           to,
           subject,
           htmlBody,
           attachments,
        });

    }
}