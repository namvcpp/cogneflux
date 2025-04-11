'use client';

import { useState } from 'react';
import LessonHeader from '@/components/lessons/LessonHeader';
import LessonContent from '@/components/lessons/LessonContent';
import LessonSidebar from '@/components/lessons/LessonSidebar';
import LessonNavigation from '@/components/lessons/LessonNavigation';
import RelatedConcepts from '@/components/lessons/RelatedConcepts';

export default function Lesson({ params }: { params: { id: string } }) {
  const [progress, setProgress] = useState(0);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <LessonHeader id={params.id} progress={progress} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <LessonSidebar lessonId={params.id} currentProgress={progress} />
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="card p-6">
            <LessonContent 
              lessonId={params.id} 
              onProgressUpdate={setProgress} 
            />
            
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <RelatedConcepts lessonId={params.id} />
            </div>
            
            <div className="mt-8 flex justify-between">
              <LessonNavigation lessonId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
