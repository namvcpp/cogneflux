'use client';

import React from 'react';

const AccountSettings = () => {
  return (
    <div className="mt-8"> {/* Add margin top */}
      {/* Use heading styles */}
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2> 
      <div className="space-y-8"> {/* Increased spacing */}
        
        {/* Personal Information Section */}
        <div>
          <h3 className="text-lg font-medium mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input type="text" id="name" className="input" defaultValue="User Name" /> {/* Use input class */}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" id="email" className="input" defaultValue="user@example.com" readOnly disabled /> {/* Make email read-only */}
            </div>
          </div>
        </div>
        
        {/* Password Section */}
        <div>
          <h3 className="text-lg font-medium mb-3">Password</h3>
          <button className="btn btn-outline">Change Password</button> {/* Use button class */}
        </div>
        
        {/* Preferences Section */}
        <div>
          <h3 className="text-lg font-medium mb-3">Preferences</h3>
          <div className="space-y-3"> {/* Increased spacing */}
            <div className="flex items-center">
              <input id="email-notifications" type="checkbox" className="checkbox mr-2" defaultChecked /> {/* Use checkbox class */}
              <label htmlFor="email-notifications" className="text-sm text-gray-700 dark:text-gray-300">Email notifications</label>
            </div>
            <div className="flex items-center">
              <input id="dark-mode" type="checkbox" className="checkbox mr-2" defaultChecked /> {/* Use checkbox class */}
              <label htmlFor="dark-mode" className="text-sm text-gray-700 dark:text-gray-300">Dark mode</label>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700"> {/* Add border top */}
          <button className="btn btn-secondary">Cancel</button> {/* Use button class */}
          <button className="btn btn-primary">Save Changes</button> {/* Use button class */}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;