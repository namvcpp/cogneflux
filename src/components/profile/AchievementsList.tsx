import React from 'react';

export default function AchievementsList() {
  return (
    <div className="mt-8">
      <h2 className="section-title text-xl mb-lg">Achievements</h2>
      <div className="content-spacing">
        <p className="text-muted">
          No achievements yet. Start learning to earn badges!
        </p>
        {/* Example structure for an achievement item:
        <div className="flex items-center card p-lg rounded-lg">
          <span className="text-2xl mr-lg">🏆</span>
          <div>
            <h3 className="font-medium">First Concept Mastered</h3>
            <p className="text-sm text-muted">Completed your first lesson.</p>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}