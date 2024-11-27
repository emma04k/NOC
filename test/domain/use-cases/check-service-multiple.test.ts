import { CheckService } from "../../../src/domain/use-cases/check-service";
import { LogEntity } from "../../../src/domain/entities/log.entity";
import { CheckServiceMultiple } from "../../../src/domain/use-cases/check-service-multiple";


describe('check-service-multiple', () => {

    const  mockSuccesfullCallback = jest.fn();
    const  mockErrorCallback = jest.fn();

    const mockRepositoryFS = {
        getLogs : jest.fn(),
        saveLog: jest.fn(),
    }
    const mockRepositoryMongo = {
        getLogs : jest.fn(),
        saveLog: jest.fn(),
    }

    const mockRepositoryPg = {
        getLogs : jest.fn(),
        saveLog: jest.fn(),
    }

    const checkService = new CheckServiceMultiple(
        [mockRepositoryFS,mockRepositoryMongo,mockRepositoryPg],
        mockSuccesfullCallback,
        mockErrorCallback
    );

    beforeEach(()=>{
        jest.clearAllMocks();
    })
    test('should call successCallback when fetch return true',async ()=>{

       const wasOk = await checkService.execute('http://google.com');
       expect(wasOk).toBe(true);

       expect(mockSuccesfullCallback).toHaveBeenCalled();
       expect(mockErrorCallback).not.toHaveBeenCalled();
       expect(mockRepositoryFS.saveLog).toBeCalledWith(expect.any(LogEntity));
       expect(mockRepositoryMongo.saveLog).toBeCalledWith(expect.any(LogEntity));
       expect(mockRepositoryPg.saveLog).toBeCalledWith(expect.any(LogEntity));

        expect(mockRepositoryFS.saveLog).toHaveBeenCalled();
        expect(mockRepositoryMongo.saveLog).toHaveBeenCalled();
        expect(mockRepositoryPg.saveLog).toHaveBeenCalled();


    });

    test('should call errorCallback when fetch return false',async ()=>{


        const wasOk = await checkService.execute('http://21dadffweddafffffasfoasfsffgle.com');
        expect(wasOk).toBe(false);

        expect(mockSuccesfullCallback).not.toHaveBeenCalled();
        expect(mockErrorCallback).toHaveBeenCalled();
        expect(mockRepositoryFS.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepositoryMongo.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepositoryPg.saveLog).toBeCalledWith(expect.any(LogEntity));

        expect(mockRepositoryFS.saveLog).toHaveBeenCalled();
        expect(mockRepositoryMongo.saveLog).toHaveBeenCalled();
        expect(mockRepositoryPg.saveLog).toHaveBeenCalled();

    });
})