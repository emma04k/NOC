import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/dataSources/file-system.dataSource";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
);

const emailService = new EmailService();

export class Server {

    public static start() {

//TODO: MANDAR EMAIL

        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs("emaortegag16dev@gmail.com");
        //
        // new SendEmailLogs(emailService,fileSystemLogRepository).execute("emaortegag16dev@gmail.com");
        console.log('Server started...');
        // CronService.createJob("*/5 * * * * *", () => {
        //     // const  url = 'http://google.com';
        //     const  url ='http://localhost:3000/';
        //     new CheckService(
        //         fileSystemLogRepository,
        //         ()=> console.log(`${url} is ok`),
        //         (error)=> console.log(error)
        //     ).execute(url);
        // });
    }
}