import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = (credentialResponse) => {
    // เก็บ token ที่ได้จาก Google ลง localStorage
    localStorage.setItem('google_token', credentialResponse.credential);
    navigate('/profile');
  };

  const handleRegisterFailure = (error) => {
    console.error('Google Register Failed:', error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">ลงทะเบียนด้วย Google</h2>
        <GoogleLogin
          onSuccess={handleRegisterSuccess}
          onError={handleRegisterFailure}
        />
      </div>
    </div>
  );
};

export default Register;
