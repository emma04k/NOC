import * as path from "node:path";
import fs from "fs";
import { FileSystemDataSource } from "../../../src/infrastructure/dataSources/file-system.dataSource";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";


describe('test in file-system.dataSource.ts', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(()=>{
        fs.rmSync(logPath,{recursive:true, force: true});
    });


    test('should create log files if they do not exists', () => {

        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual([ 'high.log', 'low.log', 'medium.log' ]);
        expect(files.length).toEqual(3);

    });

    test('should save a log in low.log', async () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            origin: 'file-system.dataSource.test.ts',
            message: 'test',
            level: LogSeverityLevel.low
        });

        await logDataSource.saveLog(log);

        const lowLogs = fs.readFileSync(`${logPath}/low.log`, 'utf8');
        expect(lowLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in low.log and medium.log', async () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            origin: 'file-system.dataSource.test.ts',
            message: 'test',
            level: LogSeverityLevel.medium
        });

        await logDataSource.saveLog(log);

        const lowLogs = fs.readFileSync(`${logPath}/low.log`, 'utf8');
        const mediumLogs = fs.readFileSync(`${logPath}/medium.log`, 'utf8');

        expect(lowLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in low.log and high.log', async () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            origin: 'file-system.dataSource.test.ts',
            message: 'test',
            level: LogSeverityLevel.high
        });

       await logDataSource.saveLog(log);

        const lowLogs = fs.readFileSync(`${logPath}/low.log`, 'utf8');
        const highLogs = fs.readFileSync(`${logPath}/high.log`, 'utf8');

        expect(lowLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });


    test('should return all logs', async () => {
       const logDataSource = new FileSystemDataSource();

        const logHigh = new LogEntity({
            origin: 'file-system.dataSource.test.ts',
            message: 'test',
            level: LogSeverityLevel.high
        });
        const logMedium = new LogEntity({
            origin: 'file-system.dataSource.test.ts',
            message: 'test',
            level: LogSeverityLevel.medium
        });

        const logLow = new LogEntity({
            origin: 'file-system.dataSource.test.ts',
            message: 'test',
            level: LogSeverityLevel.low
        });

        await logDataSource.saveLog(logHigh);
        await logDataSource.saveLog(logLow);
        await logDataSource.saveLog(logMedium);

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);


        expect( logsLow).toEqual(expect.arrayContaining([logHigh,logLow,logMedium]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));

    })

})