import { CronService } from "../../../src/presentation/cron/cron-service";


describe('test in cron-service.ts',()=>{

    const mockTick = jest.fn();
    test('should create a job',(done)=>{

       const  job  = CronService.createJob("* * * * * *", mockTick);

       setTimeout(() => {
               expect(mockTick).toHaveBeenCalledTimes(2);

               job.stop();
               done();
           },2000);


    });
})