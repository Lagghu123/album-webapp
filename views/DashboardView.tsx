import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ViewState, Album } from '../types';
import Modal from '../components/Modal';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
}

const DashboardView: React.FC<DashboardProps> = ({ onChangeView }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create/Edit State
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumPrivacy, setAlbumPrivacy] = useState<'private' | 'public'>('private');
  
  // Menu State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Fetch Albums on Mount
  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
      try {
          setLoading(true);
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
              const { data, error } = await supabase
                .from('albums')
                .select('*')
                .order('created_at', { ascending: false });
              
              if (error) throw error;
              
              // Map DB response to UI Type
              const mappedAlbums: Album[] = (data || []).map((a: any) => ({
                  id: a.id,
                  title: a.title,
                  cover: a.cover_url || 'https://via.placeholder.com/800x600?text=No+Cover', // Default cover
                  date: new Date(a.created_at).toLocaleDateString(),
                  photosCount: 0, // Would need a subquery or separate fetch to count photos
                  private: a.is_private,
                  publicLink: !!a.public_link_token,
                  shared: a.is_shared,
                  owner_id: a.owner_id
              }));
              setAlbums(mappedAlbums);
          }
      } catch (error) {
          console.error("Error fetching albums:", error);
      } finally {
          setLoading(false);
      }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId) {
        document.addEventListener('click', handleClickOutside);
    }
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, [activeMenuId]);

  const openCreateModal = () => {
      setAlbumTitle('');
      setAlbumPrivacy('private');
      setShowAlbumModal(true);
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumTitle.trim()) return;

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('albums')
            .insert([{
                title: albumTitle,
                is_private: albumPrivacy === 'private',
                owner_id: user.id,
                cover_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCihmFhbGb25vEBfDU5xZcDtbcjmYVJPQQlDI8ZzNy2eutSJ18-hH3znrUWPh2T8ml5liNIoZ93VcFBtBPAQaXiRkO_JUc6DfT3BCx4SsOupYbNNQmIZDnZh4ATd26BRIqGu4J2V5WSniSk9maZCFP_1ghsprytt8jt-imxDEPkhnlXtx34d4Kua6nonHvVIGPhAUJRt8_hbQ0FhbZ_AgoIxcjfozUMORf4waDLw-qHD5F32qToiTSj8Hm60k4Vnpwx4l28MkCxJnRs' // Placeholder for now
            }]);

        if (error) throw error;
        
        fetchAlbums(); // Refresh list
        setShowAlbumModal(false);

    } catch (err) {
        console.error("Error creating album:", err);
    }
  };

  const handleDeleteAlbum = async (id: string) => {
     if(confirm("Are you sure?")) {
         await supabase.from('albums').delete().eq('id', id);
         fetchAlbums();
     }
  };

  if (loading) return <div className="p-8 text-white">Loading albums...</div>;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth h-full" onClick={() => setActiveMenuId(null)}>
      {/* Flashback Memories Section - Static for demo, could be dynamic later */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Flashback Memories</h2>
          <button 
            onClick={() => onChangeView('memories')}
            className="text-sm font-medium text-primary hover:text-blue-400"
          >
            View All
          </button>
        </div>
        {/* Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x no-scrollbar">
           {/* Static content preserved for UI richness */}
          <div className="relative w-48 h-64 flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer snap-start shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <img alt="Students laughing" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCihmFhbGb25vEBfDU5xZcDtbcjmYVJPQQlDI8ZzNy2eutSJ18-hH3znrUWPh2T8ml5liNIoZ93VcFBtBPAQaXiRkO_JUc6DfT3BCx4SsOupYbNNQmIZDnZh4ATd26BRIqGu4J2V5WSniSk9maZCFP_1ghsprytt8jt-imxDEPkhnlXtx34d4Kua6nonHvVIGPhAUJRt8_hbQ0FhbZ_AgoIxcjfozUMORf4waDLw-qHD5F32qToiTSj8Hm60k4Vnpwx4l28MkCxJnRs"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-semibold text-secondary uppercase mb-1">On this day</p>
              <p className="text-white font-bold text-lg leading-tight">3 Years Ago</p>
            </div>
          </div>
        </div>
      </section>

      {/* My Albums Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">My Albums</h2>
            <span className="text-sm text-slate-500 font-medium">{albums.length} total</span>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {/* Mapped Albums */}
          {albums.map((album) => (
            <div 
                key={album.id}
                onClick={() => onChangeView('album-detail')}
                className="group relative flex flex-col gap-3 rounded-2xl p-3 bg-surface-dark border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 cursor-pointer"
            >
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-800">
                <img
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    src={album.cover}
                />
                {album.private && (
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white/90 p-1.5 rounded-lg flex items-center justify-center border border-white/10">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    </div>
                )}
                </div>
                <div className="flex flex-col gap-1 px-1 relative">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white leading-tight">{album.title}</h3>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(activeMenuId === album.id ? null : album.id);
                            }}
                            className={`text-slate-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 relative z-10 ${activeMenuId === album.id ? 'bg-white/10 text-white' : ''}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                    </div>
                    <p className="text-sm text-slate-400">{album.photosCount} photos • {album.date}</p>
                    
                    {/* Album Management Menu */}
                    {activeMenuId === album.id && (
                        <div 
                            className="absolute right-0 top-8 z-50 w-48 bg-[#1e293b] border border-white/10 shadow-xl rounded-xl p-1 overflow-hidden animate-[pulse-slow_0.1s_ease-out] origin-top-right"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">share</span>
                                Share Album
                            </button>
                             <div className="h-px bg-white/5 my-1 mx-2"></div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAlbum(album.id);
                                }}
                                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Delete Album
                            </button>
                        </div>
                    )}
                </div>
            </div>
          ))}

          {/* Create New Placeholder */}
          <div 
            onClick={openCreateModal}
            className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl p-3 bg-surface-dark/30 border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 cursor-pointer min-h-[280px]"
          >
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-white/50 group-hover:text-primary text-[32px]">add</span>
            </div>
            <p className="text-white/50 font-medium group-hover:text-white transition-colors">Create New Album</p>
          </div>
        </div>
      </section>

      {/* Create Album Modal */}
      <Modal 
        isOpen={showAlbumModal} 
        onClose={() => setShowAlbumModal(false)} 
        title="Create New Album"
      >
        <form onSubmit={handleCreateAlbum} className="flex flex-col gap-6">
            <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">Album Title</label>
                <input 
                    type="text" 
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                    placeholder="e.g. Summer Holiday 2024"
                    className="w-full bg-black/20 border border-slate-700 rounded-md py-2.5 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    autoFocus
                />
            </div>
             <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">Privacy Setting</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setAlbumPrivacy('private')}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${albumPrivacy === 'private' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-[24px]">lock</span>
                        <span className="text-sm font-bold">Private</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setAlbumPrivacy('public')}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${albumPrivacy === 'public' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-[24px]">public</span>
                        <span className="text-sm font-bold">Public Link</span>
                    </button>
                </div>
            </div>

             <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
                <button type="button" onClick={() => setShowAlbumModal(false)} className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">
                    Create Album
                </button>
            </div>
        </form>
      </Modal>

    </div>
  );
};

export default DashboardView;