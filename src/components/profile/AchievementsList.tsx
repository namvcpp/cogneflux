import React from 'react';

export default function AchievementsList() {
  return (
    <div className="mt-8"> {/* Add margin top */}
      {/* Use heading styles */}
      <h2 className="text-xl font-semibold mb-4">Achievements</h2> 
      <div className="space-y-4">
        {/* Use paragraph styles */}
        <p className="text-gray-500 dark:text-gray-400"> 
          No achievements yet. Start learning to earn badges!
        </p>
        {/* Achievement items will be displayed here */}
        {/* Example structure for an achievement item:
        <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="text-2xl mr-4">🏆</span>
          <div>
            <h3 className="font-medium">First Concept Mastered</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed your first lesson.</p>
          </div>
        </div> 
        */}
      </div>
    </div>
  );
}