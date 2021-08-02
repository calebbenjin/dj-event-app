import styles from '@/styles/Header.module.css'
import { useContext, useState } from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import Search from './Search'
import AuthContext from '@/context/AuthContext'

export default function Header() {
  // const [user, setUser] = useState(null)
  const { user, logout } = useContext(AuthContext)

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            <>
            <li>
              <Link href='/events/add'>
                <a>Add Events</a>
              </Link>
            </li>
            <li>
              <Link href='/accounts/dashboard'>
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <button className="btn btn-secondary" onClick={() => logout()} ><FaSignOutAlt /> Logout</button>
            </li>
            </>
          ) : (
            <>
              <li>
                <Link href='/accounts/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}
