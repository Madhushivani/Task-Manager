import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const AuthButton = ({ setUser }) => {
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('google_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setLocalUser(parsed);
      setUser(parsed);
    }
  }, [setUser]);

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userInfo = {
      name: decoded.name,
      email: decoded.email,
      photo: decoded.picture,
    };
    localStorage.setItem('google_user', JSON.stringify(userInfo));
    setLocalUser(userInfo);
    setUser(userInfo);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('google_user');
    setLocalUser(null);
    setUser(null);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      {localUser ? (
        <>
          <img
            src={localUser.photo}
            alt="avatar"
            className="w-12 h-12 rounded-full shadow"
          />
          <div className="text-left">
            <p className="font-medium text-indigo-800">{localUser.name}</p>
            <p className="text-xs text-gray-500">{localUser.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="w-full flex justify-center">
          <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')} />
        </div>
      )}
    </div>
  );
};

export default AuthButton;
