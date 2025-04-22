import React, { useEffect, useState } from 'react';
import { FiCode, FiLoader } from 'react-icons/fi';

type ManimRendererProps = {
  manimCode: string | null;
  isVisible: boolean;
  mode: 'chat' | 'animation';
  className?: string;
};

export default function ManimRenderer({ manimCode, isVisible, mode, className = '' }: ManimRendererProps) {
  const [output, setOutput] = useState<{url: string, type: 'video' | 'image' | 'html'} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  
  useEffect(() => {
    if (!manimCode || !isVisible) {
      setOutput(null);
      setError(null);
      return;
    }
    
    const renderAnimation = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/manim/render', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: manimCode }),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `Server error: ${response.status}`);
        }
        
        const data = await response.json();
        setOutput(data);
      } catch (err) {
        console.error('Error rendering Manim animation:', err);
        setError(err instanceof Error ? err.message : 'Failed to render animation');
      } finally {
        setLoading(false);
      }
    };
    
    renderAnimation();
  }, [manimCode, isVisible]);
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className={`bg-black rounded-lg overflow-hidden flex flex-col ${className}`}>
      <div className="flex-1 flex items-center justify-center relative">
        {loading ? (
          <div className="text-center p-6">
            <div className="animate-spin w-10 h-10 mx-auto mb-4">
              <FiLoader className="w-full h-full text-blue-500" />
            </div>
            <p className="text-gray-300">Generating visualization...</p>
          </div>
        ) : error ? (
          <div className="text-center p-6 text-red-400">
            <p className="font-medium mb-2">Error generating animation</p>
            <p className="text-sm opacity-80 max-w-md mx-auto">{error}</p>
          </div>
        ) : output ? (
          output.type === 'html' ? (
            <iframe
              src={output.url}
              className="w-full h-full border-0"
              title="Manim Animation"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <img 
                src={output.url} 
                alt="Manim Visualization" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )
        ) : (
          <div className="text-center p-6 text-gray-400">
            <p>No visualization available</p>
          </div>
        )}
        
        {manimCode && (
          <button
            onClick={() => setShowCode(!showCode)}
            className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-full p-2"
            title="Toggle code view"
          >
            <FiCode size={18} />
          </button>
        )}
      </div>
      
      {showCode && manimCode && (
        <div className="bg-gray-900 border-t border-gray-800 p-4 max-h-[30vh] overflow-y-auto">
          <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">{manimCode}</pre>
        </div>
      )}
    </div>
  );
}
