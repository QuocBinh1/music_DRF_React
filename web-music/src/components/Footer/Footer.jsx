import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.spotify_logo} alt="" />
          <p>NhacCuaTui</p>
          <p>Chỉ dùng { } để nhúng biểu thức JavaScript (toán tử, hàm, biến, v.v.), không thể dùng câu lệnh (if, for, while, v.v.).</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Trang chủ</li>
            <li>Thực đơn</li>
            <li>Cửa hàng</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+84337084458</li>
            <li>nguyenthilinhnhi0000@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>COPYRIGHT © 2025 TOMATO VIỆT NAM</p>
    </div>
  )
}

export default Footer