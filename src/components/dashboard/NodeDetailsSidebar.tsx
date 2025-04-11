'use client';

import { FiX, FiExternalLink, FiBook, FiCheckCircle, FiLayers } from 'react-icons/fi';
import Link from 'next/link';

type NodeDetailsSidebarProps = {
  node: any; // Type will be refined when we have a proper node structure
  onClose: () => void;
};

export default function NodeDetailsSidebar({ node, onClose }: NodeDetailsSidebarProps) {
  // Mock related lessons and nodes
  const relatedLessons = [
    { id: 'lesson-1', title: 'Introduction to Calculus' },
    { id: 'lesson-2', title: 'Advanced Mathematics' },
  ];
  
  const relatedNodes = [
    { id: 201, name: 'Integration', category: 'concept' },
    { id: 202, name: 'Derivatives', category: 'concept' },
  ];
  
  return (
    <div className="card p-4 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <FiX size={20} />
      </button>
      
      <div className="pt-2 pb-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{node.name}</h2>
          
          <div className="flex space-x-2 mb-4">
            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
              {node.category}
            </span>
            {node.level !== undefined && (
              <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                Level {node.level}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300">
            This node represents knowledge about {node.name}. Explore related concepts and lessons to deepen your understanding.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
              <FiBook className="mr-2" />
              Related Lessons
            </h3>
            <ul className="space-y-2">
              {relatedLessons.map(lesson => (
                <li key={lesson.id}>
                  <Link 
                    href={`/lessons/${lesson.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    {lesson.title}
                    <FiExternalLink className="ml-1" size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
              <FiLayers className="mr-2" />
              Connected Concepts
            </h3>
            <ul className="space-y-2">
              {relatedNodes.map(relNode => (
                <li key={relNode.id} className="flex items-center">
                  <button 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    // Would typically load a new node here
                  >
                    {relNode.name}
                  </button>
                  <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-0.5 rounded">
                    {relNode.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="btn-primary w-full flex items-center justify-center">
            <FiCheckCircle className="mr-2" />
            Add to Learning Path
          </button>
        </div>
      </div>
    </div>
  );
}
