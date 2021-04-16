// api/add-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            'mongodb+srv://Bharat:xfwItlDt7pqPHQ1F@nextjs-cluster.semgr.mongodb.net/meetupsdata?retryWrites=true&w=majority',
            { useUnifiedTopology: true }
        );

        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup Inserted' });

     
    }
}

export default handler;