import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {

  const [menu, setMenu] = useState("discover");

  return (
    <div className='navbar'>
      <a href="https://nhacnhac-drab.vercel.app/"> <img src={assets.spotify_logo} alt="" className="spotify_logo"  /></a>
     
      <ul className='navbar-menu'>
        <li onClick={() => setMenu("discover")} className={menu === "discover" ? "active" : ""}>Khám phá</li>
        <li onClick={() => setMenu("song")} className={menu === "song" ? "active" : ""}>Bài hát</li>
        <li onClick={() => setMenu("playlist")} className={menu === "playlist" ? "active" : ""}>Playlist</li>
        <li onClick={() => setMenu("collection")} className={menu === "collection" ? "active" : ""}>Tuyển tập</li>
        <li onClick={() => setMenu("video")} className={menu === "video" ? "active" : ""}>Video</li>
        <li onClick={() => setMenu("rank")} className={menu === "rank" ? "active" : ""}>BXH</li>
        <li onClick={() => setMenu("top100")} className={menu === "top100" ? "active" : ""}>Top 100</li>
      </ul>
      <div className="navbar-right">
        
        <button className='sign-up'>Đăng nhập</button>
        <button className='sign-in'>Đăng ký</button>
      </div>
    </div>
  )
}

export default Navbar