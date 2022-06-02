// our-domain.com/new-meetup

import { useRouter } from 'next/router';

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

      console.log(data); // BUG

      router.replace('/'); // programmatic navigation
    } catch (error) {
      console.error(`💥${error.message}💥`);
    }
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
