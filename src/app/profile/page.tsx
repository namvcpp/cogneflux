'use client';

import { useState } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import AccountSettings from '@/components/profile/AccountSettings';
import LearningStats from '@/components/profile/LearningStats';
import SavedContent from '@/components/profile/SavedContent';
import AchievementsList from '@/components/profile/AchievementsList';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('stats');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />
      
      <div className="mt-8">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6 card p-6">
          {activeTab === 'stats' && <LearningStats />}
          {activeTab === 'saved' && <SavedContent />}
          {activeTab === 'achievements' && <AchievementsList />}
          {activeTab === 'settings' && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}
