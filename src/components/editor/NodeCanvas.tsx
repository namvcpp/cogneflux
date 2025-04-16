'use client';

import { useEffect, useRef, useState } from 'react';

type NodeCanvasProps = {
  onSelectElement: (element: any) => void;
};

// Mock nodes for the demo UI
const initialNodes = [
  { id: 1, type: 'concept', title: 'Quantum Mechanics', x: 200, y: 150, width: 140, height: 60 },
  { id: 2, type: 'concept', title: 'Wave Functions', x: 400, y: 100, width: 140, height: 60 },
  { id: 3, type: 'concept', title: 'Uncertainty Principle', x: 450, y: 250, width: 160, height: 60 },
];

const initialConnections = [
  { id: 1, from: 1, to: 2, type: 'relationship' },
  { id: 2, from: 1, to: 3, type: 'relationship' },
];

export default function NodeCanvas({ onSelectElement }: NodeCanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [connections, setConnections] = useState(initialConnections);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Helper function to get a node's center point
  const getNodeCenter = (node: typeof initialNodes[0]) => {
    return {
      x: node.x + node.width / 2,
      y: node.y + node.height / 2
    };
  };
  
  // Handle mouse down on a node
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: number) => {
    e.stopPropagation();
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    setSelectedId(nodeId);
    onSelectElement(node);
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  // Handle mouse down on the canvas (deselect)
  const handleCanvasMouseDown = () => {
    setSelectedId(null);
    onSelectElement(null);
  };
  
  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || selectedId === null) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    setNodes(nodes.map(node => 
      node.id === selectedId 
        ? { ...node, x: node.x + dx, y: node.y + dy } 
        : node
    ));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  // Handle mouse up (end dragging)
  const handleMouseUp = () => {
    setDragging(false);
  };
  
  useEffect(() => {
    // Add mouseup listener to the window to catch mouseup outside the canvas
    const handleGlobalMouseUp = () => {
      if (dragging) {
        handleMouseUp();
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [dragging]); // Re-run effect if dragging state changes
  
  return (
    <div 
      ref={canvasRef}
      className="w-full h-full bg-gray-100 dark:bg-gray-800/50 overflow-hidden relative cursor-grab active:cursor-grabbing" 
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
    >
      <svg className="w-full h-full absolute top-0 left-0 pointer-events-none z-0">
        {connections.map(connection => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          
          if (!fromNode || !toNode) return null;
          
          const fromCenter = getNodeCenter(fromNode);
          const toCenter = getNodeCenter(toNode);
          
          return (
            <g key={`connection-${connection.id}`}>
              <line 
                x1={fromCenter.x} 
                y1={fromCenter.y} 
                x2={toCenter.x} 
                y2={toCenter.y} 
                className="stroke-gray-400 dark:stroke-gray-600" 
                strokeWidth="1.5"
              />
            </g>
          );
        })}
      </svg>
      
      {nodes.map(node => (
        <div
          key={node.id}
          className={`absolute flex items-center justify-center p-2 border rounded-md shadow-sm select-none cursor-move transition-all duration-150 ease-in-out
            ${node.id === selectedId 
              ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800 z-10 bg-white dark:bg-gray-700' 
              : 'border-gray-300 dark:border-gray-600 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 z-0 bg-white dark:bg-gray-700'
            }
            ${node.type === 'concept' 
              ? '' 
              : 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
            }`}
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`,
            width: `${node.width}px`,
            height: `${node.height}px`,
          }}
          onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
        >
          <div className="text-sm font-medium text-center text-gray-700 dark:text-gray-200 px-1">
            {node.title}
          </div>
        </div>
      ))}
    </div>
  );
}
