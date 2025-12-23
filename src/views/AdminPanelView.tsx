import React, { useState } from 'react';

const AdminPanelView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'settings'>('overview');

  // Dummy Users Data
  const users = [
      { id: 1, name: 'Alex Doe', email: 'alex@example.com', role: 'Admin', status: 'Active', storage: '45%' },
      { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'User', status: 'Active', storage: '12%' },
      { id: 3, name: 'John Brown', email: 'john@example.com', role: 'User', status: 'Suspended', storage: '80%' },
      { id: 4, name: 'Emily White', email: 'emily@example.com', role: 'User', status: 'Active', storage: '5%' },
      { id: 5, name: 'Michael Lee', email: 'mike@example.com', role: 'User', status: 'Active', storage: '32%' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark h-full p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Super Admin</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Admin Console</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage system resources, users, and global settings.</p>
            </div>
            <div className="flex gap-2 bg-surface-dark border border-white/5 p-1 rounded-lg">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Users
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Settings
                </button>
            </div>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <span className="material-symbols-outlined text-2xl">group</span>
                            </div>
                            <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">1,240</h3>
                        <p className="text-slate-400 text-sm">Total Active Users</p>
                    </div>

                    <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                         <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                                <span className="material-symbols-outlined text-2xl">hard_drive</span>
                            </div>
                             <span className="text-slate-500 text-xs font-bold">
                                85% Full
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">4.2 TB</h3>
                        <p className="text-slate-400 text-sm">Total Storage Used</p>
                         <div className="w-full bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                             <div className="bg-secondary w-[85%] h-full rounded-full"></div>
                         </div>
                    </div>

                    <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                         <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                                <span className="material-symbols-outlined text-2xl">photo_album</span>
                            </div>
                            <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">trending_up</span> +5%
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">8,932</h3>
                        <p className="text-slate-400 text-sm">Total Albums Created</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-surface-dark border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Recent System Activity</h3>
                    <div className="space-y-4">
                        {[1,2,3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                                    <span className="material-symbols-outlined text-[20px]">dns</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">System Backup Completed</p>
                                    <p className="text-xs text-slate-500">Database snapshot successfully stored.</p>
                                </div>
                                <span className="text-xs text-slate-500 font-mono">14:30 PM</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
            <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">User Directory</h3>
                    <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">User</th>
                                <th className="p-4 font-semibold">Role</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Storage</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium text-sm">{user.name}</span>
                                            <span className="text-slate-500 text-xs">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-700 text-slate-300'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                         <span className={`flex items-center gap-1.5 text-xs font-medium ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-300 text-sm font-mono">{user.storage}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
                                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-surface-dark border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">General Settings</h3>
                    <div className="space-y-6">
                         <div className="flex items-center justify-between">
                             <div>
                                 <p className="text-white font-medium text-sm">Maintenance Mode</p>
                                 <p className="text-slate-500 text-xs">Disable access for all non-admin users.</p>
                             </div>
                             <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                                 <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                             </div>
                         </div>
                         <div className="flex items-center justify-between">
                             <div>
                                 <p className="text-white font-medium text-sm">Allow Public Registration</p>
                                 <p className="text-slate-500 text-xs">New users can sign up without invitation.</p>
                             </div>
                             <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                             </div>
                         </div>
                    </div>
                 </div>

                 <div className="bg-surface-dark border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Storage & Limits</h3>
                    <div className="space-y-4">
                        <div>
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Default Storage Limit (GB)</label>
                             <input type="number" defaultValue={10} className="w-full bg-black/20 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
                        </div>
                        <div>
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Max File Upload Size (MB)</label>
                             <input type="number" defaultValue={50} className="w-full bg-black/20 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
                        </div>
                        <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-colors border border-white/5">Save Changes</button>
                    </div>
                 </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanelView;
