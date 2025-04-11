'use client';

import Link from 'next/link';
import { FiClock, FiArrowRight } from 'react-icons/fi';

// Mock data for recent lessons
const recentLessons = [
  { 
    id: 'lesson-1', 
    title: 'Introduction to Calculus', 
    progress: 80, 
    lastAccessed: '2 hours ago' 
  },
  { 
    id: 'lesson-2', 
    title: 'Linear Algebra Fundamentals', 
    progress: 45, 
    lastAccessed: 'Yesterday' 
  },
  { 
    id: 'lesson-3', 
    title: 'Quantum Mechanics Basics', 
    progress: 20, 
    lastAccessed: '3 days ago' 
  },
];

export default function RecentLessons() {
  return (
    <div className="space-y-4">
      {recentLessons.map(lesson => (
        <div key={lesson.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
          <Link 
            href={`/lessons/${lesson.id}`}
            className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors p-2 -mx-2"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{lesson.title}</h3>
              <FiArrowRight className="mt-0.5 text-gray-400" />
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <div className="w-3/4">
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${lesson.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <FiClock className="mr-1" />
                {lesson.lastAccessed}
              </div>
            </div>
          </Link>
        </div>
      ))}
      
      <div className="text-center pt-2">
        <Link 
          href="/lessons" 
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
        >
          View all lessons
        </Link>
      </div>
    </div>
  );
}
