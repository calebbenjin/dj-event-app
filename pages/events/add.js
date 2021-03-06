import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/Form.module.css'
import { API_URL } from '@/lib/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function AddEventPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    performance: '',
    date: '',
    time: '',
    venue: '',
  })


  const router = useRouter()

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    
    const hasEmptyFields = Object.values(formData).some(element => element === '')

    if(hasEmptyFields) {
      toast.error('Pls fill in the form')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })   
    
    console.log(res)

    if(!res.ok) {
      toast('Something went wrong!')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e) => {

    const {name, value} = e.target

    setFormData({...formData, [name]: value })
  }

  return (
    <Layout>
      <Link href="/events">
        <a>Go Back</a>
      </Link>
      <h1>Add Events Page</h1>
      <ToastContainer />
      <form onSubmit={handleEditSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performer'>Performer</label>
            <input
              type='text'
              name='performance'
              id='performer'
              value={formData.performance}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Event Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={formData.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Event Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={formData.data}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Event Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Event Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleInputChange}></textarea>
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  )
}
