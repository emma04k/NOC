import { LogRepositoryImpl } from "../../../src/infrastructure/repositories/log.repository.impl";
import { LogRepository } from "../../../src/domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";


describe('Test in log-repository.impl.ts', () => {

    const mockdataSource = {
        saveLog : jest.fn(),
        getLogs : jest.fn(),
    }



    const logRepository = new LogRepositoryImpl(mockdataSource);
    beforeEach(() => {
        jest.clearAllMocks();
    })


    test('saveLog should call the dataSource with arguments',async ()=>{
        const logEntity = new LogEntity({
            origin : 'log-repository.impl.test.ts',
            message : 'test',
            level: LogSeverityLevel.low
        })
        await logRepository.saveLog(logEntity);

        expect(mockdataSource.saveLog).toHaveBeenCalledWith(logEntity);

    });

    test('getLogs should call the dataSource with arguments',async () => {

         await logRepository.getLogs(LogSeverityLevel.low);

        expect(mockdataSource.getLogs).toBeCalledWith(LogSeverityLevel.low);

    });
});