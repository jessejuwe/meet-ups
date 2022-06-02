// Next.js API route ==> /api/new-meetup

import { MongoClient } from 'mongodb';

// sending POST request to API (WILL NEVER END UP ON THE CLIENT-SIDE)

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // end-point for creating a new meetup
    const data = req.body; // contains the data object of the incoming request

    const url =
      'mongodb+srv://iktheenigma:wnxcKc8D0AktRNvo@cluster0.3jy9v4x.mongodb.net/meetups?retryWrites=true&w=majority';

    try {
      // runs on the server-side (the alternative would expose your credentials to users)
      const client = await MongoClient.connect(url);
      const db = client.db(); // database

      const meetupsCollection = db.collection('meetups'); // like tables in a SQL database
      const result = await meetupsCollection.insertOne({ data }); // inserting new document to collection

      if (!result.acknowledged) throw new Error('Unable to upload data!');

      console.log(result);

      client.close(); // close database connection

      //   SEND BACK RESPONSE
      res.status(201).json({ message: 'New meetup added!' }); // set response code for success response
    } catch (error) {
      alert(`💥${error.message}💥`);
    }
  }
};

export default handler;
