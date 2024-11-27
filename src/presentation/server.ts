import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email-service";
import { MongoDataSource } from "../infrastructure/dataSources/mongo-.dataSource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { FileSystemDataSource } from "../infrastructure/dataSources/file-system.dataSource";
import { PostgresLogDataSource } from "../infrastructure/dataSources/postgres-log-dataSource";
import { CronService } from "./cron/cron-service";
import { CheckServiceMultiple } from "../domain/use-cases/check-service-multiple";

const FSLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
);

const MongoLogRepository = new LogRepositoryImpl(
    new MongoDataSource(),
)

const PostgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDataSource()
)

const emailService = new EmailService();

export class Server {

    public static async start() {

//TODO: MANDAR EMAIL

        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs("emaortegag16dev@gmail.com");
        //
        // new SendEmailLogs(emailService,fileSystemLogRepository).execute("emaortegag16dev@gmail.com");
        console.log('Server started...');

        // const logs = await FSLogRepository.getLogs(LogSeverityLevel.low);
        // logs.push(...await MongoLogRepository.getLogs(LogSeverityLevel.medium));
        // logs.push(...await PostgresLogRepository.getLogs(LogSeverityLevel.high));
        // console.log(logs);


        // CronService.createJob("*/5 * * * * *", () => {
        //     // const  url = 'http://google.com';
        //     const  url ='http://localhost:3000/';
        //     new CheckServiceMultiple(
        //         [FSLogRepository,MongoLogRepository,PostgresLogRepository],
        //         ()=> console.log(`${url} is ok`),
        //         (error)=> console.log(error)
        //     ).execute(url);
        // });
    }
}