import React, { useState } from 'react';
import { Photo } from '../types';

interface LightboxProps {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photo, onClose, onNext, onPrev }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'faces' | 'activity'>('info');

  return (
    <div className="fixed inset-0 z-50 flex w-full h-full bg-[#05080f] font-display text-white">
      {/* Background Layer with heavy blur */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-40 blur-[40px] scale-110"
          style={{ backgroundImage: `url(${photo.src})` }}
        ></div>
        <div className="absolute inset-0 bg-[#05080f]/60 backdrop-blur-xl"></div>
      </div>

      {/* Main Lightbox Container */}
      <div className="relative z-10 flex w-full h-full">
        {/* Left Stage: Image Area */}
        <div className="flex-1 relative flex flex-col h-full group/stage select-none">
          {/* Top Toolbar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-30 opacity-0 group-hover/stage:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-black/60 to-transparent pt-8">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex gap-3 bg-black/40 p-1.5 rounded-full backdrop-blur-md border border-white/10">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
              <div className="w-px h-5 bg-white/20 my-auto"></div>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">download</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">info</span>
              </button>
            </div>
          </div>

          {/* Navigation Chevrons */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-primary hover:text-white text-white/70 backdrop-blur-sm transition-all opacity-0 group-hover/stage:opacity-100 hover:scale-110"
          >
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-6 lg:right-[380px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-primary hover:text-white text-white/70 backdrop-blur-sm transition-all opacity-0 group-hover/stage:opacity-100 hover:scale-110"
          >
            <span className="material-symbols-outlined text-[28px]">chevron_right</span>
          </button>

          {/* Main Image Stage */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-12 overflow-hidden w-full relative">
            <div className="relative shadow-2xl rounded-lg overflow-hidden max-h-full max-w-full">
              <img
                src={photo.src}
                alt={photo.alt}
                className="object-contain max-h-[85vh] w-auto rounded-lg"
              />
              
              {/* Fake Pin for UI Demo */}
               <div className="absolute top-[42%] left-[62%] group/pin cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-[0_0_0_4px_rgba(55,128,246,0.3)] animate-pulse relative z-10"></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-surface-dark/90 backdrop-blur-md text-xs font-medium text-white rounded-lg whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl">
                  "Where did you get that hat?"
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-surface-dark/90"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-20">
            <p className="text-white/80 text-sm font-medium drop-shadow-md">IMG_20231024_A7III.ARW</p>
          </div>
        </div>

        {/* Right Sidebar: Inspector Panel */}
        <div className="hidden lg:flex w-[360px] h-full glass-panel border-l border-white/10 flex-col shrink-0 relative z-40 shadow-2xl bg-[#101723]/85 backdrop-blur-md">
          {/* Tabs Header */}
          <div className="pt-4 px-2">
            <div className="flex border-b border-white/10 px-2 gap-1">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 pb-3 pt-2 text-center relative group ${activeTab === 'info' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <span className="text-sm font-semibold tracking-wide">Info</span>
                {activeTab === 'info' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-full shadow-[0_0_10px_rgba(55,128,246,0.5)]"></div>}
              </button>
              <button
                 onClick={() => setActiveTab('faces')}
                className={`flex-1 pb-3 pt-2 text-center relative group ${activeTab === 'faces' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <span className="text-sm font-medium tracking-wide">Faces</span>
                {activeTab === 'faces' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-full shadow-[0_0_10px_rgba(55,128,246,0.5)]"></div>}
              </button>
              <button
                 onClick={() => setActiveTab('activity')}
                className={`flex-1 pb-3 pt-2 text-center relative group ${activeTab === 'activity' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <span className="text-sm font-medium tracking-wide">Activity</span>
                {activeTab === 'activity' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-full shadow-[0_0_10px_rgba(55,128,246,0.5)]"></div>}
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
            
            {/* Info Tab */}
            {activeTab === 'info' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</h3>
                  <button className="text-primary text-xs hover:underline">Edit</button>
                </div>
                {/* Map Card */}
                <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden border border-white/10 shadow-lg group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCek7cJsQhOUqL4ZQZyjcnxN6FCA-cDKe_RCvL0rpwB7PZsGCaQmn3r2sx4sewtQSG1AOpbLDHfbYvvMz_M7XROkN-JsT2HhtDyY7y49qrqijWF3yFKCioXR6JpEncDPJwK9HeNw4o0JgXFr7ZL-tITmxcEr157IrHRxHiLU-Oudh1Iy3pV2EHazGpa5x2QXo6QY6FN7fU1LgoGtkfynLV0Q-kOn1pW-rs29RenlFa-RXG0uXEyb0X43LvugK0YVRfYgekdaQ5nfG82')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
                    <span className="material-symbols-outlined text-red-500 text-[18px]">location_on</span>
                    <span className="text-sm font-medium">Shibuya City, Tokyo</span>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-surface-dark rounded-lg p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-1 text-gray-400">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span className="text-[10px] uppercase font-bold">Date</span>
                    </div>
                    <p className="text-xs text-gray-200">Oct 24, 2023</p>
                    <p className="text-[10px] text-gray-500">4:32 PM</p>
                  </div>
                  <div className="bg-surface-dark rounded-lg p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-1 text-gray-400">
                      <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                      <span className="text-[10px] uppercase font-bold">Camera</span>
                    </div>
                    <p className="text-xs text-gray-200">Sony A7III</p>
                    <p className="text-[10px] text-gray-500">35mm f/1.4</p>
                  </div>
                  <div className="col-span-2 bg-surface-dark rounded-lg p-3 border border-white/5 flex justify-between items-center">
                    <div className="flex gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">ISO</span>
                        <span className="text-xs text-gray-200">800</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">Aperture</span>
                        <span className="text-xs text-gray-200">f/2.8</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">Shutter</span>
                        <span className="text-xs text-gray-200">1/200s</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-500 text-[16px]">tune</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Faces Tab Content - Simplified for demo */}
            {(activeTab === 'faces' || activeTab === 'info') && (
               <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                   Faces
                   <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[9px]">AI</span>
                 </h3>
               </div>
               <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                 <div className="flex flex-col items-center gap-1 group cursor-pointer min-w-[60px]">
                   <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-lg shadow-primary/20">
                     <img
                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRDjllgBKeVNXGdr03uZvNso-aWiUlXpHVl97QpEkUHeekNYRXAZAtx3rfHvSRHP9slvXnTcz-c3Ja5z2W5zG5JpsnIXC8euX5I8U9rvPXITZzRroXz8msiqJ_XBDCzuYWbAhgO2L0A4y-eU4c3nGdfcInviumdzKQ1Fv8Et-qucQMJ_e3H9NqfjmOPVfue-pJc9l5kXe_XfaYcBlmftIs82-94maqUdyKxNAlEzvP41UgPenp66qjpkEYCvJKWKshYRdTgYNi658m"
                       alt="Dad"
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <span className="text-xs text-white font-medium">Dad</span>
                 </div>
                 <div className="flex flex-col items-center gap-1 group cursor-pointer min-w-[60px]">
                   <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-secondary shadow-lg shadow-secondary/20">
                     <img
                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqyTn-W7LIBxzK3unItgW5OLEqYY5QKBSWDdjsUCexthJZHKFN177pDgg_nMKYdJPxC5-S4MxGlEe0SsJzXjihZ9-kWzxcE_-faL6pjSsyehBaIgDbNcWoJ5vOIbmVJveVaHb-JlFW9QAjAxxbeRSsXKmKCJDEyzMq1aoRIgUOeWkoKsrOjwPBmrMIH8QjTOLx70gg9S_XVdLAo6HYdZm-4xCbOvnRoDVYRI1SrjWT3n2Z56GpI5Ve6ny34x8TYqBQb_O2Jlhas9b8"
                       alt="Mom"
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <span className="text-xs text-white font-medium">Mom</span>
                 </div>
                 <div className="flex flex-col items-center gap-1 group cursor-pointer min-w-[60px]">
                   <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-[20px]">add</span>
                   </div>
                   <span className="text-xs text-gray-500">Add</span>
                 </div>
               </div>
             </div>
            )}

            {/* Activity Tab */}
            {(activeTab === 'activity' || activeTab === 'info') && (
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Activity</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <img alt="User" className="w-8 h-8 rounded-full border border-white/10 mt-1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZQIwWbVGcieid4B5stM8yYpECnxHpJ2yk6dgO6MRgBwitq_9ODdkiWafC01IxzzDv83kSahisqJAekzaA6Dp66O5WU2te1GZ22W3QwBp8tTe_oukd1VLVgUcSO7FORsHKefmKZIZWHToZ77WWdtkZTMDaHqbcSMSSDlTLRmutVEBi73-EKYRPcbGwa5YfjwLdh5xa94fetabn5UFeYIRBLEPspuL-015HXmwvzJhpMsfz6Iakz5s-eVFDzbBed5KOCjUiFUI-Rkb0"/>
                        <div className="flex flex-col gap-1">
                            <div className="bg-surface-dark p-3 rounded-lg rounded-tl-none border border-white/5">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-xs font-bold text-white">Alex Chen</span>
                                    <span className="text-[10px] text-gray-500">2h ago</span>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed">Love the lighting here! Was this taken with the new lens?</p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-4 border-t border-white/10 bg-[#0d121c]/90 backdrop-blur-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Write a comment..."
                className="w-full bg-[#1c2533] text-white text-sm rounded-full pl-4 pr-12 py-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder-gray-500 transition-all"
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 bg-primary text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
