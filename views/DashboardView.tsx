import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ViewState, Album } from '../types';
import Modal from '../components/Modal';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
}

const DEFAULT_COVERS = [
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
  'https://images.unsplash.com/photo-1519681393798-2f43f1f993c2?w=800&q=80'
];

const getRandomCover = () => DEFAULT_COVERS[Math.floor(Math.random() * DEFAULT_COVERS.length)];

const DashboardView: React.FC<DashboardProps> = ({ onChangeView }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumPrivacy, setAlbumPrivacy] = useState<'private' | 'public'>('private');
  const [isCreating, setIsCreating] = useState(false);
  
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
      try {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
              const { data, error } = await supabase
                .from('albums')
                .select('*')
                .order('created_at', { ascending: false });
              
              if (error) throw error;
              
              const mappedAlbums: Album[] = (data || []).map((a: any) => ({
                  id: a.id,
                  title: a.title,
                  cover: a.cover_url || 'https://via.placeholder.com/800x600?text=No+Cover',
                  date: new Date(a.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
                  photosCount: 0,
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
    if (!albumTitle.trim() || isCreating) return;
    
    setIsCreating(true);

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Session expired. Please log in again.");
            return;
        }

        console.log("Creating album with title:", albumTitle);

        const { data, error } = await supabase
            .from('albums')
            .insert([{
                title: albumTitle.trim(),
                is_private: albumPrivacy === 'private',
                owner_id: user.id,
                cover_url: getRandomCover()
            }])
            .select();

        if (error) {
            console.error("Supabase insert error:", error);
            throw error;
        }
        
        console.log("Album created successfully:", data);
        
        await fetchAlbums();
        setShowAlbumModal(false);
        setAlbumTitle('');
        alert("Album created successfully!");

    } catch (err: any) {
        console.error("Error creating album:", err);
        alert(`Failed to create album: ${err.message || 'Unknown error. Check your database policies.'}`);
    } finally {
        setIsCreating(false);
    }
  };

  const handleDeleteAlbum = async (id: string) => {
     if(confirm("Are you sure you want to delete this album? This action cannot be undone.")) {
         try {
             const { error } = await supabase.from('albums').delete().eq('id', id);
             if (error) throw error;
             setAlbums(prev => prev.filter(a => a.id !== id));
         } catch (err: any) {
             console.error("Error deleting album:", err);
             alert("Failed to delete album.");
         }
     }
  };

  if (loading) return (
      <div className="flex items-center justify-center h-full w-full">
          <div className="flex flex-col items-center gap-4">
              <span className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
              <p className="text-slate-400 text-sm animate-pulse">Loading library...</p>
          </div>
      </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 h-full" onClick={() => setActiveMenuId(null)}>
      {/* Memories Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Flashback Memories</h2>
          <button onClick={() => onChangeView('memories')} className="text-sm font-medium text-primary hover:text-blue-400">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x no-scrollbar">
          <div className="relative w-48 h-64 flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer snap-start shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <img alt="Students" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCihmFhbGb25vEBfDU5xZcDtbcjmYVJPQQlDI8ZzNy2eutSJ18-hH3znrUWPh2T8ml5liNIoZ93VcFBtBPAQaXiRkO_JUc6DfT3BCx4SsOupYbNNQmIZDnZh4ATd26BRIqGu4J2V5WSniSk9maZCFP_1ghsprytt8jt-imxDEPkhnlXtx34d4Kua6nonHvVIGPhAUJRt8_hbQ0FhbZ_AgoIxcjfozUMORf4waDLw-qHD5F32qToiTSj8Hm60k4Vnpwx4l28MkCxJnRs"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-semibold text-secondary uppercase mb-1">On this day</p>
              <p className="text-white font-bold text-lg leading-tight">3 Years Ago</p>
            </div>
          </div>
        </div>
      </section>

      {/* Albums Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">My Albums</h2>
            <span className="text-sm text-slate-500 font-medium">{albums.length} total</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          <div 
            onClick={openCreateModal}
            className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl p-3 bg-surface-dark/30 border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 cursor-pointer min-h-[280px]"
          >
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-white/50 group-hover:text-primary text-[32px]">add</span>
            </div>
            <p className="text-white/50 font-medium group-hover:text-white transition-colors">Create New Album</p>
          </div>

          {albums.map((album) => (
            <div 
                key={album.id}
                onClick={() => onChangeView('album-detail')}
                className="group relative flex flex-col gap-3 rounded-2xl p-3 bg-surface-dark border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 cursor-pointer"
            >
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-800">
                    <img alt={album.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={album.cover} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {album.private && (
                        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white/90 p-1.5 rounded-lg border border-white/10">
                            <span className="material-symbols-outlined text-[16px]">lock</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-1 px-1 relative">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white leading-tight truncate pr-6">{album.title}</h3>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === album.id ? null : album.id); }}
                            className="text-slate-500 hover:text-white p-1 rounded-full"
                        >
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                    </div>
                    <p className="text-sm text-slate-400">{album.photosCount} photos • {album.date}</p>
                    
                    {activeMenuId === album.id && (
                        <div className="absolute right-0 top-8 z-50 w-48 bg-[#1e293b] border border-white/10 shadow-xl rounded-xl p-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <button className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">share</span>
                                Share Album
                            </button>
                            <button onClick={() => handleDeleteAlbum(album.id)} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Delete Album
                            </button>
                        </div>
                    )}
                </div>
            </div>
          ))}
        </div>
      </section>

      <Modal isOpen={showAlbumModal} onClose={() => !isCreating && setShowAlbumModal(false)} title="Create New Album">
        <form onSubmit={handleCreateAlbum} className="flex flex-col gap-6">
            <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">Album Title</label>
                <input 
                    type="text" 
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                    placeholder="e.g. Summer Holiday 2024"
                    className="w-full bg-black/20 border border-slate-700 rounded-md py-2.5 px-4 text-white focus:border-primary outline-none"
                    autoFocus
                    disabled={isCreating}
                    required
                />
            </div>
             <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">Privacy Setting</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setAlbumPrivacy('private')}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${albumPrivacy === 'private' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-400'}`}
                        disabled={isCreating}
                    >
                        <span className="material-symbols-outlined text-[24px]">lock</span>
                        <span className="text-sm font-bold">Private</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setAlbumPrivacy('public')}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${albumPrivacy === 'public' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-400'}`}
                        disabled={isCreating}
                    >
                        <span className="material-symbols-outlined text-[24px]">public</span>
                        <span className="text-sm font-bold">Public Link</span>
                    </button>
                </div>
            </div>

             <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
                <button type="button" onClick={() => setShowAlbumModal(false)} disabled={isCreating} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={isCreating || !albumTitle.trim()} className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-white hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
                    {isCreating ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Create Album'}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardView;