import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { TabView, UserProfile, BloodRecord } from './types';
import * as Storage from './services/storageService';

// Pages
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import AIInsightsPage from './pages/AIInsightsPage';
import RecordModal from './components/RecordModal';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabView>(TabView.DASHBOARD);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // To trigger re-renders on data change
  const [editRecord, setEditRecord] = useState<BloodRecord | undefined>(undefined);

  useEffect(() => {
    // Check auth status
    const auth = Storage.isAuthenticated();
    setIsAuthenticated(auth);

    if (auth) {
      const profile = Storage.getProfile();
      setHasProfile(!!profile);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    const profile = Storage.getProfile();
    setHasProfile(!!profile);
  };

  const handleProfileSave = (profile: UserProfile) => {
    Storage.saveProfile(profile);
    setHasProfile(true);
    setActiveTab(TabView.DASHBOARD);
  };

  const handleRecordSave = (record: BloodRecord) => {
    Storage.saveRecord(record);
    setIsAddModalOpen(false);
    setEditRecord(undefined);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleRecordEdit = (record: BloodRecord) => {
    setEditRecord(record);
    setIsAddModalOpen(true);
  };

  const handleAddClick = () => {
    setEditRecord(undefined);
    setIsAddModalOpen(true);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (!hasProfile) {
    return <OnboardingPage onSave={handleProfileSave} />;
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} onAddClick={handleAddClick}>
      {activeTab === TabView.DASHBOARD && (
        <DashboardPage refreshTrigger={refreshTrigger} />
      )}
      {activeTab === TabView.HISTORY && (
        <HistoryPage refreshTrigger={refreshTrigger} onEdit={handleRecordEdit} />
      )}
      {activeTab === TabView.AI_INSIGHTS && (
        <AIInsightsPage refreshTrigger={refreshTrigger} />
      )}
      {activeTab === TabView.PROFILE && (
        <ProfilePage onLogout={() => {
          Storage.logoutUser();
          setIsAuthenticated(false);
        }} />
      )}

      {isAddModalOpen && (
        <RecordModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleRecordSave}
          initialData={editRecord}
        />
      )}
    </Layout>
  );
};

export default App;