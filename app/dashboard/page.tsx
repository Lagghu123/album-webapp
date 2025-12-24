import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Album, ViewState } from '../../types';
import Modal from '../../components/Modal';

const DEFAULT_COVERS = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'
];

interface PageProps {
  onNavigate: (view: ViewState) => void;
}

export default function DashboardPage({ onNavigate }: PageProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('albums')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAlbums(data.map(a => ({
        id: a.id,
        title: a.title,
        cover: a.cover_url || DEFAULT_COVERS[0],
        date: new Date(a.created_at).toLocaleDateString(),
        photosCount: 0,
        private: a.is_private,
        owner_id: a.owner_id
      })));
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isCreating) return;

    setIsCreating(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.from('albums').insert([{
      title: title.trim(),
      is_private: isPrivate,
      owner_id: user?.id,
      cover_url: DEFAULT_COVERS[Math.floor(Math.random() * DEFAULT_COVERS.length)]
    }]);

    if (!error) {
      await fetchAlbums();
      setShowModal(false);
      setTitle('');
    }
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Xóa album này?")) {
      await supabase.from('albums').delete().eq('id', id);
      setAlbums(prev => prev.filter(a => a.id !== id));
    }
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 w-full h-full overflow-y-auto bg-[#05080f]" onClick={() => setMenuId(null)}>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Library</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your visual memories securely</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-blue-600 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Create Album
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
        {/* Create Card */}
        <div 
          onClick={() => setShowModal(true)}
          className="group flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/50 transition-all cursor-pointer min-h-[280px]"
        >
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-slate-500 transition-all">
            <span className="material-symbols-outlined text-[32px]">add</span>
          </div>
          <p className="font-bold text-slate-500 group-hover:text-white transition-colors">New Album</p>
        </div>

        {/* Album Cards */}
        {albums.map(album => (
          <div 
            key={album.id}
            onClick={() => onNavigate('album-detail')}
            className="group relative flex flex-col gap-4 p-3 bg-[#111827] border border-white/5 rounded-3xl hover:border-primary/50 transition-all shadow-2xl cursor-pointer"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
              <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              {album.private && (
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-xl p-2 rounded-xl border border-white/10">
                  <span className="material-symbols-outlined text-[18px] text-white">lock</span>
                </div>
              )}
            </div>
            
            <div className="px-2 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white truncate leading-tight mb-1">{album.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{album.date}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setMenuId(menuId === album.id ? null : album.id); }}
                className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-white/5"
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>

            {menuId === album.id && (
              <div className="absolute right-4 bottom-14 z-50 w-44 bg-[#1e293b] border border-white/10 shadow-2xl rounded-2xl p-1 animate-in zoom-in-95 duration-100" onClick={e => e.stopPropagation()}>
                <button onClick={() => handleDelete(album.id)} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                  Delete Album
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => !isCreating && setShowModal(false)} title="Create New Album">
        <form onSubmit={handleCreate} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Album Title</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Europe Trip 2024"
              className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 px-5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              autoFocus
              disabled={isCreating}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Privacy Level</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsPrivate(true)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${isPrivate ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' : 'bg-white/[0.02] border-white/5 text-slate-500'}`}
              >
                <span className="material-symbols-outlined">lock</span>
                <span className="text-xs font-bold uppercase">Private</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPrivate(false)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${!isPrivate ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' : 'bg-white/[0.02] border-white/5 text-slate-500'}`}
              >
                <span className="material-symbols-outlined">public</span>
                <span className="text-xs font-bold uppercase">Public</span>
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => setShowModal(false)} 
              disabled={isCreating}
              className="flex-1 py-4 text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isCreating || !title.trim()}
              className="flex-[2] py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCreating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Confirm Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}