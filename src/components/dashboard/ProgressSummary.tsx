'use client';

import { useState } from 'react';

export default function ProgressSummary() {
  // Mocked progress data
  const [progressData] = useState({
    completed: 42,
    inProgress: 7,
    totalConcepts: 120,
    streak: 8,
    lastActivity: '2 hours ago',
    topCategory: 'Mathematics',
  });
  
  const percentComplete = Math.round((progressData.completed / progressData.totalConcepts) * 100);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600 dark:text-gray-300">Overall Progress</span>
        <span className="font-semibold">{percentComplete}%</span>
      </div>
      
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" 
          style={{ width: `${percentComplete}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{progressData.completed}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Concepts Mastered</div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{progressData.inProgress}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">In Progress</div>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{progressData.streak} days</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Current Streak</div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{progressData.topCategory}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Top Category</div>
        </div>
      </div>
    </div>
  );
}
