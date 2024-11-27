import { PostgresLogDataSource } from "../../../src/infrastructure/dataSources/postgres-log-dataSource";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { envs } from "../../../src/config/plugins/envs.plugin";


describe('test in postgres-log-dataSource.ts', () => {

    const dataSource = new PostgresLogDataSource();
    const logEntity = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test',
        origin: 'postgres-log-dataSource.ts'
    });

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test('should create a log',async ()=>{
        const dataSourceSpy = jest.spyOn(dataSource,'saveLog');

        await dataSource.saveLog(logEntity);

        expect(dataSourceSpy).toHaveBeenCalled();
    })

    test('should get logs', async ()=>{
       const  logs = await dataSource.getLogs(logEntity.level);

        expect(logs.length).toBeGreaterThan(0);
        expect(logs[0].message).toBe('test');
    })

})