import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { log } from "node:util";

describe("log.entity.ts", () => {
    const  dataObject = {
        message:'Hola mundo test',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }
    test('should create a logEntity instance', ()=>{

        const logEntity = new LogEntity(dataObject);

        expect(logEntity).toBeInstanceOf(LogEntity);
        expect(logEntity.message).toBe(dataObject.message);
        expect(logEntity.origin).toBe(dataObject.origin);
        expect(logEntity.level).toBe(dataObject.level);
        expect(logEntity.createdAt).toBeInstanceOf(Date);

    });

    test('should create a logEntity instance from json', ()=>{
        const jsonObject = JSON.stringify(dataObject);
        const logEntity = LogEntity.fromJson(jsonObject);

        expect(logEntity).toBeInstanceOf(LogEntity);
        expect(logEntity.message).toBe(dataObject.message);
        expect(logEntity.origin).toBe(dataObject.origin);
        expect(logEntity.level).toBe(dataObject.level);
        expect(logEntity.createdAt).toBeInstanceOf(Date);

    });

    test('should create a logEntity instance from object', ()=>{
        const logEntity = LogEntity.fromObject(dataObject);

        expect(logEntity).toBeInstanceOf(LogEntity);
        expect(logEntity.message).toBe(dataObject.message);
        expect(logEntity.origin).toBe(dataObject.origin);
        expect(logEntity.level).toBe(dataObject.level);
        expect(logEntity.createdAt).toBeInstanceOf(Date);

    })

})