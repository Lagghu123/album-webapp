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
      if (!user) return;

      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const mappedAlbums: Album[] = (data || []).map((a: any) => ({
        id: a.id,
        title: a.title,
        cover: a.cover_url || getRandomCover(),
        date: new Date(a.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
        photosCount: 0,
        private: a.is_private,
        owner_id: a.owner_id
      }));
      setAlbums(mappedAlbums);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = albumTitle.trim();
    if (!title || isCreating) return;
    
    setIsCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Unauthorized");

      const { error } = await supabase
        .from('albums')
        .insert([{
          title,
          is_private: albumPrivacy === 'private',
          owner_id: user.id,
          cover_url: getRandomCover()
        }]);

      if (error) throw error;
      
      await fetchAlbums();
      setShowAlbumModal(false);
      setAlbumTitle('');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    if (confirm("Xóa album này? Thao tác này không thể hoàn tác.")) {
      try {
        const { error } = await supabase.from('albums').delete().eq('id', id);
        if (error) throw error;
        setAlbums(prev => prev.filter(a => a.id !== id));
      } catch (err) {
        alert("Không thể xóa album.");
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm">Loading your memories...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 h-full bg-[#0d121c]" onClick={() => setActiveMenuId(null)}>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">My Library</h2>
          <p className="text-slate-500 text-sm mt-1">{albums.length} albums shared with you</p>
        </div>
        <button 
          onClick={() => setShowAlbumModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Album
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
        {/* Placeholder tạo album */}
        <div 
          onClick={() => setShowAlbumModal(true)}
          className="group flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer min-h-[260px]"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-white/40 group-hover:text-primary">add</span>
          </div>
          <span className="text-white/40 font-bold text-sm group-hover:text-white transition-colors">Create Album</span>
        </div>

        {/* Danh sách album */}
        {albums.map((album) => (
          <div 
            key={album.id}
            onClick={() => onChangeView('album-detail')}
            className="group relative bg-[#1a2230] border border-white/5 rounded-2xl p-3 hover:border-primary/50 transition-all shadow-xl cursor-pointer"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-3">
              <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {album.private && (
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
                  <span className="material-symbols-outlined text-[16px] text-white">lock</span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-start px-1">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold truncate leading-tight">{album.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{album.date}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === album.id ? null : album.id); }}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            {activeMenuId === album.id && (
              <div className="absolute right-4 bottom-12 z-50 w-40 bg-[#1e293b] border border-white/10 shadow-2xl rounded-xl p-1 animate-in fade-in zoom-in duration-100" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => handleDeleteAlbum(album.id)} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Delete Album
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={showAlbumModal} onClose={() => !isCreating && setShowAlbumModal(false)} title="Create New Album">
        <form onSubmit={handleCreateAlbum} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Album Title</label>
            <input 
              type="text" 
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              placeholder="e.g. Summer Memories 2024"
              className="w-full bg-black/30 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition-all"
              autoFocus
              disabled={isCreating}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Privacy Settings</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAlbumPrivacy('private')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${albumPrivacy === 'private' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-500'}`}
                disabled={isCreating}
              >
                <span className="material-symbols-outlined">lock</span>
                <span className="text-xs font-bold uppercase">Private</span>
              </button>
              <button
                type="button"
                onClick={() => setAlbumPrivacy('public')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${albumPrivacy === 'public' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-500'}`}
                disabled={isCreating}
              >
                <span className="material-symbols-outlined">public</span>
                <span className="text-xs font-bold uppercase">Public</span>
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button type="button" onClick={() => setShowAlbumModal(false)} disabled={isCreating} className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white">Cancel</button>
            <button type="submit" disabled={isCreating || !albumTitle.trim()} className="px-6 py-2 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
              {isCreating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : null}
              {isCreating ? 'Creating...' : 'Create Album'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardView;