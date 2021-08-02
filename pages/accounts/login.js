import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import styles from '@/styles/Form.module.css'
import { FaUser } from 'react-icons/fa'
import Layout from "@/components/Layout";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '@/context/AuthContext';


export default function LoginPage() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState(''); 

  const {login, error} = useContext(AuthContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password })

  }

  return (
    <Layout title="User Login">
      <div className={styles.form}>
        <h2> <FaUser /> Log in</h2>
        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button className="btn" type="submit">Login</button>
          </div>
        </form>

        <p>
          Don't have an Account? <Link href="/accounts/register"><a>Register</a></Link>
        </p>
      </div>
    </Layout>
  )
}
