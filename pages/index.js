import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import {API_URL} from '@/lib/index'
import Link from "next/link";

export default function HomePage({events}) {
  // console.log(events)
  return (
    <Layout>
        <h1>Upcoming Events</h1>

        {events.length === 0 && <h4>No events to show</h4>} 

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}

        {events.length > 0 && (
          <Link href="/events">
            <a className="btn-secondary">View all Events</a>
          </Link>
        )}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props: {events}
  }
}
