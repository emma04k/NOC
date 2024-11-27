import { CheckService } from "../../../src/domain/use-cases/check-service";
import { LogEntity } from "../../../src/domain/entities/log.entity";


describe('check-service', () => {

    const  mockSuccesfullCallback = jest.fn();
    const  mockErrorCallback = jest.fn();

    const mockRepository = {
        getLogs : jest.fn(),
        saveLog: jest.fn(),
    }

    const checkService = new CheckService(
        mockRepository,
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
       expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity))

    });

    test('should call errorCallback when fetch return false',async ()=>{


        const wasOk = await checkService.execute('http://21dadffweddafffffasfoasfsffgle.com');
        expect(wasOk).toBe(false);

        expect(mockSuccesfullCallback).not.toHaveBeenCalled();
        expect(mockErrorCallback).toHaveBeenCalled();
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity))

    });
})