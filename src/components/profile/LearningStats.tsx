import React from 'react';

export default function LearningStats() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Learning Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat-card p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Topics Completed</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="stat-card p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Study Time</h3>
          <p className="text-3xl font-bold mt-2">24 hrs</p>
        </div>
        <div className="stat-card p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Streak</h3>
          <p className="text-3xl font-bold mt-2">5 days</p>
        </div>
        <div className="stat-card p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Practice Quizzes</h3>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>
      </div>
    </div>
  );
}