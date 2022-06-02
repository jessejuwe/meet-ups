// our-domain.com/

import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { API_KEY } from '../helper/helper';

export const DUMMY_MEETUPS = [
  {
    id: 'm1',
    image:
      'https://images.unsplash.com/photo-1545328732-fd7ea6242f4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    title: 'France',
    address: '74 rue Léon Dierx, Livry-gargan,  Île-de-France',
    description: 'First meetup in France. Wine and Dine!',
  },
  {
    id: 'm2',
    image:
      'https://images.unsplash.com/photo-1508693926297-1d61ee3df82a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    title: 'Canada',
    address: '671 Carling Avenue, Ottawa, Ontario',
    description: 'Second meetup in Canada. Beautiful Scenery!',
  },
  {
    id: 'm3',
    image:
      'https://images.unsplash.com/photo-1561632669-7f55f7975606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    title: 'Spain',
    address: 'Carretera 16, Montilla, Córdoba',
    description: 'Third meetup in Spain. Music and Culture!',
  },
  {
    id: 'm4',
    image:
      'https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    title: 'Austria',
    address: 'Lerchenfelder Straße 67, Lading, Carinthia',
    description: 'Fourth meetup in Austria. Nature and Recreations!',
  },
];

const HomePage = props => {
  return <MeetupList meetups={props.meetups} />;
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

  return { props: { meetups }, revalidate: 1 };
};

export default HomePage;
