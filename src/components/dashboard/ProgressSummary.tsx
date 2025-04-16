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
    // Add padding and border to the container if needed, e.g., inside a card
    <div className="space-y-5"> {/* Increased spacing */}
      
      {/* Progress Bar Section */}
      <div>
        <div className="flex justify-between items-center mb-1.5"> {/* Reduced margin */}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Progress</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{percentComplete}%</span>
        </div>
        
        {/* Cleaner progress bar */}
        <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"> {/* Slightly thicker */}
          <div 
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500 ease-out" // Removed gradient for cleaner look
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4"> {/* Adjusted gap */}
        {/* Stat Box Component (Example) - Could be extracted */}
        <StatBox 
          value={progressData.completed} 
          label="Concepts Mastered" 
          color="blue" 
        />
        <StatBox 
          value={progressData.inProgress} 
          label="In Progress" 
          color="purple" 
        />
        <StatBox 
          value={`${progressData.streak} days`} 
          label="Current Streak" 
          color="orange" 
        />
        <StatBox 
          value={progressData.topCategory} 
          label="Top Category" 
          color="green" 
        />
      </div>
    </div>
  );
}

// Helper component for Stat Boxes
type StatBoxProps = {
  value: string | number;
  label: string;
  color: 'blue' | 'purple' | 'orange' | 'green'; // Add more colors as needed
};

function StatBox({ value, label, color }: StatBoxProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    orange: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    green: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  };

  return (
    // Cleaner padding, rounded corners, text sizes
    <div className={`p-4 rounded-lg ${colorClasses[color]}`}> 
      <div className="text-2xl font-bold mb-0.5">{value}</div> {/* Reduced margin */}
      <div className="text-xs font-medium uppercase tracking-wider opacity-80">{label}</div> {/* Adjusted label style */}
    </div>
  );
}
