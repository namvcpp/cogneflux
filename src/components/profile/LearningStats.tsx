import React from 'react';

export default function LearningStats() {
  return (
    <div>
      <h2 className="section-title text-2xl mb-lg">Learning Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <div className="card p-lg">
          <h3 className="font-semibold text-lg">Topics Completed</h3>
          <p className="text-3xl font-bold mt-md">12</p>
        </div>
        <div className="card p-lg">
          <h3 className="font-semibold text-lg">Study Time</h3>
          <p className="text-3xl font-bold mt-md">24 hrs</p>
        </div>
        <div className="card p-lg">
          <h3 className="font-semibold text-lg">Streak</h3>
          <p className="text-3xl font-bold mt-md">5 days</p>
        </div>
        <div className="card p-lg">
          <h3 className="font-semibold text-lg">Practice Quizzes</h3>
          <p className="text-3xl font-bold mt-md">18</p>
        </div>
      </div>
    </div>
  );
}