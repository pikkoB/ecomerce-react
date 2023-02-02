import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import Login from './components/Login'
import Purchases from './components/Purchases'
import AppNavBar from './components/AppNavBar'
import LoadingScrean from './components/LoadingScrean'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)
  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <AppNavBar />
      {isLoading && <LoadingScrean />}
      <Container className='my-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productDetail/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />


          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchases />} />
          </Route>

        </Routes>
      </Container>
    </HashRouter>

  )
}

export default App
