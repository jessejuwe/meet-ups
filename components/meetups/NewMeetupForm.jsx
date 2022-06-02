import { useRef, useState } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

const NewMeetupForm = props => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    setIsUploading(true);

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    // TODO: Validation
    if (enteredTitle.trim().length === 0) setError(true);
    if (enteredImage.trim().length < 5) setError(true);
    if (enteredAddress.trim().length < 5) setError(true);
    if (enteredDescription.trim().length === 0) setError(true);

    setError(false);

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);

    setIsUploading(false);

    // TODO: clear input fields
    titleInputRef.current.value = imageInputRef.current.value = '';
    addressInputRef.current.value = descriptionInputRef.current.value = '';
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label className={error ? classes.error : ''} htmlFor="title">
            Meetup Title
          </label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label className={error ? classes.error : ''} htmlFor="image">
            Meetup Image
          </label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label className={error ? classes.error : ''} htmlFor="address">
            Address
          </label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label className={error ? classes.error : ''} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button
            disabled={isUploading ? true : false}
            className={isUploading ? classes.uploading : classes['add-meetup']}
          >
            {!isUploading ? 'Add Meetup' : 'Uploading...'}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
