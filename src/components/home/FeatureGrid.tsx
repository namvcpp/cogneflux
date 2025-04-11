import React from 'react';
import { 
  FiZap, 
  FiActivity, 
  FiCompass, 
  FiBarChart2, 
  FiUsers, 
  FiRefreshCw 
} from 'react-icons/fi';

type FeatureProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
};

const Feature = ({ title, description, icon: Icon, color }: FeatureProps) => (
  <div className="p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] bg-white dark:bg-gray-800">
    <div className={`w-14 h-14 flex items-center justify-center rounded-full ${color} mb-6`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const features = [
  {
    title: "Interactive Learning",
    description: "Engage with concepts through interactive visualizations that make complex ideas simple.",
    icon: FiZap,
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
  },
  {
    title: "Personalized Paths",
    description: "Learning journeys tailored to your goals, pace, and preferred learning style.",
    icon: FiCompass,
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300"
  },
  {
    title: "Cognitive Science",
    description: "Built on proven cognitive science principles for maximum retention and recall.",
    icon: FiActivity,
    color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
  },
  {
    title: "Progress Tracking",
    description: "Track your learning journey with detailed analytics and personalized insights.",
    icon: FiBarChart2,
    color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300"
  },
  {
    title: "Collaborative Learning",
    description: "Share and explore knowledge maps with peers to expand understanding together.",
    icon: FiUsers,
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300"
  },
  {
    title: "Adaptive Content",
    description: "Content that adapts to your learning style and pace for optimized knowledge retention.",
    icon: FiRefreshCw,
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300"
  }
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {features.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </div>
  );
}