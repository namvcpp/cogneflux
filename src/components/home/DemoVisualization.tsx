import React from 'react';
import { FiPlay, FiInfo } from 'react-icons/fi';

const DemoVisualization = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-8">
      {/* Placeholder for visualization or image */}
      <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg mb-6">
        {/* Content for visualization area can go here */}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Text content */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-1">Knowledge Graph Explorer</h3>
          <p className="text-gray-600 dark:text-gray-300">
            See how concepts connect in our interactive demo.
          </p>
        </div>

        {/* Action button */}
        <div className="flex-shrink-0">
            <button className="btn btn-primary flex items-center sm:w-auto justify-center mx-auto">
            <FiPlay className="mr-2" />
            Explore Demo
            </button>
        </div>
      </div>
    </div>
  );
};

export default DemoVisualization;