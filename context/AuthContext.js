import {createContext, useState, useEffect} from 'react'
import router from 'next/router'
import {NEXT_URL} from '@/lib/index'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  // Register User
  const register = (user) => {
    console.log(user)
  }

  // User Login
  const login = async ({email: identifier, password}) => {

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    })

    const data = await res.json()

    console.log(data)

    if(res.ok) {
      setUser(data.user)
    } else {
      setError(data.message)
      setError(null)
    }
  }


  // Check if user is loged in
  const checkUserLoggedIn = () => {
    console.log('checked')
  }

  // Logout user
  const logout = () => {
    console.log('Logout')
  }

  return (
    <AuthContext.Provider value={{user, error, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext