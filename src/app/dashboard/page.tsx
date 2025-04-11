'use client';

import { useState } from 'react';
import KnowledgeGraph from '@/components/dashboard/KnowledgeGraph';
import ProgressSummary from '@/components/dashboard/ProgressSummary';
import RecentLessons from '@/components/dashboard/RecentLessons';
import RecommendedNodes from '@/components/dashboard/RecommendedNodes';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import NodeDetailsSidebar from '@/components/dashboard/NodeDetailsSidebar';

export default function Dashboard() {
  const [selectedNode, setSelectedNode] = useState(null);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-4 h-[500px]">
            <h2 className="text-xl font-semibold mb-4">Your Knowledge Universe</h2>
            <KnowledgeGraph onNodeSelect={setSelectedNode} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-4">
              <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
              <ProgressSummary />
            </div>
            <div className="card p-4">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <RecentLessons />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {selectedNode ? (
            <NodeDetailsSidebar node={selectedNode} onClose={() => setSelectedNode(null)} />
          ) : (
            <div className="card p-4">
              <h2 className="text-xl font-semibold mb-4">Recommended Explorations</h2>
              <RecommendedNodes onNodeSelect={setSelectedNode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
