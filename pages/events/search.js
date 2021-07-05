import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import {API_URL} from '@/lib/index'
import qs from 'qs'
import { useRouter} from 'next/router'
import Link from 'next/link'

export default function EventPage({events}) {
  const router = useRouter()
  console.log(events)
  return (
    <Layout title="Search Results">
        <Link href="/events">
          <a>Go back</a>
        </Link>
        <h1>Search Results for {router.query.term}</h1>

        {events.length === 0 && <h4>No events to show</h4>} 

        

        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {

  const query = qs.stringify({
    _where: {
      _or: [
        {name_contains: term},
        {performance_contains: term},
        {description_contains: term},
        {venue_contains: term},
      ]
    }
  })

  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()

  return {
    props: {events}
  }
}
