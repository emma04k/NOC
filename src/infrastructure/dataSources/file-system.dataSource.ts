import {LogDataSource} from "../../domain/dataSources/log.dataSource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import fs from "fs";

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/low.log';
    private readonly mediumLogsPath = 'logs/medium.log';
    private readonly highLogsPath = 'logs/high.log';

    constructor() {
        this.createLogsFiLe();
    }

    private createLogsFiLe = ()=>{
        if( !fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        })


    }

    async saveLog(newLog: LogEntity): Promise<void> {

        this.createLogsFiLe();

        const logToJson = `${JSON.stringify(newLog)}\n`;
        fs.appendFileSync(this.allLogsPath, logToJson);

        if (newLog.level === LogSeverityLevel.low) return ;

        if (newLog.level === LogSeverityLevel.medium) {
          fs.appendFileSync(this.mediumLogsPath, logToJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logToJson);
        }
        return;
    }

    private getLogFromFile = (path: string): LogEntity[]  =>{
        const content = fs.readFileSync(path,'utf8');
        if(content === ''){ return []; }
        return content.split('\n').filter(log => log!=='').map(log => LogEntity.fromJson(log));
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}