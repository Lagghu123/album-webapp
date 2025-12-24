import React from 'react';
import { ViewState, User } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, user, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Photos', icon: 'image' },
    { id: 'album-detail', label: 'Albums', icon: 'folder_open' },
    { id: 'memories', label: 'Memories', icon: 'history' },
    { id: 'sharing', label: 'Sharing', icon: 'share' },
  ];

  return (
    <aside className="w-[280px] bg-[#0d121c] border-r border-white/5 flex flex-col h-full z-30 shadow-2xl hidden lg:flex">
      <div className="h-24 flex items-center px-8 gap-3 cursor-pointer" onClick={() => onChangeView('dashboard')}>
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-[24px]">photo_library</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-white">MEMORIA</h1>
      </div>

      <div className="px-6 mb-8">
        <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
          <img className="h-10 w-10 rounded-full border-2 border-primary object-cover" src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'} alt="Profile" />
          <div className="overflow-hidden">
            <p className="text-white text-sm font-bold truncate">{user?.name || 'Guest'}</p>
            <p className="text-primary text-[10px] font-black uppercase tracking-widest">{user?.role || 'User'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id as ViewState)}
            className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
              currentView === item.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/5 text-slate-500 font-bold text-sm hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;