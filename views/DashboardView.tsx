import React, { useState, useEffect, useRef } from 'react';
import { ViewState, Album } from '../types';
import Modal from '../components/Modal';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
}

interface Member {
    id: string;
    name: string;
    email: string;
    role: 'Owner' | 'Editor' | 'Viewer';
    avatar: string;
}

const initialAlbums: Album[] = [
    {
        id: '1',
        title: 'Family Trip',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvdRJIx88J0shBMEKDb3MU8BaMvWP-kKE_cM9FS1jb9RHvML870glLsA1yxdxwcB1S9rBPIqEQEuwmbv-3Z-Zvny3OfhbowRzKaY-xESMS_jccu3zNh4cBWG-Dg3pMcOTsh3SIE6XM3aUZudrRMbzorcOic33DZhqKiOlrx-EvR3IwROB0dq--7E2zsXDEaSyMhtAoR9Vp01vFm2CzHgyfvgq4lr6OgnKXY3xJHbUUkksR-sa1EIgvVcVOZQEPMz9AeFxTpnH5gAFu',
        date: 'Last updated 2h ago',
        photosCount: 420,
        private: true,
        shared: true
    },
    {
        id: '2',
        title: 'Architecture',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeLHUPlQKjF6iFlzs8nYkbcmFRuLGRKerT_q4qlF3Rd9563XXIzMj2bl2EIsWZBNHGUtJB1IIpfZfWMqWkhpqbKrdlw92B2zDCzc9yoyf_EBH3D5qn6smQoAuUIgojNdfVDpoD-VU22p9wRv94d27827O8XgC1dNsrSUC7Vironm_uC8KpJCrcyW9NTZyWEtz7obpOD-KswjIN3v2LMtETDVx7VzzrKaNs5mNEy-S_oqGlIvm7-R019AEcGfi-O_ojcKuMKWfvF5am',
        date: 'Last updated 1d ago',
        photosCount: 85,
        publicLink: true
    },
    {
        id: '3',
        title: 'Food & Recipes',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG1mwtO8eftRHUPCxThm0vvBDOpRh-JScKTG0rAjeQtrMfvMbRe2iSa3kHGpLiXvdck9uZTPHyGS_D04sZE_ptWf5vgbbiC16P0KJ4y5F1lbYi_07mnbFRHZHF8CFQ7Xq4fZjhyuS8EksdmAYemBiwCy7pYqgSA9Da5IEHhAfjwoO6gUgYeHvTQATMu9cGX6hb1JHVgNnSW4sitfE1wUlffPMtikyqcbWjWQN_t82mttM72ibDrCjJrWFRg0xQRgoMdMT6I9U0GUjx',
        date: 'Last updated 4d ago',
        photosCount: 1204,
        private: true
    }
];

const DashboardView: React.FC<DashboardProps> = ({ onChangeView }) => {
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  
  // Create/Edit State
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumPrivacy, setAlbumPrivacy] = useState<'private' | 'public'>('private');
  
  // Member Management State
  const [members, setMembers] = useState<Member[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');

  // Menu State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [albumToDelete, setAlbumToDelete] = useState<string | null>(null);

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

  const currentUser: Member = {
      id: 'current-user',
      name: 'Alex Doe (You)',
      email: 'alex@example.com',
      role: 'Owner',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2AYn9gz_S9_In0dms7lYItxLwpHVQIGuE0uaQqD_Ku_5-hqZx5OsjVhOyK4hFrd2bnAdtS7Di-SlrF65naRPvo3Cr3cL6jydsZ-VbV4_mj74BkhtONY29JYpsb5OBYWpc8s3fsKzrYM8sKTTrk5mUHQlhqNzpdbqH2JmnnjdaGfWAM9wbMv9slyePwbjsTGVQo0_q6oumdqn_MdHb4IaIIn2hfwQWtipGnvnWSftfb47ohxx61-2BZ8ut00dxwZXvGFWXuKTfUl-K'
  };

  const openCreateModal = () => {
      setIsEditing(false);
      setEditingId(null);
      setAlbumTitle('');
      setAlbumPrivacy('private');
      setMembers([currentUser]); // Start with just the owner
      setInviteEmail('');
      setShowAlbumModal(true);
  };

  const openEditModal = (album: Album) => {
      setIsEditing(true);
      setEditingId(album.id);
      setAlbumTitle(album.title);
      setAlbumPrivacy(album.publicLink ? 'public' : 'private');
      setInviteEmail('');
      
      // Mock existing members based on album
      if (album.shared) {
          setMembers([
              currentUser,
              {
                  id: '2',
                  name: 'Sarah Smith',
                  email: 'sarah@example.com',
                  role: 'Editor',
                  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVUG-VEUVxxqyaMJSIegCN9K0TxhrL1n1S9fjzAPpSqLtFa835-fsJ9TbGtrUuutBxsW6ebGPNEn5naH3f_37jhi9xTh6eGnCHWIvadBrwx8q-6Iq8EzQzwayFhFvI15pcI22jK1czPnnIXrDXC7onQCnavYfS7JOzX6l4eeuS-BRqP27V2jCAjeLn4bNF9dC0FQEiyGtXy4l0gXXC2UT9RjDAkusAta1gfoRmNZA6hNWTtScbstAjRvB3duQXZHNhU19k2l848Dwg'
              }
          ]);
      } else {
          setMembers([currentUser]);
      }
      
      setShowAlbumModal(true);
      setActiveMenuId(null); // Close menu
  };

  const handleAddMember = () => {
      if (!inviteEmail.trim()) return;
      const newMember: Member = {
          id: Date.now().toString(),
          name: inviteEmail.split('@')[0],
          email: inviteEmail,
          role: 'Viewer', // Default role
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcv982I7G6AwR2ArjgABfsykIPFsPnnW0ZPk6MxtnoE-rNe4IQjPCGP1-yY3QJmhznYL1OLL1sNzobhF7dA3N3dr-O7qLmYCsuph0C3jCb6EsrIhhD6OMdef3ID4zUh37bA8Lvac34C18xjSIPIDm9WYUGATaJfRHYeQw1FhvghtBssTiUDdDGlqdnjO3TII9nAuNsa1ilB3KLpnWJN78Jr9bQUrt8BsNGkpxhC-L8cVZhODK8TVHBtAfS-6NoIKxX7s9-t7JMZLCu' // Placeholder avatar
      };
      setMembers([...members, newMember]);
      setInviteEmail('');
  };

  const handleRoleChange = (memberId: string, newRole: 'Editor' | 'Viewer') => {
    setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  const handleRemoveMember = (id: string) => {
      setMembers(members.filter(m => m.id !== id));
  };

  const handleSaveAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumTitle.trim()) return;

    const updatedSharedStatus = members.length > 1;

    if (isEditing && editingId) {
        // Update existing
        setAlbums(albums.map(a => a.id === editingId ? {
            ...a,
            title: albumTitle,
            private: albumPrivacy === 'private',
            publicLink: albumPrivacy === 'public',
            shared: updatedSharedStatus
        } : a));
    } else {
        // Create new
        const newAlbum: Album = {
            id: Date.now().toString(),
            title: albumTitle,
            cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCihmFhbGb25vEBfDU5xZcDtbcjmYVJPQQlDI8ZzNy2eutSJ18-hH3znrUWPh2T8ml5liNIoZ93VcFBtBPAQaXiRkO_JUc6DfT3BCx4SsOupYbNNQmIZDnZh4ATd26BRIqGu4J2V5WSniSk9maZCFP_1ghsprytt8jt-imxDEPkhnlXtx34d4Kua6nonHvVIGPhAUJRt8_hbQ0FhbZ_AgoIxcjfozUMORf4waDLw-qHD5F32qToiTSj8Hm60k4Vnpwx4l28MkCxJnRs',
            date: 'Just now',
            photosCount: 0,
            private: albumPrivacy === 'private',
            publicLink: albumPrivacy === 'public',
            shared: updatedSharedStatus
        };
        setAlbums([...albums, newAlbum]);
    }
    
    setShowAlbumModal(false);
  };

  const handleDeleteAlbum = () => {
      if (albumToDelete) {
          setAlbums(albums.filter(a => a.id !== albumToDelete));
          setAlbumToDelete(null);
      }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth h-full" onClick={() => setActiveMenuId(null)}>
      {/* Flashback Memories Section */}
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
          {/* Card 1 */}
          <div className="relative w-48 h-64 flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer snap-start shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <img
              alt="Students laughing"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCihmFhbGb25vEBfDU5xZcDtbcjmYVJPQQlDI8ZzNy2eutSJ18-hH3znrUWPh2T8ml5liNIoZ93VcFBtBPAQaXiRkO_JUc6DfT3BCx4SsOupYbNNQmIZDnZh4ATd26BRIqGu4J2V5WSniSk9maZCFP_1ghsprytt8jt-imxDEPkhnlXtx34d4Kua6nonHvVIGPhAUJRt8_hbQ0FhbZ_AgoIxcjfozUMORf4waDLw-qHD5F32qToiTSj8Hm60k4Vnpwx4l28MkCxJnRs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-semibold text-secondary uppercase mb-1">On this day</p>
              <p className="text-white font-bold text-lg leading-tight">3 Years Ago</p>
              <p className="text-slate-300 text-xs">University Grad</p>
            </div>
          </div>
           {/* Card 2 */}
           <div className="relative w-48 h-64 flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer snap-start shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <img
              alt="Mountain landscape"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJDslZIa4-Qz_LAK0tX1DbwI1gr49JqGh9MAFkLJA2v1zL1qZ1ZpNqZun_EsApIOO7m6g6Pwn7Puc_2a58_ckbmEUOn55molKjHiZ_aYZl7SqIF5GUZ-XO1qGTSJLqLgHMrINIqucgc6pKZg_5OXzEa-OZPkANGejbClDgsUZmVJXBzPEHDGmd_J7PBCnLC0h-97jAQZd78EmgcfwlK1GRrygrOT9hH3A9vHTi4WfQcqdU1ELIW9H7OMPUQnSHLcaMZlLGE009K4RM"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-semibold text-secondary uppercase mb-1">On this day</p>
              <p className="text-white font-bold text-lg leading-tight">5 Years Ago</p>
              <p className="text-slate-300 text-xs">Swiss Alps Trip</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="relative w-48 h-64 flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer snap-start shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <img
              alt="Cake"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuKI3rvFSNj7KBY0ZeyGGEnpzML3TXrUg2cOAFo01s8BcxOsiDPJUPio0zDe0v0ZTotYL5yd3k7WY4TERcehvw7TL9QkY4yfBGYfggCqxbqElnKtJecSJl_GzBwwB-fWtSJ7cjEaOt0-9PiYqofR045AeWZdNskahf4TjOMW_gmV5TihVnobfZmxH72w0DQgDmEa5LaJW37Jkv2_xfvFfEdQXv-jyOs_fsfVUST2MvAFCGy94B1Tb5MX-NdRo1HA26yxvr9-4RYKiI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-semibold text-secondary uppercase mb-1">On this day</p>
              <p className="text-white font-bold text-lg leading-tight">1 Year Ago</p>
              <p className="text-slate-300 text-xs">Mom's Birthday</p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="relative w-48 h-64 flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer snap-start shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <img
              alt="Friends on beach"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8qtQFwtW_q1ML7Kw_qTqtatxBQSrRq7-KVaGSNlBHDvO7zdt5enHSbSQWTvJJwDFx8lJtdOjuOqe4mDoUz6Zvky0Hz0hAyXlrJ_NCvEFyVPCsTp3fML0dl4Xc-A5q1RjoBwIy9TVy-HIepKv1AhRpdW9X9F3oHfTT8LeNdnU0UXSjEBdzEgw3Ok2VM0_BygSlTgzjlbm7-9894y0aK3UhPmjJPHkoVsXuk9DhoM0xHoOXKkdIYK5DwRa_2eMjq4U0VevBUS2ARX2W"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-semibold text-secondary uppercase mb-1">On this day</p>
              <p className="text-white font-bold text-lg leading-tight">2 Years Ago</p>
              <p className="text-slate-300 text-xs">Summer Vibes</p>
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
          <div className="flex items-center bg-white/5 rounded-lg p-1">
            <button className="p-1.5 rounded-md bg-white/10 text-white shadow-sm">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-300">
              <span className="material-symbols-outlined text-[20px]">list</span>
            </button>
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
                            <button 
                                onClick={() => openEditModal(album)}
                                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Rename & Edit
                            </button>
                            <button className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">share</span>
                                Share Album
                            </button>
                             <div className="h-px bg-white/5 my-1 mx-2"></div>
                            <button 
                                onClick={() => {
                                    setAlbumToDelete(album.id);
                                    setActiveMenuId(null);
                                }}
                                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Delete Album
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between mt-1 px-1 border-t border-white/5 pt-3">
                    <div className="flex -space-x-2">
                        <img className="w-7 h-7 rounded-full border-2 border-surface-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2AYn9gz_S9_In0dms7lYItxLwpHVQIGuE0uaQqD_Ku_5-hqZx5OsjVhOyK4hFrd2bnAdtS7Di-SlrF65naRPvo3Cr3cL6jydsZ-VbV4_mj74BkhtONY29JYpsb5OBYWpc8s3fsKzrYM8sKTTrk5mUHQlhqNzpdbqH2JmnnjdaGfWAM9wbMv9slyePwbjsTGVQo0_q6oumdqn_MdHb4IaIIn2hfwQWtipGnvnWSftfb47ohxx61-2BZ8ut00dxwZXvGFWXuKTfUl-K" alt="user" />
                        {album.shared && (
                             <div className="w-7 h-7 rounded-full border-2 border-surface-dark bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                                +1
                             </div>
                        )}
                    </div>
                    {album.publicLink && (
                         <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                            <span className="material-symbols-outlined text-[14px]">public</span>
                            <span>Public</span>
                        </div>
                    )}
                    {album.private && !album.publicLink && <span className="text-xs font-medium text-slate-500">Private</span>}
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

      {/* Create/Edit Album Modal */}
      <Modal 
        isOpen={showAlbumModal} 
        onClose={() => setShowAlbumModal(false)} 
        title={isEditing ? "Edit Album" : "Create New Album"}
      >
        <form onSubmit={handleSaveAlbum} className="flex flex-col gap-6">
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

            {/* Member Management Section */}
            <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 block">Manage Members</label>
                
                {/* Invite Input */}
                <div className="flex gap-2 mb-4">
                    <input 
                        type="email" 
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="Invite by email..." 
                        className="flex-1 bg-black/20 border border-slate-700 rounded-md py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    />
                    <button 
                        type="button"
                        onClick={handleAddMember}
                        className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/10 uppercase tracking-wide"
                    >
                        Add
                    </button>
                </div>

                {/* Members List */}
                <div className="bg-black/20 rounded-xl border border-white/5 divide-y divide-white/5 max-h-[160px] overflow-y-auto">
                    {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3">
                                <img src={member.avatar} className="w-8 h-8 rounded-full object-cover" alt={member.name} />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-white">{member.name}</span>
                                    <span className="text-[10px] text-slate-500">{member.email}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {member.role === 'Owner' ? (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary cursor-default">
                                        Owner
                                    </span>
                                ) : (
                                    <select
                                        value={member.role}
                                        onChange={(e) => handleRoleChange(member.id, e.target.value as 'Editor' | 'Viewer')}
                                        className="bg-[#1e293b] text-slate-300 text-[10px] font-bold px-1 py-0.5 rounded border border-white/10 focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer outline-none hover:bg-white/5 transition-colors"
                                    >
                                        <option value="Editor">Editor</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                )}

                                {member.role !== 'Owner' && (
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveMember(member.id)}
                                        className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
                <button type="button" onClick={() => setShowAlbumModal(false)} className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">
                    {isEditing ? 'Save Changes' : 'Create Album'}
                </button>
            </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!albumToDelete}
        onClose={() => setAlbumToDelete(null)}
        title="Delete Album"
        maxWidth="max-w-md"
      >
          <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <span className="material-symbols-outlined text-red-400 text-3xl">warning</span>
                  <div>
                      <h4 className="text-white font-bold text-sm">Are you sure?</h4>
                      <p className="text-slate-400 text-xs mt-1">This action cannot be undone. All photos in this album will be deleted.</p>
                  </div>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                  <button onClick={() => setAlbumToDelete(null)} className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">Cancel</button>
                  <button onClick={handleDeleteAlbum} className="px-5 py-2 rounded-md text-sm font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all">Delete Album</button>
              </div>
          </div>
      </Modal>

    </div>
  );
};

export default DashboardView;