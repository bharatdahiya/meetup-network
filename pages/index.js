import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from 'mongodb';
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
    return (<Fragment>
        <Head>
            <title>Meetup Network</title>
            <meta name="description"
                content="It's a Meetup Network offered by Bharat, to schedule a meetup. It's based on NextJS Framework." />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>);
}

//Special fnction in NEXTJS
//Promes can be returned
//Static Generation: securely connect to db, never execute on client or server
export async function getStaticProps() {

    const client = await MongoClient.connect(
        'mongodb+srv://Bharat:xfwItlDt7pqPHQ1F@nextjs-cluster.semgr.mongodb.net/meetupsdata?retryWrites=true&w=majority',
        { useUnifiedTopology: true }
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const dataMeetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        //props mandatory to return
        props: {
            meetups: dataMeetups.map(meetup => ({
                title: meetup.title,
                description: meetup.description,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        //regenrate page for frequent data render after 10sec
        revalidate: 1
    };
}
export default HomePage;