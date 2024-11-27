import { SendEmailLogs } from "../../../../src/domain/use-cases/email/send-email-logs";
import { EmailService } from "../../../../src/presentation/email/email-service";
import { LogRepository } from "../../../../src/domain/repository/log.repository";
import { LogEntity } from "../../../../src/domain/entities/log.entity";


describe('send-email-log.ts', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs : jest.fn().mockReturnValue(true),
    }
    const mockRepository: LogRepository = {
        saveLog : jest.fn(),
        getLogs : jest.fn(),
    }

    const sendEmailLog = new SendEmailLogs(
        mockEmailService as any,
        mockRepository
    );
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call sendEmail and saveLog', async () => {

        const result = await sendEmailLog.execute('emaortegag16dev@gmail.com');
        expect(result).toBeTruthy();
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toBeCalledWith({
            "createdAt" : expect.any(Date),
            "level" : "low",
            "message" : "Log email sent",
            "origin" : "send-email-logs.ts",
        });
    });

    test('should log in case error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)
        const result = await sendEmailLog.execute('emaortegag16dev@gmail.com');
        expect(result).toBeFalsy();
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toBeCalledWith({
            "createdAt" : expect.any(Date),
            "level" : "high",
            "message" : "Error: Email log not sent",
            "origin" : "send-email-logs.ts",
        });
    });
});