import {LogRepository} from "../repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../entities/log.entity";

interface CheckServiceUseCases {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void)  | undefined;

export class CheckService implements CheckServiceUseCases {

    constructor(
        private  readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    public async execute(url: string): Promise<boolean> {
        let successful = false;
        let log: LogEntity;
        const origin = "check-service.ts";
        try {

            const req = await fetch(url);

            if (!req.ok) {
                throw new Error(`Error on check ${url}`);
            }

            log = new LogEntity({message : `service ${url} working`, level:LogSeverityLevel.low, origin});
            this.successCallback && this.successCallback();
            successful = true;
        } catch (error) {
            const errorMessage = `${url} is not ok. ERROR: ${error}`;
            log = new LogEntity({message : errorMessage, level: LogSeverityLevel.high, origin});
           this.errorCallback  && this.errorCallback(errorMessage);
        }

        await this.logRepository.saveLog(log);
        return  successful;
    }
}