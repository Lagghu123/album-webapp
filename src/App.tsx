import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { ViewState, Photo, User } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './views/DashboardView';
import AlbumDetailView from './views/AlbumDetailView';
import SharingView from './views/SharingView';
import UIKitView from './views/UIKitView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import MemoriesView from './views/MemoriesView';
import AdminPanelView from './views/AdminPanelView';
import Lightbox from './components/Lightbox';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth Listener
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setUser(null);
        setCurrentView('login');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser: any) => {
    try {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (userProfile) {
        setUser({
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.full_name,
          role: userProfile.role as 'Admin' | 'User',
          avatar: userProfile.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2AYn9gz_S9_In0dms7lYItxLwpHVQIGuE0uaQqD_Ku_5-hqZx5OsjVhOyK4hFrd2bnAdtS7Di-SlrF65naRPvo3Cr3cL6jydsZ-VbV4_mj74BkhtONY29JYpsb5OBYWpc8s3fsKzrYM8sKTTrk5mUHQlhqNzpdbqH2JmnnjdaGfWAM9wbMv9slyePwbjsTGVQo0_q6oumdqn_MdHb4IaIIn2hfwQWtipGnvnWSftfb47ohxx61-2BZ8ut00dxwZXvGFWXuKTfUl-K'
        });
      } else {
        setUser({
            id: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.full_name || 'User',
            role: 'User',
            avatar: authUser.user_metadata?.avatar_url || ''
        });
      }
      
      if (currentView === 'login' || currentView === 'register') {
          setCurrentView('dashboard');
      }

    } catch (error) {
      console.error('Error fetching profile', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentView('login');
  };

  if (loading) {
      return <div className="flex w-full h-full bg-background-dark items-center justify-center text-white">Loading Memoria...</div>;
  }

  // Simple render logic for views
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginView onRegisterClick={() => setCurrentView('register')} />;
      case 'register':
        return <RegisterView onNavigateToLogin={() => setCurrentView('login')} onRegisterSuccess={() => setCurrentView('dashboard')} />;
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
      {/* Sidebar logic */}
      {currentView !== 'login' && currentView !== 'register' && (
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