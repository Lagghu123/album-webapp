import React from 'react';
import { ViewState, User } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, user, onLogout }) => {
  return (
    <aside className="w-[250px] bg-[#111827] border-r border-white/5 flex flex-col h-full flex-shrink-0 z-30 shadow-xl hidden lg:flex">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 gap-3 cursor-pointer" onClick={() => onChangeView('dashboard')}>
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-[20px]">photo_library</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Memoria</h1>
      </div>

      {/* User Profile Card */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => user?.role === 'Admin' && onChangeView('admin')}>
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border-2 border-primary"
            style={{ backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZk-sH3qbA2FIRvk4wiLUSZee-0uISECqhWnHKYHK2DUb46hXpIAterLSUumi1LvAsZ4CsSKa4zq1v2vZ_gOJVG62rPyAEOFVZwkQzlgoD6mN7T7_G07kAoxSie2lrxFXfVKEOoPJ-1LlIKnh7UZJQOKqD0d8aW2t54mxvaCOidua9vS4AgHbBvbO4f7im-dtvG-rjWov3pB17t5GQpllZwHzrlCe1O9QYFznO04KTewu0yMrnrHkV8oTE304dMwBEVL396qSJViDd'}")` }}
          ></div>
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-white text-sm font-semibold truncate">{user?.name || 'Guest'}</h2>
            <p className="text-primary text-xs font-bold flex items-center gap-1">
               {user?.role === 'Admin' ? 'Admin User' : user?.email || 'User'}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-2">
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors material-symbols-outlined text-[18px]">search</span>
          <input 
            type="text" 
            placeholder="Search photos..." 
            className="w-full bg-[#05080f] border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
             <kbd className="hidden group-focus-within:hidden bg-white/10 text-[10px] text-slate-400 px-1.5 py-0.5 rounded font-sans">⌘</kbd>
             <kbd className="hidden group-focus-within:hidden bg-white/10 text-[10px] text-slate-400 px-1.5 py-0.5 rounded font-sans">K</kbd>
          </div>
        </div>
      </div>

      {/* Scrollable Nav */}
      <div className="flex-1 overflow-y-auto px-4 space-y-8 pt-2">
        {/* Main Navigation */}
        <div className="flex flex-col gap-1">
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Library</p>
          <button
            onClick={() => onChangeView('dashboard')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group w-full text-left ${
              currentView === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined" style={currentView === 'dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>
              image
            </span>
            <span className="text-sm font-medium">Photos</span>
          </button>
          <button
            onClick={() => onChangeView('album-detail')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group w-full text-left ${
              currentView === 'album-detail' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined">folder_open</span>
            <span className="text-sm font-medium">Albums</span>
          </button>
          <button
            onClick={() => onChangeView('memories')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group w-full text-left ${
              currentView === 'memories' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined">history</span>
            <span className="text-sm font-medium">Memories</span>
          </button>
          <button
            onClick={() => onChangeView('sharing')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group w-full text-left ${
              currentView === 'sharing' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined">share</span>
            <span className="text-sm font-medium">Sharing</span>
          </button>
        </div>

        {/* Admin Tools - Conditionally Rendered */}
        {user?.email === 'admin@gmail.com' && (
          <div className="flex flex-col gap-1">
             <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Management</p>
             <button
              onClick={() => onChangeView('admin')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group w-full text-left ${
                currentView === 'admin' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span className="text-sm font-medium">Admin Panel</span>
            </button>
          </div>
        )}

        {/* AI Smart Folders */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Smart Folders</p>
            <span className="material-symbols-outlined text-slate-600 text-[16px]">auto_awesome</span>
          </div>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors group w-full text-left">
            <span className="material-symbols-outlined">face</span>
            <span className="text-sm font-medium">People & Faces</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors group w-full text-left">
            <span className="material-symbols-outlined">location_on</span>
            <span className="text-sm font-medium">Places</span>
          </button>
          <button
            onClick={() => onChangeView('ui-kit')}
             className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group w-full text-left ${
              currentView === 'ui-kit' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined">design_services</span>
            <span className="text-sm font-medium">UI Kit</span>
          </button>
        </div>
      </div>

      {/* Storage & Logout */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">cloud</span>
              <p className="text-white text-sm font-medium">Storage</p>
            </div>
            <p className="text-primary text-xs font-bold">45%</p>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between items-center">
             <p className="text-slate-500 text-[10px] font-medium">45GB / 100GB</p>
             <button className="text-[10px] font-bold text-primary hover:text-white transition-colors">Upgrade</button>
          </div>
          <button 
            onClick={onLogout}
            className="mt-1 w-full flex items-center justify-center gap-2 py-2 border border-slate-700 rounded-lg text-xs font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;