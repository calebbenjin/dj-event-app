import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import styles from '@/styles/Form.module.css'
import { FaUser } from 'react-icons/fa'
import Layout from "@/components/Layout";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '@/context/AuthContext';


export default function RegisterPage() {
  const [ userName, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState(''); 
  const [ confirmPassword, setConfirmPassword ] = useState(''); 


  const {register, error} = useContext(AuthContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(password != confirmPassword) {
      toast.error('Password do not match')
      return
    }

    register({ email, password, userName })

  }

  return (
    <Layout title="User Register">
      <div className={styles.form}>
        <h2> <FaUser /> Register</h2>
        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div>
            <button className="btn" type="submit">Register</button>
          </div>
        </form>

        <p>
          Already have an Account? <Link href="/accounts/login"><a>Login</a></Link>
        </p>
      </div>
    </Layout>
  )
}
