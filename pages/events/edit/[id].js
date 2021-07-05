import Layout from '@/components/Layout'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Form.module.css'
import { API_URL } from '@/lib/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaImage } from 'react-icons/fa'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'


export default function EditEventPage({evt}) {
  const [imagePreview, setImagePreview] = useState(evt.image[0] ? evt.image[0].formats.thumbnail.url : null);
  const [formData, setFormData] = useState({
    name: evt.name,
    description: evt.description,
    performance: evt.performance,
    date: evt.date,
    time: evt.time,
    address: evt.address,
    venue: evt.venue,
  })

  const [ showModal, setShowModal ] = useState(false)

  const router = useRouter()

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    
    const hasEmptyFields = Object.values(formData).some(element => element === '')

    if(hasEmptyFields) {
      toast.error('Pls fill in the form')
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })   
    
    // console.log(res)

    if(!res.ok) {
      toast('Something went wrong!')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()

    console.log(data.image.format.thumbnail.url)
    setShowModal(false)
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
      <h1>Edit Events</h1>
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
              value={moment(formData.data).format('yyyy-MM-DD')}
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

      <h4>Event Image</h4>
      {imagePreview ? (
        <Image src={imagePreview} alt="Event Image" height={200} width={200} /> 
      ) : <div>
        <p>No Image Uploaded</p>
      </div>}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({params: {id}}) {
  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  console.log(evt)

  return {
    props: {evt}
  }
}
