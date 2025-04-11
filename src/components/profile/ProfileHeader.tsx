import React from 'react';

const ProfileHeader = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
        <img 
          src="/placeholder-avatar.png" 
          alt="Profile" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/80';
          }}
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">User Name</h1>
        <p className="text-gray-600">user@example.com</p>
      </div>
    </div>
  );
};

export default ProfileHeader;