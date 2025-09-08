import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Please login to view your profile.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">Profile</h2>
      <p>Name: {user.name || 'N/A'}</p>
      <p>Email: {user.email || 'N/A'}</p>
      {/* Additional user details can be added here */}
    </div>
  );
};

export default Profile;
