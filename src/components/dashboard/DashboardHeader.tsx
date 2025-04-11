'use client';

import { useState } from 'react';
import { FiFilter, FiRefreshCw, FiShare2 } from 'react-icons/fi';

export default function DashboardHeader() {
  const [username, setUsername] = useState('Alex');
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {username}</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Continue your learning journey from where you left off
        </p>
      </div>
      
      <div className="flex space-x-2 mt-4 md:mt-0">
        <button className="btn-secondary flex items-center gap-2">
          <FiFilter size={16} />
          <span>Filter</span>
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <FiRefreshCw size={16} />
          <span>Refresh</span>
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <FiShare2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
