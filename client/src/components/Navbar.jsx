import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <div className="font-bold text-xl">📝 Task Manager</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user && <Link to="/tasks">Tasks</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {user ? (
          <button onClick={logout} className="ml-4 underline">Logout</button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
