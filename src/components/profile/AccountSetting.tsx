'use client';

import React from 'react';

const AccountSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="input input-bordered w-full" defaultValue="User Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="input input-bordered w-full" defaultValue="user@example.com" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Password</h3>
          <button className="btn btn-outline">Change Password</button>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Preferences</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" className="checkbox mr-2" defaultChecked />
              <span>Email notifications</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="checkbox mr-2" defaultChecked />
              <span>Dark mode</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button className="btn btn-outline">Cancel</button>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;