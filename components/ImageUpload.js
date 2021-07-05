import { useState } from 'react'
import { API_URL } from '@/lib/index'
import styles from "@/styles/Form.module.css"

export default function ImageUpload({evtId, imageUploaded}) {
  const [image, setImage ] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refid', evtId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    })

    if(res.ok) {
      imageUploaded()
    }

    console.log();
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }


  return (
    <div className={styles.form}>
      <h2>Upload Event Image</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  )
}
