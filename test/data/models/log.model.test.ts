import { LogModel, MongoDatabase } from "../../../src/data/mongo";
import { envs } from "../../../src/config/plugins/envs.plugin";
import mongoose from "mongoose";


describe('log.model.ts', () => {
    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME!,
            mongoUrl: envs.MONGO_URL!,
        })
    })
    afterAll(() => {
        mongoose.connection.close();
    })
    test('should return LogModel', async  () =>{
        const logModelData = {
            origin : 'log.model.test.ts',
            message: 'test with jest',

        };
       const newLog = await LogModel.create(logModelData);
       expect(newLog).toMatchObject(logModelData);

       expect(newLog).toEqual( expect.objectContaining({
           ...logModelData,
           createdAt: expect.any(Date),
           id: expect.any(String),
           } ) );
       await LogModel.findByIdAndDelete(newLog.id)

    });

    test('should return the schema object', async  () => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining(
            {
                message : { type : expect.any(Function ), require : true },
                origin : { type : expect.any(Function ) },
                level : {
                    type : expect.any(Function ),
                    enum : ['low', 'medium', 'high'],
                    default : 'low'
                },
                createdAt : expect.any(Object),
            }
            ));
    });
})