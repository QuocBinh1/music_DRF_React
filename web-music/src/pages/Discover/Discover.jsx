//web-music/pages/Discover.jsx
import React, { useState } from 'react'
import './Discover.css'
import Header from '../../components/Header/Header'
import SongDisplay from '../../components/SongDisplay/SongDisplay'
const Discover = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <SongDisplay category={category} />
    </div>
  )
}

export default Discover