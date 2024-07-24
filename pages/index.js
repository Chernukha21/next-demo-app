import MeetupList from '../components/meetups/MeetupList'
import {MongoClient} from 'mongodb'
import Head from "next/head";

const HomePage = ({meetups}) => {
    return (
        <>
            <Head>
                <title>
                    next project
                </title>
                <meta name="description" content="meetups"/>
            </Head>
            <MeetupList meetups={meetups}/>
        </>
    )
}

export async function getStaticProps() {
    const uri = process.env.MONGODB_URI;
    let client;
    client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                description: meetup.description,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            })),
        },
        revalidate: 1
    }

}

export default HomePage;