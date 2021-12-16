import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
import { Fragment } from "react";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.replace("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Add A New Meetup</title>
        <meta name='desciption' content='Add your own meetups and create amazing networking opportunities.'/>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
};

export default NewMeetup;
