import React from 'react';

const UIKitView: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-12">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-white">
              Memoria <span className="text-primary">UI Kit</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Isolated interface components for a secure, shared photo album application. Featuring glassmorphism, deep charcoal themes, and privacy-focused interactions.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2 rounded-md bg-surface-dark border border-white/5 text-xs text-slate-400 font-medium uppercase tracking-wider">
              Desktop
            </div>
            <div className="px-4 py-2 rounded-md bg-surface-dark border border-white/5 text-xs text-slate-400 font-medium uppercase tracking-wider">
              Dark Mode
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Upload Modal */}
          <div className="flex flex-col gap-6 lg:col-span-1 h-full">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 pl-1">01. Upload Modal</div>
            <div className="rounded-md bg-surface-dark border border-white/5 shadow-2xl overflow-hidden flex flex-col h-full">
              <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-surface-dark/50 backdrop-blur-sm">
                <h3 className="font-semibold text-white">Upload Photos</h3>
                <button className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-white/5">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="p-5 flex flex-col gap-6 flex-1">
                <div className="group relative flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-slate-600 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer py-10">
                  <div className="w-12 h-12 rounded-full bg-surface-highlight flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(55,128,246,0.5)]">
                    <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white">Drop Zone</p>
                    <p className="text-xs text-slate-400 mt-1">Drag & drop photos here</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 group">
                     <div className="w-10 h-10 rounded-md bg-slate-800 bg-cover bg-center shrink-0 border border-white/5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBY9po2OMNbbU90kX_IMxk-3bVV_s90drBDTXOOHue8Oqx5JxBPtjAytWI0J1ILOCRr8wBAWqbZfQInb6Hi6iTcSUqY_TMNPVtj6gDs9Wtj7HZexuCWKtAVO0kA6_ekvQdGDSLAbSDkynwzUxbMq89y-kebI4WYeYnhLGzyDggVb1C-o_a3uY4eel3xMnNuBrQV_wlgmszBtKNGLL-A6A084HLsHrK_8t1fXb66jJG6yqGbJxTRkU5pm-fXVkSf7HTk1riPZLgzYNc0')"}}></div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1.5 items-center">
                            <p className="text-sm font-medium text-white truncate">IMG_3024.jpg</p>
                            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-highlight rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-full rounded-full"></div>
                        </div>
                     </div>
                  </div>
                   <div className="flex items-center gap-3 group">
                     <div className="w-10 h-10 rounded-md bg-slate-800 bg-cover bg-center shrink-0 border border-white/5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPgMHLrsJdxWx8bgBGzVBqgr_g1ogtAexpi2OVJEhdI-c6sqB-B-l1FFrgahzM8GSTw9fcG2__FAd_UgipswwMaV8GENT9a5367b_JX-g1i5ecMhXj9nXgBBqZjyet89MVdlDNN8k5VU_idav_W3UtmGddqbxPMLWrDdx-md22sGo12nRkgjeWLZC83n3sG5TKCQMF-iKwXrffbqWG1u35qDUvXbHzu0sMxRiJ7DCOucxsIsv-6eDIwplMT13Fyx-9-8Wo_DJETJT8')"}}></div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1.5 items-center">
                            <p className="text-sm font-medium text-white truncate">Holiday_01.png</p>
                            <p className="text-xs text-slate-400 font-mono">80%</p>
                        </div>
                        <div className="h-1.5 w-full bg-surface-highlight rounded-full overflow-hidden">
                             <div className="h-full bg-primary w-[80%] rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
               <div className="p-4 border-t border-white/5 flex justify-end gap-3 bg-surface-highlight/20">
                <button className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-white hover:bg-blue-600 shadow-[0_0_20px_-5px_rgba(55,128,246,0.5)] transition-all">Browse Files</button>
              </div>
            </div>
          </div>

           {/* Column 2: Face Grouping & Toast */}
           <div className="flex flex-col gap-6 lg:col-span-1">
                <div className="flex flex-col gap-1">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 pl-1">02. Face Grouping</div>
                     <div className="rounded-md bg-surface-dark border border-white/5 shadow-xl p-8 flex flex-col items-center text-center relative overflow-hidden group">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute top-4 right-4">
                            <button className="text-slate-500 hover:text-white transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                        </div>
                        <div className="relative mb-6 mt-2">
                             <div className="w-32 h-32 rounded-full border-4 border-surface-highlight shadow-2xl bg-cover bg-center relative z-10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8RLiKJnzSjYhhG4t4pmNFdl3BKBgZY8RxgAKlxw2ZiNi-sbqYCPUCFcWgG5unH0YLv7fZ_e8Y7eRVZpdwNlnVYzpOj4Z91WzQUnWBromdFu8OcjtwNRaor9I121FxVwOzkUyEpDkaWble13atn0ZPA6HFZHFz6qzsAZrcV2-ERpdh2MuD7N4-5icVtrgjyouyr9XyGutIzsrZRJ_Jrd3e4gaGLeQ11ceWXX5LpW-q50OOL-s2j_-VRYF8VgOGtYLZmXujlZyduPJX')"}}></div>
                             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 bg-surface-dark border border-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
                                 <span className="material-symbols-outlined text-secondary text-[16px]">photo_library</span> 150 photos
                             </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 mt-2">Identify Person</h3>
                        <p className="text-slate-400 text-sm mb-6 px-4">Group these photos by naming this person.</p>
                        <div className="w-full relative group/input">
                            <input className="w-full bg-black/20 border border-slate-700 rounded-md py-3 pl-4 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" placeholder="Name this person" type="text" />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface-highlight text-primary hover:text-white hover:bg-primary p-1.5 rounded-md transition-all opacity-0 group-focus-within/input:opacity-100">
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                     </div>
                </div>

                 <div className="flex flex-col gap-1 mt-4">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 pl-1">04. Toast Notification</div>
                    <div className="relative h-32 border border-dashed border-slate-800 rounded-md bg-black/20 flex items-center justify-center overflow-hidden">
                         <div className="absolute bottom-6 flex items-center gap-3 pl-3 pr-2 py-2.5 rounded-md bg-surface-dark/90 backdrop-blur-md border border-white/10 shadow-lg shadow-black/40 max-w-[90%] transform hover:-translate-y-1 transition-transform duration-300 cursor-default">
                             <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                                 <span className="material-symbols-outlined text-[18px]">link</span>
                             </div>
                             <div className="flex flex-col mr-2">
                                 <p className="text-sm font-semibold text-white leading-tight">Link copied</p>
                                 <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Paste to share album</p>
                             </div>
                             <button className="text-slate-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 ml-1">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                             </button>
                         </div>
                    </div>
                 </div>
           </div>

            {/* Column 3: Security Modal */}
            <div className="flex flex-col gap-6 lg:col-span-1 h-full">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 pl-1">03. Security Modal</div>
                <div className="rounded-md bg-surface-dark/90 border border-white/10 backdrop-blur-xl shadow-2xl p-8 flex flex-col items-center text-center relative h-full justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary/20 to-blue-400/5 flex items-center justify-center text-primary mb-6 shadow-[0_0_20px_-5px_rgba(55,128,246,0.5)] border border-primary/10">
                        <span className="material-symbols-outlined text-3xl">lock</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Enter Album Password</h3>
                    <p className="text-slate-400 text-sm mb-8 max-w-[240px] leading-relaxed">This album is private. Please enter the 4-digit PIN to access content.</p>
                     <div className="flex gap-3 mb-8">
                        <div className="relative">
                            <input className="w-12 h-14 rounded-md bg-black/30 border border-slate-700 text-center text-sm text-white focus:outline-none transition-all cursor-default" readOnly type="text" value="●" />
                        </div>
                         <input autoFocus className="w-12 h-14 rounded-md bg-black/30 border-2 border-primary shadow-[0_0_15px_rgba(55,128,246,0.15)] text-center text-xl font-bold text-white focus:outline-none transition-all caret-primary" type="text" />
                         <input className="w-12 h-14 rounded-md bg-black/30 border border-slate-700 text-center text-xl font-bold text-white focus:border-primary focus:bg-black/40 outline-none transition-all" type="text" />
                         <input className="w-12 h-14 rounded-md bg-black/30 border border-slate-700 text-center text-xl font-bold text-white focus:border-primary focus:bg-black/40 outline-none transition-all" type="text" />
                     </div>
                     <button className="w-full py-3 rounded-md bg-primary text-white text-sm font-bold hover:bg-blue-600 shadow-[0_0_20px_-5px_rgba(55,128,246,0.5)] transition-all mb-5 flex items-center justify-center gap-2 group">
                        <span>Unlock Album</span>
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                     </button>
                     <button className="text-xs text-slate-500 hover:text-secondary transition-colors font-medium">Forgot password?</button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default UIKitView;
