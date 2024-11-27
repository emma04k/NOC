import { EmailService, SendEmailRequest } from "../../../src/presentation/email/email-service";
import nodemailer from "nodemailer";


describe('test in email-service',()=>{

    const mockSendEmail = jest.fn();

    //mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
       sendMail: mockSendEmail,
    });

    const emailService = new EmailService();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should send email',async ()=>{
        const request : SendEmailRequest = {
            to:'ema@gmail.com',
            subject: 'test',
            htmlBody: '<h3>Test</h3>',
            attachments : []
        }

        await emailService.sendEmail(request);

        expect( mockSendEmail ).toHaveBeenCalledWith({"attachments": expect.any(Array), "html": "<h3>Test</h3>", "subject": "test", "to": "ema@gmail.com"}
        );

    });

    test('should send emailt with attachments',async ()=>{

       await emailService.sendEmailWithFileSystemLogs('emma@gamil.com')

        expect(mockSendEmail).toHaveBeenCalledWith( {"attachments": [{"fileName": "low.log", "path": "./logs/low.log"}, {"fileName": "medium.log", "path": "./logs/medium.log"}, {"fileName": "high.log", "path": "./logs/high.log"}],
                "html": expect.any(String),
                "subject": "Logs del servidor",
                "to": "emma@gamil.com" }
                 );

    });

});