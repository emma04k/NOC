import {envs} from "./config/plugins/envs.plugin";
import {Server} from "./presentation/server";
import { MongoDatabase } from "./data/mongo";

(async () => {
    await main();
})();

async function main() {
    await MongoDatabase.connect({
       dbName : envs.MONGO_DB_NAME,
       mongoUrl : envs.MONGO_URL
    });

    Server.start();
}
