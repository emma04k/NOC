import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import {LogRepository} from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository {

    constructor(private readonly logRepository: LogRepository) {}

     async saveLog(log: LogEntity): Promise<void> {
        return  this.logRepository.saveLog(log);
    }
     async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logRepository.getLogs(severityLevel);
    }

}