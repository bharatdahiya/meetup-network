import NewMeetUp from '../../components/meetups/NewMeetupForm';
import Head from "next/head";
import { Fragment } from 'react';
function AddMeetup() {
    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/add-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
    }
    return (
        <Fragment>
            <Head>
                <title>Add a Meetup !</title>
                <meta name="description"
                    content="Add new meetup to record." />
            </Head>
            <NewMeetUp onAddMeetup={addMeetupHandler}></NewMeetUp>
        </Fragment>
    );
}

export default AddMeetup;