import React from 'react';

const SharingView: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-background-light dark:bg-background-dark relative p-6 md:p-10">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Sharing Management</h2>
                <p className="text-slate-500 dark:text-slate-400 text-base max-w-lg">Manage shared albums, control access permissions, and generate secure links for your photos.</p>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-surface-dark border border-slate-700 hover:bg-surface-dark/80 text-white text-sm font-semibold transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">link</span>
                    <span>Shared Links</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-all shadow-lg shadow-primary/25">
                    <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                    <span>Share New Album</span>
                </button>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-8">
                <button className="pb-4 border-b-[3px] border-primary text-primary font-bold text-sm tracking-wide flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">folder_shared</span>
                    Shared Albums
                </button>
                <button className="pb-4 border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm tracking-wide transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">photo</span>
                    Individual Photos
                </button>
                 <button className="pb-4 border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm tracking-wide transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">history</span>
                    Activity Log
                </button>
            </div>
        </div>

        {/* Active Albums */}
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Active Albums
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 font-semibold">3</span>
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
                    <select className="bg-transparent text-sm font-medium text-slate-700 dark:text-white border-none focus:ring-0 cursor-pointer p-0">
                        <option>Last Updated</option>
                        <option>Name</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                    <div className="relative w-full aspect-video bg-slate-800">
                         <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5VS3fnF7WhMxlQ7lEY3istMgJX_ahVMxmWxtEy7rEQ-0S5Lc3B24bUv5-8kLQa_HbDFme5iaZvyq5KMOgIxVgIE4_e4xRiZJF8Oa_M2tuw2FV3csoqk6Xum_rth11CIJ9kK57tmOlEqF4eKmdImyVnXfbysZABXZ7JOxYwhpPTRliNQUA1a-Z9DY2Znbk5z0MFSAB0uaU2IOPm1CLKRVfT6gI4g2zra9UkPRxmjxEMdolvUuCvBK9j8rkqdZ6t9KVWdxR74uJukrm')"}}></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                             <span className="material-symbols-outlined text-[14px]">lock</span> Private
                         </div>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">Summer Roadtrip 2023</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Updated 2h ago</p>
                            </div>
                            <button className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                        </div>
                        <div className="h-px w-full bg-slate-100 dark:bg-slate-700/50"></div>
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2 overflow-hidden">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcNlDEIsqMLciJ73cf-uI5vbFPo0agCZsqZdryRpI3rJ5ERbIZegnccUCgGfr_jKH2zSU4nWT8OJuFMUrgIHAiCxPlxxM4j1NLIV8HT1i0VvwQhds0zEBaV2sc7EpbVzAdtos05PpgUuP79A_J5HD0vfzrg0vQuqV_t5WgAQsktKmLFgsgKLNVk6JWoFjO0er1RErdMwyWodJivc5Hq3vOJQ_tSya1b1P3mUgqtzE84Bft0vGfCZ16xpgUPhPzCYVAzQ8YSC-a02j6" className="size-8 rounded-full ring-2 ring-surface-dark object-cover" alt="u1" />
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqnZreMSpyizRzqRjltjyfcFEGGZKS5Rv0KFLo9LdO_Kqt14qrwj3JVMQR-Wg67E9LWjqTUeYD7MkyhSNX5ioojowa3h_CEQip0o9jf7CXJfbbm8NiHlcRCpnvc8x99PdES7GUfaNSVPVUVlZ5h6TNrELKaWzVEr0SHJn94OEDExwcpr58Fe5Mz4EcpxofvjYoCGsAoBUUSgzie7q9YYdsypW9e3RRfZnmJembgPU6Nh8DfIb9xpCqAFwgtAQEokfS0Fpa2ebRMkVR" className="size-8 rounded-full ring-2 ring-surface-dark object-cover" alt="u2" />
                                <div className="flex items-center justify-center size-8 rounded-full ring-2 ring-surface-dark bg-slate-700 text-xs font-bold text-slate-300">+3</div>
                            </div>
                             <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Contributor
                            </span>
                        </div>
                         <button className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Manage Access</button>
                    </div>
                </div>

                 {/* Card 2 */}
                <div className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                    <div className="relative w-full aspect-video bg-slate-800">
                         <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWniaUt4mW7nHjbMpdTEBHodU2gYACeYSUC-O6oBr40xNUxHN6ny_l9NWUGvgXuMKLvreHP-ZttriA-VwnmhSdgERzHCoKJNaK78hwfHAAEFWdaVUrA1nZ-7h5NyBkEXLadJYrGDxpmH1s27nKhrUx8U98Rx7xvFtG9wNci2XbLU6VhRblRCzVELHUJ32MkZ3ZB_GHBHaNiFOIkWVu7o0UvUvuhKoz-_mhygynRdt5nzL4iYjwHB0_WsSTa5NfaJ5lyD2lG2w94JBJ')"}}></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute top-3 right-3 bg-blue-500/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                             <span className="material-symbols-outlined text-[14px]">public</span> Public Link
                         </div>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">Family Holidays</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Updated yesterday</p>
                            </div>
                            <button className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                        </div>
                        <div className="h-px w-full bg-slate-100 dark:bg-slate-700/50"></div>
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2 overflow-hidden">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcv982I7G6AwR2ArjgABfsykIPFsPnnW0ZPk6MxtnoE-rNe4IQjPCGP1-yY3QJmhznYL1OLL1sNzobhF7dA3N3dr-O7qLmYCsuph0C3jCb6EsrIhhD6OMdef3ID4zUh37bA8Lvac34C18xjSIPIDm9WYUGATaJfRHYeQw1FhvghtBssTiUDdDGlqdnjO3TII9nAuNsa1ilB3KLpnWJN78Jr9bQUrt8BsNGkpxhC-L8cVZhODK8TVHBtAfS-6NoIKxX7s9-t7JMZLCu" className="size-8 rounded-full ring-2 ring-surface-dark object-cover" alt="u3" />
                                <div className="flex items-center justify-center size-8 rounded-full ring-2 ring-surface-dark bg-slate-700 text-xs font-bold text-slate-300">+12</div>
                            </div>
                             <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
                                <span className="material-symbols-outlined text-[14px]">visibility</span> View Only
                            </span>
                        </div>
                         <button className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Manage Access</button>
                    </div>
                </div>

                 {/* Card 3 */}
                <div className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                    <div className="relative w-full aspect-video bg-slate-800">
                         <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDki5mw5VyfI8A3Qtvc44CZ7aD8uPh39fJaTH8ZIuhV4ruqRZiyDV2LuU9WgA8dDFM_OG2bzObpA1Q41T1jTZt7IXc4HtQuUJRI1-EnBAkVW6aOHWI2Q7PIGSUk-rm5615sqKvfaTiDVIPlItD2sbBA7etsfM-3GLygvPg6RZMws_EMDJrfZIL2Ra5i6OilIctWuHhXt7vmZlNOrn5_ABU1eTlDLJC2Ml6ajUwZNuZAmznpeZ6wDn-lknqb9minCSwlf6KqxHoD95P3')"}}></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute top-3 right-3 bg-purple-500/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                             <span className="material-symbols-outlined text-[14px]">stars</span> Pro
                         </div>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">Project Launch</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Updated 1 week ago</p>
                            </div>
                            <button className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                        </div>
                        <div className="h-px w-full bg-slate-100 dark:bg-slate-700/50"></div>
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2 overflow-hidden">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt2Mhu3UM9P9Th2V-6p9FH9uschQhSrS6OXyeEt_XJW8waXO7XJ-WXq92QeF0f6kkNpayJurrXjgv5ir139YLWNviB3WpRqjL7wXEmOKOcGxm5KkTgB0QwyssVIrcXJmq8vQIBV0OXCC8tGuF8FQDqnMwnbjMuTzwo2NoyTnvtt4-afhp2G8FbNIU_N0eFLtKne87GLMe0ccVUgBF_fSt_eg6SH8grwmc6ZqmJhaAFhA_SipUqoXhy15cvNB6X5Y_P0MRwZXGvf_DF" className="size-8 rounded-full ring-2 ring-surface-dark object-cover" alt="u4" />
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz_y0Tz-DcfFEDsndSliwJNh6XT_LppvLKlosAP4GspsZo1aBSzKlGxWrKT59rOu7R_v6-6KCSl3j24WN2BiwSkUElG2Ok23cO0iSwMWWI-l4Lmvb85pSFF0fA95CJVgc_bbVwmzzPqYrmAtGmyzqGnSK_1IW43dwXSP0Jvdr0ZoMWadj0XX5RHzAdSM5A_K-O9fQTkUSmM2-0G7nwibM7HkTwj0N9T4GaEqgDRPCx_Emzf0ysllEVBdGR5L6vEPsQHnP4Vq3rVZI9" className="size-8 rounded-full ring-2 ring-surface-dark object-cover" alt="u5" />
                            </div>
                             <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span> Admin
                            </span>
                        </div>
                         <button className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Manage Access</button>
                    </div>
                </div>

            </div>
        </div>
        
        {/* Temporary Links */}
        <div className="flex flex-col gap-5 pb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">Temporary Links</h3>
            <div className="flex flex-col gap-3">
                 <div className="flex flex-col md:flex-row items-center p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-secondary/30 transition-all">
                    <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                        <div className="size-12 rounded-lg bg-cover bg-center shrink-0" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA__RAVfmclERDhPjO5sQuJ1Ig5Q5QDS8mRatro2uYOYZAiBzvraz75hIEshEyarAmjF6pWbGTrW1ImoO9-5Vk44RleUDxD7RjZBjQzE0yMJW_ARorNsXGutL0wPtaHZRrhFnI1X3e4-EUsXscRg2J3FIiUYGdppaGeU6Rg93Az0DzOtBeuJhJxuwsUQbF5sVVmg5H-_pkpKQ5_CGG0LrzuLWk31yEmToU3KJWbTLfYNy3ALC-AaL6Kv_nNIg__xiUMGxnixS1O7RPr')"}}></div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Spring_Collection_Selection.zip</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Created 2 days ago • 14 Downloads</span>
                        </div>
                    </div>
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 mt-3 md:mt-0 px-2 md:px-0">
                         <div className="flex items-center gap-2 text-secondary text-xs font-medium bg-secondary/10 px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[16px]">timer</span> Expires in 24h
                        </div>
                        <div className="flex items-center gap-2">
                             <button className="p-2 text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">content_copy</span></button>
                             <button className="p-2 text-slate-400 hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[20px]">delete_forever</span></button>
                        </div>
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row items-center p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-secondary/30 transition-all">
                    <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                        <div className="size-12 rounded-lg bg-cover bg-center shrink-0" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvUzmKaXWN1S0yoS0BJDD_75lbidDs6FJZYcTYuSqKtIQmqKUO66sBBtgP0rtderGThDEiUkPPGW3IfdI4Y-9uWscROj01xZZShxZNv1rPZbuYElS7D02E-UxkNiZFxmUOLm-6HCpUIBiXW6AajLfCe-txEOJW5Kp8lmL_7XtObouwcV5t0JBXZxJWJOMwoHZebXDkhaQKc0kBo59eXnpi6J7Aiv1fTG3xMKKv3Wt09xyZ3d9JfcRvN4A6cqrCHrW4St8PwsM-QNOZ')"}}></div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Mountain_Trip_Selects.jpg</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Created 5 days ago • 3 Downloads</span>
                        </div>
                    </div>
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 mt-3 md:mt-0 px-2 md:px-0">
                         <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[16px]">timer</span> Expires in 5 days
                        </div>
                        <div className="flex items-center gap-2">
                             <button className="p-2 text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">content_copy</span></button>
                             <button className="p-2 text-slate-400 hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[20px]">delete_forever</span></button>
                        </div>
                    </div>
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SharingView;
