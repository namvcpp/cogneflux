'use client';

import { useState } from 'react';
import EditorToolbar from '@/components/editor/EditorToolbar';
import NodeCanvas from '@/components/editor/NodeCanvas';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import NodeLibrary from '@/components/editor/NodeLibrary';

export default function Editor() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [showLibrary, setShowLibrary] = useState(true);
  
  return (
    <div className="flex flex-col h-screen">
      <EditorToolbar 
        showLibrary={showLibrary} 
        toggleLibrary={() => setShowLibrary(!showLibrary)} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {showLibrary && (
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <NodeLibrary />
          </div>
        )}
        
        <div className="flex-1 relative">
          <NodeCanvas 
            onSelectElement={setSelectedElement} 
          />
        </div>
        
        {selectedElement && (
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            <PropertiesPanel 
              element={selectedElement} 
              onClose={() => setSelectedElement(null)} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
