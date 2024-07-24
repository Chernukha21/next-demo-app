import {MongoClient} from "mongodb";

export async function collection(){
    const uri = process.env.MONGODB_URI;
    let client;
    client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
}