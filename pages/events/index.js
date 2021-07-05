import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import {API_URL} from '@/lib/index'

export default function EventPage({events}) {
  // console.log(events)
  return (
    <Layout>
        <h1>Events</h1>

        {events.length === 0 && <h4>No events to show</h4>} 

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  return {
    props: {events}
  }
}
