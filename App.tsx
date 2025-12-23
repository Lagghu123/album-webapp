import React, { useState } from 'react';
import { ViewState, Photo, User } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './views/DashboardView';
import AlbumDetailView from './views/AlbumDetailView';
import SharingView from './views/SharingView';
import UIKitView from './views/UIKitView';
import LoginView from './views/LoginView';
import MemoriesView from './views/MemoriesView';
import AdminPanelView from './views/AdminPanelView';
import Lightbox from './components/Lightbox';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  
  // User State
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string) => {
    // Logic to determine role based on email
    const isAdmin = email === 'admin@gmail.com';
    
    setUser({
      email: email,
      name: email.split('@')[0], // Extract name from email for demo
      role: isAdmin ? 'Admin' : 'User',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2AYn9gz_S9_In0dms7lYItxLwpHVQIGuE0uaQqD_Ku_5-hqZx5OsjVhOyK4hFrd2bnAdtS7Di-SlrF65naRPvo3Cr3cL6jydsZ-VbV4_mj74BkhtONY29JYpsb5OBYWpc8s3fsKzrYM8sKTTrk5mUHQlhqNzpdbqH2JmnnjdaGfWAM9wbMv9slyePwbjsTGVQo0_q6oumdqn_MdHb4IaIIn2hfwQWtipGnvnWSftfb47ohxx61-2BZ8ut00dxwZXvGFWXuKTfUl-K'
    });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  // Simple render logic for views
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginView onLogin={handleLogin} />;
      case 'dashboard':
        return <DashboardView onChangeView={setCurrentView} />;
      case 'album-detail':
        return (
          <AlbumDetailView
            onBack={() => setCurrentView('dashboard')}
            onPhotoClick={(photo) => setLightboxPhoto(photo)}
            onLogout={handleLogout}
          />
        );
      case 'sharing':
        return <SharingView />;
      case 'ui-kit':
        return <UIKitView />;
      case 'memories':
        return <MemoriesView />;
      case 'admin':
        return <AdminPanelView />;
      default:
        return <DashboardView onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex w-full h-full bg-background-dark text-white">
      {/* Sidebar logic - Updated to show on all screens except login */}
      {currentView !== 'login' && (
        <Sidebar 
          currentView={currentView} 
          onChangeView={setCurrentView} 
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-hidden relative flex flex-col">
        {renderView()}
      </div>

      {/* Lightbox Overlay */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          onNext={() => {}} // Placeholder for next logic
          onPrev={() => {}} // Placeholder for prev logic
        />
      )}
    </div>
  );
};

export default App;