'use client';

import { useState } from 'react';
import SearchBar from '@/components/lessons/SearchBar';
import LessonFilters from '@/components/lessons/LessonFilters';
import LessonGrid from '@/components/lessons/LessonGrid';
import PopularTopics from '@/components/lessons/PopularTopics';

export default function Lessons() {
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    duration: 'all',
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Lessons</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
            />
            <LessonFilters 
              filters={filters} 
              setFilters={setFilters} 
            />
            <PopularTopics />
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <LessonGrid 
            filters={filters} 
            searchQuery={searchQuery} 
          />
        </div>
      </div>
    </div>
  );
}
