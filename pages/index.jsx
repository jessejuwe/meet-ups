// our-domain.com/

import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { API_KEY } from '../helper/helper';
import { Fragment } from 'react';

const HomePage = props => {
  return (
    <Fragment>
      <Head>
        <title>VACATIONS</title>
        <meta
          name="description"
          content="checkout vacation spots around the world, and add yours."
        ></meta>
        <link rel="icon" href="/plane.ico" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// Data Fetching for Pre-rendering:
// - moving data fetching to the server-side
// - NextJS waits for a returned promise before dispalying content to user
// - to be used when access to concrete request object is needed, or when data changes multiple times

// export const getServerSideProps = async context => {
//   const req = context.req; // request object
//   const res = context.res; // response object

//   // TODO: fetch data from API

//   return { props: { meetups: DUMMY_MEETUPS } };
// };

// Data Fetching for Pre-rendering:
// - moving data fetching away from the client-side (fetches data during build process)
// - NextJS waits for a returned promise before dispalying content to user
// - to be used in cases like AUTHENTICATION, when access to request object is not needed
// - when used, pages will be faster because they can be cached and resued, not regenerated all the time

export const getStaticProps = async () => {
  let meetups;

  // fetch meetups data from API
  try {
    const client = await MongoClient.connect(API_KEY);
    const db = client.db(); // database

    const meetupsCollection = db.collection('meetups'); // like tables in a SQL database

    const count = await meetupsCollection.countDocuments();

    // Guard Clause
    if (count === 0) throw new Error('Data collection is empty!');

    const data = await meetupsCollection.find().toArray();

    meetups = data.map(meetup => ({
      id: meetup._id.toString(),
      title: meetup.data.title,
      image: meetup.data.image,
      address: meetup.data.address,
      description: meetup.data.description,
    }));

    client.close();
  } catch (error) {
    console.error(`💥${error.message}💥`);
  }

  return { props: { meetups }, revalidate: 36000 };
};

export default HomePage;
