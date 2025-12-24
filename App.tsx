import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { ViewState, User, Photo } from './types';
import Sidebar from './components/Sidebar';
import DashboardPage from './app/dashboard/page';
import LoginView from './src/views/LoginView'; // Sử dụng tạm path cũ cho login
import RegisterView from './src/views/RegisterView';
import MemoriesView from './src/views/MemoriesView';
import AlbumDetailView from './src/views/AlbumDetailView';
import Lightbox from './components/Lightbox';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) fetchProfile(session.user);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) fetchProfile(session.user);
      else { setUser(null); setView('login'); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser: any) => {
    try {
      const { data: profile } = await supabase.from('users').select('*').eq('id', authUser.id).single();
      setUser({
        id: authUser.id,
        email: authUser.email,
        name: profile?.full_name || authUser.user_metadata?.full_name || 'User',
        role: (profile?.role as 'Admin' | 'User') || 'User',
        avatar: profile?.avatar_url || authUser.user_metadata?.avatar_url || ''
      });
      if (view === 'login' || view === 'register') setView('dashboard');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setView('login');
  };

  if (loading) return (
    <div className="w-screen h-screen bg-[#05080f] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold tracking-widest text-xs uppercase animate-pulse">Initializing Memoria</p>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'login': return <LoginView onRegisterClick={() => setView('register')} />;
      case 'register': return <RegisterView onNavigateToLogin={() => setView('login')} onRegisterSuccess={() => setView('dashboard')} />;
      case 'dashboard': return <DashboardPage onNavigate={setView} />;
      case 'memories': return <MemoriesView />;
      case 'album-detail': return <AlbumDetailView onBack={() => setView('dashboard')} onPhotoClick={setLightboxPhoto} onLogout={handleLogout} />;
      default: return <DashboardPage onNavigate={setView} />;
    }
  };

  const showSidebar = view !== 'login' && view !== 'register';

  return (
    <div className="flex w-full h-full bg-[#05080f] text-white">
      {showSidebar && <Sidebar currentView={view} onChangeView={setView} user={user} onLogout={handleLogout} />}
      <main className="flex-1 h-full overflow-hidden flex flex-col">
        {renderContent()}
      </main>
      {lightboxPhoto && <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} onNext={() => {}} onPrev={() => {}} />}
    </div>
  );
};

export default App;