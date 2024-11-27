import { MongoDatabase } from "../../src/data/mongo";
import { envs } from "../../src/config/plugins/envs.plugin";
import mongoose from "mongoose";


describe('init MongoDB test', () => {

    afterAll( () => {
        mongoose.connection.close();
    });

    const dbName = envs.MONGO_DB_NAME;
    const mongoUrl = envs.MONGO_URL;
    test('should connect to mongodb', async ()=> {
       const connect = await MongoDatabase.connect({
            dbName: dbName,
            mongoUrl: mongoUrl
        });

       expect(connect).toBe(true);

    });

    test('should not connect to mongodb', async ()=> {

        try {
            const connect = await MongoDatabase.connect({
                dbName: 'error',
                mongoUrl: 'error'
            });
            expect(connect).toBe(true);
        }catch (err) {

        }

    });

})