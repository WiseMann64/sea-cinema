import {ChakraProvider} from '@chakra-ui/react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import MoviePage from './pages/MoviePage'
import Profile from './pages/Profile'
import { useState, useEffect } from 'react'
import Register from './pages/Register'

function App() {

  const [loginData,setLoginData] = useState<any>()
  const [loggedIn,setLoggedIn] = useState(false)

  const logout = () => {
    setLoginData(null)
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  const fetchData = () => {
    try {
      const token = localStorage.getItem('token')
      fetch('http://localhost:4000/auth/profile', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then(response => response.json())
      .then(res => {
          if (res.success) {
              setLoginData(res.user)
              setLoggedIn(true)
          } else {
              logout()
          }
      })
    } catch (error) {

    }
  }

  const getData = () => {
    return loginData
  }

  useEffect(() => {
    fetchData()
    console.log(loggedIn)
  }, [])

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout data={getData} logout={logout} fetchData={fetchData}/>}>
              <Route index element={<Home/>}/>
              <Route path='/movies/:id' element={<MoviePage loggedIn={loggedIn} />}/>
              <Route path='/profile' element={<Profile data={loginData}/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='*' element={<PageNotFound />}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
