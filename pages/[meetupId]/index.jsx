// our-domain.com/[identifier]

import { DUMMY_MEETUPS } from '..';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = props => {
  return (
    <MeetupDetail
      id={props.meetupData.id}
      image={props.meetupData.image}
      title={props.meetupData.title}
      description={props.meetupData.description}
      address={props.meetupData.address}
    />
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      { params: { meetupId: 'm1' } },
      { params: { meetupId: 'm2' } },
      { params: { meetupId: 'm3' } },
      { params: { meetupId: 'm4' } },
    ],
  };
};

export const getStaticProps = async context => {
  // TODO: fetch data for a single meetup from API

  let image, title, description, address;

  const { meetupId } = context.params;
  //   console.log(meetupId);

  DUMMY_MEETUPS.forEach(data => {
    if (data.id === meetupId) {
      image = data.image;
      title = data.title;
      description = data.description;
      address = data.address;
    }
  });

  return {
    props: { meetupData: { id: meetupId, image, title, description, address } },
    revalidate: 10,
  };
};

export default MeetupDetails;
