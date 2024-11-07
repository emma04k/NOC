import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email-service";
import { MongoDataSource } from "../infrastructure/dataSources/mongo-.dataSource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { FileSystemDataSource } from "../infrastructure/dataSources/file-system.dataSource";

const LogRepository = new LogRepositoryImpl(
    // new FileSystemDataSource(),
    new MongoDataSource(),
);

const emailService = new EmailService();

export class Server {

    public static async start() {

//TODO: MANDAR EMAIL

        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs("emaortegag16dev@gmail.com");
        //
        // new SendEmailLogs(emailService,fileSystemLogRepository).execute("emaortegag16dev@gmail.com");
        console.log('Server started...');

        const logs = await LogRepository.getLogs(LogSeverityLevel.medium);
        console.log(logs);


        // CronService.createJob("*/5 * * * * *", () => {
        //     const  url = 'http://google.com';
        //     // const  url ='http://localhost:3000/';
        //     new CheckService(
        //         LogRepository,
        //         ()=> console.log(`${url} is ok`),
        //         (error)=> console.log(error)
        //     ).execute(url);
        // });
    }
}