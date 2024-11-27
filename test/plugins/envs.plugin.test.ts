import { envs } from "../../src/config/plugins/envs.plugin";


describe("test of envs.plugin,ts",()=>{
   test('should return env options', ()=>{

      expect(envs).toEqual({
         PORT: 3000,
         MAILER_SERVICE: 'gmail',
         MAILER_EMAIL: 'emaortegag16dev@gmail.com',
         MAILER_SECRET_KEY: '12345a',
         PDN: false,
         MONGO_URL: 'mongodb://mongo_test:123456789@localhost:27017/',
         MONGO_DB_NAME: 'NOC_EDOG_TEST',
         MONGO_USER: 'mongo_test',
         MONGO_PASS: '123456789'
      });

   });
});