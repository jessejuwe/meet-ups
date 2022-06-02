// our-domain.com/new-meetup

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async enteredMeetupData => {
    const requestObj = {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch('/api/new-meetup', requestObj);

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();

      router.replace('/'); // programmatic navigation
    } catch (error) {
      console.error(`💥${error.message}💥`);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your vacation spot to our records."
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
