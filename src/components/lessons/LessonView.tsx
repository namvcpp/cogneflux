'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiBookOpen } from 'react-icons/fi';

interface LessonViewProps {
  title?: string;
  content?: string;
  isVisible: boolean;
}

export default function LessonView({ title = "3Blue1Brown Style Lesson", content, isVisible }: LessonViewProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div 
        className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <FiBookOpen className="text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        </div>
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4">
          {content ? (
            <div className="prose dark:prose-invert prose-blue max-w-none">
              {/* In a real implementation, you would render formatted content */}
              <p>{content}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">No lesson content available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
