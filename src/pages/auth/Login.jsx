import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // Store the token for later use
    localStorage.setItem('google_token', credentialResponse.credential);
    // TODO: Add further login processing, e.g., redirect
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default Login;
