import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://eva3_express:d7oaik7UWNbHN7Jm@cluster-express.6dcq1yo.mongodb.net/?appName=cluster-express"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export default client;