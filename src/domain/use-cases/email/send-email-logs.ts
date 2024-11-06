import { EmailService } from "../../../presentation/email/email-service";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

interface SendEmailLogsUseCases {
    execute: (to:string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogsUseCases {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
        ) {}
    async execute(to: string | string[]): Promise<boolean> {

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({
                level : LogSeverityLevel.low,
                message : `Log email sent`,
                origin : "send-email-logs.ts",
            })
            this.logRepository.saveLog(log);

          return  true;
        }catch (ex ){
            const log = new LogEntity({
                level : LogSeverityLevel.high,
                message : `${ex}`,
                origin : "send-email-logs.ts",
            })
            this.logRepository.saveLog(log);
            return false;
        }
    }
}