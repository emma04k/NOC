export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}
export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin : string;
    createdAt?: Date;
}

export class LogEntity  {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin : string;

    constructor(options:LogEntityOptions) {
       const { level, message, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin  = origin ;
    }

    static fromJson = (log: string):LogEntity=>{
        const { message, level, origin , createdAt }  = JSON.parse(log);

        const logEntity = new LogEntity(
            {
                message,
                level,
                origin,
                createdAt,
            }
        );
        return logEntity;
    }

    static fromObject =(object : {[key: string]: any}): LogEntity => {
        const { message, level, origin , createdAt } = object;
        if (!message) {
            throw new Error('Is necessary the message');
        }

        const logEntity = new LogEntity({
            message,
            level,
            origin,
            createdAt,
        });

        return logEntity
    }

}