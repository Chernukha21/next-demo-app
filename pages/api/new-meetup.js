import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup
const uri = process.env.MONGODB_URI;

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    let client;
    try {
      client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = client.db();
      const meetupsCollection = db.collection('meetups');
      const result = await meetupsCollection.insertOne(data);
      console.log(result);
      res.status(201).json({ message: 'Meetup inserted!' });
    } catch (error) {
      console.error('Failed to insert meetup:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      if (client) {
        client.close();
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;