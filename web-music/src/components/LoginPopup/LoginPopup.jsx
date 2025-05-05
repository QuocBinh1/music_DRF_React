import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({ setShowLogin, setIsLoggedIn }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currState, setCurrState] = useState("Login");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const fakeEmail = "test@gmail.com";
    const fakePassword = "123456";

    setTimeout(() => {
      if (email === fakeEmail && password === fakePassword) {
        alert("Đăng nhập thành công!");
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
      }
      setLoading(false);
    }, 1000);
  }
  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2>{currState === "Login" ? "Đăng nhập" : "Đăng ký"}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Đóng" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign up" && (
            <input type='text' placeholder='Nhập Tên' required />
          )}
          <input
            type='email'
            placeholder='Nhập Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Nhập Mật Khẩu'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : currState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup