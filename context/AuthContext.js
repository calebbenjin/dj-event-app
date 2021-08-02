import {createContext, useState, useEffect} from 'react'
import router from 'next/router'
import {NEXT_URL} from '@/lib/index'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const [error, setError] = useState(null);


  // Register User
  const register = (user) => {
    console.log(user)
  }

  // User Login
  const login = ({email: identifier, password}) => {
    console.log({identifier, password})
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