import Head from 'next/head'
import Header from '@/components/Header'
import { useRouter} from 'next/router'
import styles from "@/styles/Layout.module.css"
import Footer from '@/components/Footer'
import Showcase from './Showcase'

export default function Layout({keywords, description, title, children}) {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  title: "DJ Events || Find the hottest parties",
  description: "DJ Events || Find the hottest parties and other Music Events",
  keywords: 'Music, Events, Parties, Shows, dj,'
}
