// only being reached when an api request is made to domain.com/api/new-meetup
import { MongoClient } from "mongodb";

const mongoLink = "mongodb+srv://admin:admin@cluster0.7pzt5.mongodb.net/meetups?retryWrites=true&w=majority";

const handler = async (req, res) => { //it will only be triggered if a POST request has being made
  if (req.method === "POST") {
    const data = req.body; // uses the req method to gather the content of the data entered from the user

    // fetching data from API in mongoDB
    const client = await MongoClient.connect(mongoLink); // connect to the DB
    const db = client.db(); // get the DB methods
    const meetupsCollection = db.collection("meetups"); // get the collections of the DB
    const result = await meetupsCollection.insertOne(data);
    client.close(); // closes connection to the DB
    res.status(201).json({ message: "Meetup inserted!" }); // after its done, it will sent a success message to the DB
  }
};

export default handler;
