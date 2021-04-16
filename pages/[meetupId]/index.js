import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import Head from 'next/head';
import { Fragment } from "react";
function MeetupDetailsPage(props) {

    return (<Fragment>
        <Head>
            <title>Meetup Details</title>
            <meta name={props.meetups.title}
                content={props.meetups.description} />
        </Head>
        <MeetupDetails
            image={props.meetups.image}
            title={props.meetups.title}
            description={props.meetups.description}
            address={props.meetups.address}
        /></Fragment>);
}
export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://Bharat:xfwItlDt7pqPHQ1F@nextjs-cluster.semgr.mongodb.net/meetupsdata?retryWrites=true&w=majority',
        { useUnifiedTopology: true }
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetups = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    client.close();

    return {
        //props mandatory to return
        props: {
            meetups: {
                id: selectedMeetups._id.toString(),
                title: selectedMeetups.title,
                address: selectedMeetups.address,
                description: selectedMeetups.description,
                image: selectedMeetups.image
            },
            //regenrate page for frequent data render after 10sec
            revalidate: 10
        }
    }
}
export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://Bharat:xfwItlDt7pqPHQ1F@nextjs-cluster.semgr.mongodb.net/meetupsdata?retryWrites=true&w=majority',
        { useUnifiedTopology: true }
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const dataMeetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: dataMeetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
    }
}
export default MeetupDetailsPage;