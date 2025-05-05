import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
const Navbar = ({ setShowLogin, isLoggedIn }) => {

  const [menu, setMenu] = useState("discover");
  const navigate = useNavigate();

  const handleMenuClick = (menuName, path) => {
    setMenu(menuName);
    navigate(path);
  }
  return (
    <div className='navbar'>
        <a href="https://nhacnhac-drab.vercel.app/"> <img src={assets.spotify_logo} alt="" className="spotify_logo"  /></a>
        <ul className='navbar-menu'>
        <li onClick={() => handleMenuClick("discover", "/")} className={menu === "discover" ? "active" : ""}>Khám phá</li>
        <li onClick={() => setMenu("song")} className={menu === "song" ? "active" : ""}>Bài hát</li>
        <li onClick={() => handleMenuClick("playlist", "/playlist")} className={menu === "playlist" ? "active" : ""}>Playlist</li>
        <li onClick={() => setMenu("collection")} className={menu === "collection" ? "active" : ""}>Tuyển tập</li>
        <li onClick={() => setMenu("video")} className={menu === "video" ? "active" : ""}>Video</li>
        <li onClick={() => setMenu("rank")} className={menu === "rank" ? "active" : ""}>BXH</li>
        <li onClick={() => setMenu("top100")} className={menu === "top100" ? "active" : ""}>Top 100</li>
      </ul>
      <div className="navbar-right">
        <div className='search-box'>
          <img src={assets.search_icon} alt="" />
          <input className='search-input' type="text" placeholder="Tìm kiếm" />
        </div>
        {isLoggedIn ? (
          <img src={assets.user_avatar} alt="Avatar" className='avatar-icon' />
        ) : (
          <button className='sign-up' onClick={() => setShowLogin(true)}>Đăng nhập</button>
        )}

        <button className='sign-in'>Đăng ký</button>
      </div>
    </div>
  )
}

export default Navbar
