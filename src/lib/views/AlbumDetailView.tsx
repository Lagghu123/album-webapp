import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Photo, SortOption, ViewMode } from '../types';
import Modal from '../components/Modal';

interface AlbumDetailProps {
  onPhotoClick: (photo: Photo) => void;
  onBack: () => void;
  onLogout?: () => void;
}

const AlbumDetailView: React.FC<AlbumDetailProps> = ({ onPhotoClick, onBack, onLogout }) => {
  const [localPhotos, setLocalPhotos] = useState<Photo[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI States
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock fetch photos (Replace with real DB fetch in future iteration or now)
  useEffect(() => {
    // In a full implementation, you would fetch photos where album_id matches the current album
    // For now, we start empty or mock, but the upload logic below is real.
  }, []);

  // Logic to Upload Photo to Supabase
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(10); // Start
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
        // 1. Upload to Supabase Storage 'photos' bucket
        const { error: uploadError } = await supabase.storage
            .from('photos')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        setUploadProgress(70);

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('photos')
            .getPublicUrl(filePath);

        setUploadProgress(90);

        // 3. Insert into DB (Table 'photos') - Assuming you have the album ID
        // const { error: dbError } = await supabase.from('photos').insert([...])

        // 4. Update UI Locally for feedback
        const newPhoto: Photo = {
            id: Date.now().toString(),
            src: publicUrl,
            alt: file.name,
            date: 'Just now',
            timestamp: Date.now(),
            isFavorite: false
        };
        
        setLocalPhotos(prev => [newPhoto, ...prev]);
        setUploadProgress(100);
        setTimeout(() => {
            setShowUploadModal(false);
            setIsUploading(false);
        }, 500);

    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
        setIsUploading(false);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    if (showMenu) {
        document.addEventListener('click', handleClickOutside);
    }
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  // 1. Filtering & Sorting Logic
  const processedPhotos = useMemo(() => {
    let result = [...localPhotos];

    // Filter
    if (searchQuery) {
      result = result.filter(p => p.alt.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'date-desc') return (b.timestamp || 0) - (a.timestamp || 0);
      if (sortOption === 'date-asc') return (a.timestamp || 0) - (b.timestamp || 0);
      if (sortOption === 'name-asc') return a.alt.localeCompare(b.alt);
      return 0;
    });

    return result;
  }, [searchQuery, sortOption, localPhotos]);

  // 2. Grouping Logic
  const groupedPhotos = useMemo(() => {
    const groups: Record<string, Photo[]> = {};
    processedPhotos.forEach(photo => {
      const date = photo.date || 'Unknown Date';
      if (!groups[date]) groups[date] = [];
      groups[date].push(photo);
    });
    return groups;
  }, [processedPhotos]);

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handlePhotoClickInner = (photo: Photo) => {
    if (isSelectionMode) {
      toggleSelection(photo.id);
    } else {
      onPhotoClick(photo);
    }
  };

  return (
    <div className="flex-grow w-full h-full overflow-y-auto overflow-x-hidden bg-background-dark relative">
      {/* Navbar */}
      <div className="sticky top-0 z-50 glass-panel border-b border-[#223149] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 max-w-[1440px] mx-auto">
             <div className="flex items-center gap-6">
                 <button onClick={onBack} className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="font-semibold">Back</span>
                 </button>
             </div>
             
             <div className="flex-1 max-w-md mx-4 hidden md:block">
                 <div className="relative group">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors material-symbols-outlined text-[20px]">search</span>
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter photos by name..." 
                        className="w-full bg-[#151d2b] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                     />
                 </div>
             </div>

             <div className="flex items-center gap-4">
                 <button 
                    onClick={() => {
                        setIsSelectionMode(!isSelectionMode);
                        if(isSelectionMode) setSelectedIds(new Set());
                    }}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all text-sm font-medium ${isSelectionMode ? 'bg-primary border-primary text-white' : 'bg-transparent border-slate-600 text-slate-300 hover:border-white hover:text-white'}`}
                 >
                    <span className="material-symbols-outlined text-[18px]">{isSelectionMode ? 'check_circle' : 'checklist'}</span>
                    {isSelectionMode ? 'Done' : 'Select'}
                 </button>

                 <div className="relative">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                        className={`p-2 rounded-full transition-colors ${showMenu ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                    {showMenu && (
                        <div 
                            className="absolute right-0 top-10 z-50 w-48 bg-[#1e293b] border border-white/10 shadow-xl rounded-xl p-1 overflow-hidden animate-[pulse-slow_0.1s_ease-out] origin-top-right"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => { setShowMenu(false); alert("Download Album clicked"); }}
                                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Download All
                            </button>
                            {onLogout && (
                                <>
                                    <div className="h-px bg-white/5 my-1 mx-2"></div>
                                    <button 
                                        onClick={() => { setShowMenu(false); onLogout(); }}
                                        className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">logout</span>
                                        Log Out
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                 </div>
             </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm">
                <button onClick={onBack} className="text-[#8fa6cc] hover:text-white transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">photo_library</span>
                    Albums
                </button>
                <span className="text-[#8fa6cc] material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-white font-medium">Album Details</span>
            </div>
        </div>

        {/* Hero Section */}
        {!searchQuery && !isSelectionMode && (
            <section className="relative rounded-2xl overflow-hidden mb-8 group bg-surface-dark border border-white/5">
                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end min-h-[200px]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4 max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">Album View</h1>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-4">
                            <div className="flex flex-wrap gap-3">
                                <button 
                                    onClick={() => setShowUploadModal(true)}
                                    className="h-12 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/20 flex items-center gap-2 transition-all"
                                >
                                    <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                                    Add Photos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* Empty State */}
        {processedPhotos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-slate-500 text-[32px]">photo_library</span>
                </div>
                <h3 className="text-white font-bold text-lg">No photos yet</h3>
                <p className="text-slate-400 text-sm">Upload photos to get started.</p>
            </div>
        )}

        {/* Photos Grid/List */}
        <div className="space-y-8">
            {Object.entries(groupedPhotos).map(([date, groupPhotos]) => {
                const photos = groupPhotos as Photo[];
                return (
                <div key={date}>
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        {date}
                        <span className="text-[#8fa6cc] text-sm font-medium font-normal">{photos.length} Photos</span>
                    </h3>
                    <div className={viewMode === 'grid' 
                        ? "columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
                        : "flex flex-col gap-4"
                    }>
                        {photos.map((photo) => (
                            <div 
                                key={photo.id} 
                                onClick={() => handlePhotoClickInner(photo)} 
                                className={`
                                    relative group rounded-xl overflow-hidden cursor-pointer bg-surface-dark transition-all duration-300
                                    ${viewMode === 'grid' ? 'break-inside-avoid' : 'flex items-center p-3 gap-4 h-24'}
                                    ${isSelectionMode && selectedIds.has(photo.id) ? 'ring-4 ring-primary ring-offset-2 ring-offset-[#101723] scale-[0.98]' : ''}
                                `}
                            >
                                <img 
                                    src={photo.src} 
                                    alt={photo.alt} 
                                    className={`
                                        object-cover transform transition-transform duration-500 
                                        ${viewMode === 'grid' ? 'w-full h-auto' : 'w-20 h-20 rounded-lg'}
                                        ${!isSelectionMode ? 'group-hover:scale-105' : ''}
                                    `} 
                                />
                                {isSelectionMode && (
                                     <div className={`absolute inset-0 transition-colors duration-200 ${selectedIds.has(photo.id) ? 'bg-primary/20' : 'bg-transparent'}`}>
                                        <div className="absolute top-3 right-3">
                                             <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all shadow-md ${selectedIds.has(photo.id) ? 'bg-primary border-primary scale-110' : 'bg-black/40 border-white/70 hover:bg-black/60'}`}>
                                                {selectedIds.has(photo.id) && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                                             </div>
                                        </div>
                                     </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )})}
        </div>
      </div>

      {/* Upload Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Photos">
        <div className="flex flex-col gap-6">
            {!isUploading ? (
                <>
                    <div className="group relative flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-slate-600 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer py-12">
                        <div className="w-12 h-12 rounded-full bg-surface-highlight flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(55,128,246,0.5)]">
                            <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-white">Click to Upload</p>
                            <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG</p>
                        </div>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-3 bg-surface-dark border border-white/5 p-4 rounded-lg">
                        <div className="w-10 h-10 rounded-md bg-slate-800 flex items-center justify-center border border-white/5">
                            <span className="material-symbols-outlined text-white/50">image</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between mb-1.5 items-center">
                                <p className="text-sm font-medium text-white truncate">Uploading...</p>
                                <p className="text-xs text-slate-400 font-mono">{uploadProgress}%</p>
                            </div>
                            <div className="h-1.5 w-full bg-surface-highlight rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </Modal>

    </div>
  );
};

export default AlbumDetailView;