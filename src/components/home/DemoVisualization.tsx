import React from 'react';
import { FiPlay, FiInfo } from 'react-icons/fi';

const DemoVisualization = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        {/* Placeholder for visualization */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative w-full h-full">
            {/* Decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/10"></div>
            <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-indigo-500/10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-purple-500/10"></div>
            
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4 transition-transform hover:scale-110 cursor-pointer">
                  <FiPlay size={24} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Click to start interactive demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Knowledge Graph Explorer</h3>
            <p className="text-gray-600 dark:text-gray-300">
              See how concepts connect in our interactive demo
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button className="btn-primary flex items-center">
              <FiPlay className="mr-2" />
              Explore Demo
            </button>
            <button className="btn-secondary flex items-center">
              <FiInfo className="mr-2" />
              How It Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoVisualization;