import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Sync from './pages/Sync'
import Async from './pages/Async'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index  element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/sync' element={<Sync/>} />
            <Route path='/async' element={<Async/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App