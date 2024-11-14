import { LogDataSource } from "../../domain/dataSources/log.dataSource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();
const SeverityLevelEnum = {
    low : SeverityLevel.LOW,
    medium : SeverityLevel.MEDIUM,
    high : SeverityLevel.HIGH,
}

export class PostgresLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {

        const newLog = await prismaClient.logModel.create({
                data:{
                    level: SeverityLevelEnum[log.level],
                    message: log.message,
                    origin: log.origin,
                }
            });
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await prismaClient.logModel.findMany({
            where:{
                level: SeverityLevelEnum[severityLevel],
            }
        });

        return  logs.map( LogEntity.fromObject )
    }

}