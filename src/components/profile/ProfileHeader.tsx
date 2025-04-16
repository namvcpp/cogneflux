import React from 'react';

const ProfileHeader = () => {
  return (
    // Increased spacing
    <div className="flex items-center space-x-6 mb-8"> 
      {/* Slightly larger avatar */}
      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
        <img 
          src="/placeholder-avatar.png" 
          alt="Profile" 
          className="w-full h-full object-cover"
          onError={(e) => {
            // More robust placeholder
            e.currentTarget.src = `https://ui-avatars.com/api/?name=User+Name&background=random&size=96`; 
          }}
        />
      </div>
      <div>
        {/* Use heading styles from globals.css */}
        <h1 className="text-3xl font-bold mb-1">User Name</h1> 
        {/* Use paragraph styles */}
        <p className="text-gray-500 dark:text-gray-400">user@example.com</p> 
      </div>
    </div>
  );
};

export default ProfileHeader;