import { LogDataSource } from "../../../src/domain/dataSources/log.dataSource";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";

describe('log.dataSource.ts LogDataSources', () => {

    class MockDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [];
        }

    }

    test('should test the abstract class', ()=>{
        const mockDataSource = new MockDataSource();
        expect(mockDataSource).toBeInstanceOf(MockDataSource);
        expect(typeof (mockDataSource.getLogs)).toEqual('function');
        expect(typeof (mockDataSource.saveLog)).toEqual('function');
    });
});