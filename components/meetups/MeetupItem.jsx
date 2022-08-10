import { useRouter } from 'next/router';

import Card from '../ui/Card';

const MeetupItem = props => {
  const router = useRouter(); // programmatic navigation

  const showDetailsHandler = () => router.push(`/${props.id}`);

  return (
    <li className="item">
      <Card>
        <div className="box">
          <div className="image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="content">
            <h3>{props.title}</h3>
            <address>{props.address}</address>
          </div>
          <div className="actions">
            <button onClick={showDetailsHandler}>Show Details</button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
