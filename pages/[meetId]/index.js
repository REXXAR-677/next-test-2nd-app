import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const mongoLink =
  "mongodb+srv://admin:admin@cluster0.7pzt5.mongodb.net/meetups?retryWrites=true&w=majority";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="desciption" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  //connect to the DB
  const client = await MongoClient.connect(mongoLink); // connect to the DB
  const db = client.db(); // get the DB methods
  const meetupsCollection = db.collection("meetups"); // get the collections of the DB
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // filterinf to all the datat in the docs and only selectiong the id as only fetched data
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup | connect to the DB
  const meetId = context.params.meetId; // gets the id of the url
  const client = await MongoClient.connect(mongoLink); // connect to the DB
  const db = client.db(); // get the DB methods
  const meetupsCollection = db.collection("meetups"); // get the collections of the DB
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetId),
  }); // with findOne, it only searches for only one doc matching the criteria od "_id = meetId"

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
