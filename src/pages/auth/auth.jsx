import React from 'react';
import './Auth.css'; // เราจะสร้างไฟล์ CSS นี้ในขั้นตอนถัดไป

const Auth = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <img 
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
          alt="Google Logo" 
          className="logo" 
        />
        <h1 className="title">ลงชื่อเข้าใช้</h1>
        <p className="subtitle">ใช้บัญชี Google ของคุณ</p>
        <form>
          <div className="input-group">
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              autoComplete="username" 
            />
            <label htmlFor="email">อีเมลหรือหมายเลขโทรศัพท์</label>
          </div>
          <div className="forgot-link-container">
            <a href="#" className="forgot-link">ลืมอีเมลใช่ไหม</a>
          </div>
          <p className="help-text">
            ยังไม่ได้ลงทะเบียน? <a href="#" className="create-account-link">สร้างบัญชี</a>
          </p>
          <div className="button-group">
            <button type="submit" className="next-button">ถัดไป</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;