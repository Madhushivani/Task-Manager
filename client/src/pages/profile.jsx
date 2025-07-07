import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">User Profile</h2>
      <img src={user.picture} alt="avatar" className="rounded-full w-24 h-24 mb-4" />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
