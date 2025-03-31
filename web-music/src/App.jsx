import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Discover from './pages/Discover/Discover'
import Playlist from './pages/Playlist/Playlist'
import SongDetail from './components/SongDetail/SongDetail'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Discover />} />
          <Route path='/playlist' element={<Playlist />} />
          <Route path='/song/:id' element={<SongDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App