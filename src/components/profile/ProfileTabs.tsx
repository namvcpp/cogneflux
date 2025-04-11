import React from 'react';

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'stats', label: 'Learning Stats' },
    { id: 'saved', label: 'Saved Content' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'settings', label: 'Account Settings' }
  ];

  return (
    <div className="flex space-x-2 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 ${
            activeTab === tab.id
              ? 'text-primary-600 border-b-2 border-primary-600 font-medium'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;