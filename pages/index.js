import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const mongoLink =
  "mongodb+srv://admin:admin@cluster0.7pzt5.mongodb.net/meetups?retryWrites=true&w=majority";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content="Browse a huge list of highly active React Meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetching data from API in mongoDB
  const client = await MongoClient.connect(mongoLink); // connect to the DB
  const db = client.db(); // get the DB methods
  const meetupsCollection = db.collection("meetups"); // get the collections of the DB
  const meetups = await meetupsCollection.find().toArray(); // get all the docs in that collection and convert it into arr
  client.close(); // close the connection to the DB

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
