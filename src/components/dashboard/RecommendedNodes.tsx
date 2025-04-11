'use client';

import { FiArrowRight, FiStar, FiTrendingUp } from 'react-icons/fi';

// Mock recommended node data
const recommendedNodes = [
  {
    id: 101,
    name: 'Differential Equations',
    category: 'concept',
    level: 2,
    reason: 'Based on your progress in Calculus',
    difficulty: 'Intermediate',
  },
  {
    id: 102,
    name: 'Eigenvalues & Eigenvectors',
    category: 'concept',
    level: 2,
    reason: 'Recommended for Linear Algebra',
    difficulty: 'Intermediate',
  },
  {
    id: 103,
    name: 'Probability Distributions',
    category: 'concept',
    level: 1,
    reason: 'Popular among similar learners',
    difficulty: 'Beginner',
  },
];

type RecommendedNodesProps = {
  onNodeSelect: (node: any) => void;
};

export default function RecommendedNodes({ onNodeSelect }: RecommendedNodesProps) {
  // Function to get node difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      {recommendedNodes.map(node => (
        <div 
          key={node.id}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNodeSelect(node)}
        >
          <div className="flex justify-between">
            <h3 className="font-medium">{node.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(node.difficulty)}`}>
              {node.difficulty}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center">
            <FiTrendingUp className="mr-1" />
            {node.reason}
          </p>
          
          <div className="flex justify-end mt-2">
            <button 
              className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onNodeSelect(node);
              }}
            >
              Explore <FiArrowRight className="ml-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
