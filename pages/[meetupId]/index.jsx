// our-domain.com/[identifier]

import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import { API_KEY } from '../../helper/helper';

const MeetupDetails = props => {
  const meetup = JSON.parse(props.meetupData);

  return (
    <MeetupDetail
      image={meetup.data.image}
      title={meetup.data.title}
      description={meetup.data.description}
      address={meetup.data.address}
    />
  );
};

export const getStaticPaths = async () => {
  // TODO: fetch meetups data from API

  let meetups;

  try {
    const client = await MongoClient.connect(API_KEY);
    const db = client.db(); // database

    const meetupsCollection = db.collection('meetups'); // like tables in a SQL database

    // prettier-ignore
    // Guard Clause
    if (meetupsCollection.countDocuments === 0) throw new Error('Data collection is empty!');

    meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();
  } catch (error) {
    // alert(`💥${error.message}💥`);
  }

  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async context => {
  // TODO: fetch data for a single meetup from API

  const { meetupId } = context.params;

  let meetups;

  try {
    const client = await MongoClient.connect(API_KEY); // like fetch()
    const db = client.db(); // database

    const meetupsCollection = db.collection('meetups'); // like tables in a SQL database

    const count = await meetupsCollection.countDocuments();

    // Guard Clause
    if (count === 0) throw new Error('Data collection is empty!');

    meetups = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    client.close();
  } catch (error) {
    console.error(`💥${error.message}💥`);
  }

  return { props: { meetupData: JSON.stringify(meetups) } };
};

export default MeetupDetails;
