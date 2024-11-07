import { LogDataSource } from "../../domain/dataSources/log.dataSource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo";


export class MongoDataSource implements LogDataSource{

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level : severityLevel,
        });
        return  logs.map(log => LogEntity.fromObject(log))
    }

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log("Mongo log created:",newLog.id);
    }
}