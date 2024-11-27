import { MongoDataSource } from "../../../src/infrastructure/dataSources/mongo-.dataSource";
import { LogModel, MongoDatabase } from "../../../src/data/mongo";
import { envs } from "../../../src/config/plugins/envs.plugin";
import mongoose from "mongoose";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";


describe('mongo-dataSource.ts', () => {

    const logDataSource = new MongoDataSource()
    const log = new LogEntity({
        message : 'test message',
        origin : 'mongo-dataSource.test.ts',
        level : LogSeverityLevel.medium
    })

    beforeAll(async ()=>{

        await MongoDatabase.connect(
            {
                mongoUrl: envs.MONGO_URL,
                dbName: envs.MONGO_DB_NAME!,
            }
        )

    })

    afterAll(async ()=>{
        await mongoose.connection.close();
    });

    afterEach(async ()=>{
        await  LogModel.deleteMany()
    });

    beforeEach( () => {
        jest.clearAllMocks();
    });


    test('should create a log', async  () =>{

        const logSpy = jest.spyOn(console, 'log')

        await logDataSource.saveLog(log);

        expect(logSpy).toBeCalledWith("Mongo log created:",expect.any(String));

    });

    test('should get logs', async ()=>{
        await logDataSource.saveLog(log);
        const logs =await logDataSource.getLogs(LogSeverityLevel.medium)

        expect(logs.length).toBeGreaterThan(0);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);

    });

})