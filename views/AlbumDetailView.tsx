import React, { useState, useMemo, useEffect } from 'react';
import { Photo, SortOption, ViewMode } from '../types';
import Modal from '../components/Modal';

interface AlbumDetailProps {
  onPhotoClick: (photo: Photo) => void;
  onBack: () => void;
  onLogout?: () => void;
}

interface Member {
    id: string;
    name: string;
    email: string;
    role: 'Owner' | 'Editor' | 'Viewer';
    avatar: string;
    status: 'Active' | 'Pending';
}

// Initial Data
const initialPhotosData: Photo[] = [
  {
    id: '1',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDijm6QTUWg8VfuExCyNvMIW-Qrc0quuQwiMuEIqQIJvZ6cdbYRW6XLHGKn5mJxAt2qMVnuKExqO9mCQosDZ_Cbtx2XmR5H8dP0XNxgDN2nMwBGgQ0QD-GaRE_iiLf-Hq9W1FaO8DW5wfieh75FZQDknKVWyVcfz3GLZwhFa4Po5iSWu-JEv-croPL6KCjs0AXb5G6mGChFkKzWZN85NSFO35umdocB-4QERb6AI9jjBMvg5wTIjxH7tBwb33c9xOXXis3nRo04n08w',
    alt: 'Camping tent',
    date: 'Yesterday',
    timestamp: 1700000000000,
    isFavorite: false
  },
  {
    id: '2',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBxqd_v7tXI7gMYg4baAhZRSJPsdpX4Qo0BKgYF9GGfLxxXRWPYtJ-gT437igGlh-UHIYepujSocCUrvtaPcmochSMqT04RLMXX_XtbZIy0QIeheNfnyDCHPtqEK_0yI3ar18Lza2Xa_2oiT1VGJCLhjEspElX_gjwDkshby-PPwk_Fps9lGlSJDWUOmXY09mopKgmxEz7MbSJC0J73JCavSF6XDnrjqzvFe8BpvusEE7IOdOkVgYmSUa4jcFImW_8ORZKHuX1-wny',
    alt: 'Cherry blossoms',
    date: 'Yesterday',
    timestamp: 1699990000000,
    isFavorite: true
  },
  {
    id: '3',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALrooqafrVK9UqbQ33Wp5LiihjFIeMhL4tmQJEhIO75tc0xXl3QbhwqsXaz-tN4x8iCMSnqas3li9HxPGZRgwrMqlewv2Zw6_ZyLUNjZmz4X8bNcN7HwkfydNDsuw04q3QU6YXcWsCyMTcQlLfGPYdaEYVoeGNhVH9mSXJz4V2WkJM7hraOhpVl26So09M6mAUBHoicGekCkWvyeQfl1msRUxQ08Oky2pZaBpM34UIEYCNz-HrgEVGllW7zQ8qvR6UM60rNVHRUV5b',
    alt: 'Hiking',
    date: 'Yesterday',
    timestamp: 1699980000000,
    isFavorite: false
  },
  {
    id: '4',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtVgwnAOnhH7LWA5a-SphvqhZk6GMuMygQ0S6l9b7sb4zOgX_ivpcM0YMMWHPTRAL49a7IL7bVC88eOOIApbk0werk_AOT_fOdmUV5WLHS90cH83wmDcSGUrLhhUgphiNXxxX2gjqJs8iIRJJQpY3lUDdgSMB5LCjCVx35yussUdqRtZ8YeOHMKgzNokeIgi6kVS81ZxSw-vql3hPh90y_aCP5rYSmMpiblAw3J8VQM3VLgADvGB7d-AxdyImNtzxsEER30TZC1BMD',
    alt: 'Street Food',
    type: 'video',
    duration: '0:45',
    date: 'Monday, Dec 20',
    timestamp: 1699000000000,
    isFavorite: false
  },
  {
    id: '5',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo79Hgwk6qwvbB-w4yWgeJGcNXgrsmj3D1K64n0aY1Zn2TXyvtkkdhpCmWp1200w6NmVfxezAFM_z0pPmJTZNjskMpPTIAx_vWaJkJCQczS11KfFPO8QQkIADTxIpoOqfmxfrw9dmBFb3Ebi7pBsHmzvFOtzWqP6O5SpJPoiYWWslG_NYDdE8f1wgLHk7QU1LzNExZPhJTLKH4XG7HLgDeLIXZwTkEP21i00iVFI8ofR21Iw7Ap_b1r9WSd6T9UYyMFSHS-NTnOMqa',
    alt: 'Palm Trees',
    date: 'Monday, Dec 20',
    timestamp: 1698000000000,
    isFavorite: false
  },
  {
    id: '6',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1nur0lP866-A5iZk2jhphT-b0QkpZzgIounLyfIJPRawYUbRN8xyZl5eyK5u3wzs-y8l_D7sqdibqj-rPAKdFRRWwazG31jNPR7MW4Odfb0rzhdPveKz6W7dX_66tUpbOcDbVZUhBZlBStVsN2vCLi2R36dCfcQmcBTeC4mzUOTzvOkCPTg7k89tLl4nnpP_Nv23h8WcK-3N_FWBz8o4w_CiUyk9cVAdhQNZmIz4FR4ENSH5SmlV2cNodbrwz7MKZGsCiNVwAX1_J',
    alt: 'Boat',
    date: 'Monday, Dec 20',
    timestamp: 1697000000000,
    isFavorite: false
  },
  {
    id: '7',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBouGcsxuDyzlb8AY4Hlmo-WDysxTo0f2KRF2--S-_Z_IDe-wiSwnDtTQwLtQl7SD1FMMSe0_64lQGhvbH6moFgje1h1_JuSwaJWs-IVKwSVynvKldDJsmI4hM-vdpV55oqzNQGZ2TYOYOnhqOzoXUrXmwD48hJeIRNm6KY6a6JJx19cYzVi905dTnAzcItMujUOTafVIYrkdt3HHlZIBPcPA1Be8e3D8DcGCOewCOeE7Hom2_V8ZssAlZ12zY3Om7EufgXECPpJfHk',
    alt: 'Sunset',
    date: 'Monday, Dec 20',
    timestamp: 1696000000000,
    isFavorite: false
  },
  {
    id: '8',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5-d3x77QP-VkU2AtaO3B5q6irPIlCY0yCgBtp9UkHvfAtRYAJTrVNTwgDUcWcQx55fj8wgsyiYhjqtWqZDT5p3qlYnDiy6yCmPDYcV82_s1GnEgxTSg1ywvswH0tLXD2hyJa3YuPKwcXtF1QwrWofJS9NqYAWW7cMHk54GoE2QnNAreGttTFnVDfePCGLFAJIm4eSHwRI36oe1rk41wFSqtyYNtpVeWgTj0Zg9kWx4XrYNUOTKeWSl8Mb5el4Kf7F4pVAsW0Kk-oH',
    alt: 'Venice',
    date: 'Monday, Dec 20',
    timestamp: 1695000000000,
    isFavorite: false
  }
];

const AlbumDetailView: React.FC<AlbumDetailProps> = ({ onPhotoClick, onBack, onLogout }) => {
  // Use state for photos to allow deletion/updates
  const [localPhotos, setLocalPhotos] = useState<Photo[]>(initialPhotosData);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Album Metadata State
  const [albumData, setAlbumData] = useState({
      title: 'Summer 2024',
      privacy: 'public' as 'private' | 'public',
      description: 'Best memories in Vietnam. Exploring Ha Long Bay, wandering through Hoi An, and tasting all the street food.'
  });

  // Member State
  const [members, setMembers] = useState<Member[]>([
    {
        id: 'current-user',
        name: 'Alex Doe (You)',
        email: 'alex@example.com',
        role: 'Owner',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2AYn9gz_S9_In0dms7lYItxLwpHVQIGuE0uaQqD_Ku_5-hqZx5OsjVhOyK4hFrd2bnAdtS7Di-SlrF65naRPvo3Cr3cL6jydsZ-VbV4_mj74BkhtONY29JYpsb5OBYWpc8s3fsKzrYM8sKTTrk5mUHQlhqNzpdbqH2JmnnjdaGfWAM9wbMv9slyePwbjsTGVQo0_q6oumdqn_MdHb4IaIIn2hfwQWtipGnvnWSftfb47ohxx61-2BZ8ut00dxwZXvGFWXuKTfUl-K',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        role: 'Editor',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVUG-VEUVxxqyaMJSIegCN9K0TxhrL1n1S9fjzAPpSqLtFa835-fsJ9TbGtrUuutBxsW6ebGPNEn5naH3f_37jhi9xTh6eGnCHWIvadBrwx8q-6Iq8EzQzwayFhFvI15pcI22jK1czPnnIXrDXC7onQCnavYfS7JOzX6l4eeuS-BRqP27V2jCAjeLn4bNF9dC0FQEiyGtXy4l0gXXC2UT9RjDAkusAta1gfoRmNZA6hNWTtScbstAjRvB3duQXZHNhU19k2l848Dwg',
        status: 'Active'
    }
  ]);

  // UI States
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false); // Used for simple invite
  const [showEditModal, setShowEditModal] = useState(false); // New Edit Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New Delete Modal
  const [showMenu, setShowMenu] = useState(false);
  
  // Edit Modal Form States
  const [editTitle, setEditTitle] = useState('');
  const [editPrivacy, setEditPrivacy] = useState<'private' | 'public'>('public');
  const [editInviteEmail, setEditInviteEmail] = useState('');

  // Simulation of incoming notification for demonstration
  const [incomingInvite, setIncomingInvite] = useState<{ id: string; name: string; albumName: string } | null>(null);

  // Simple Invite Modal State
  const [inviteEmail, setInviteEmail] = useState('');

  // Upload Simulation State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  // Reset upload state when modal closes
  useEffect(() => {
    if (!showUploadModal) {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [showUploadModal]);

  // Logic to Open Edit Modal
  const openEditModal = () => {
      setEditTitle(albumData.title);
      setEditPrivacy(albumData.privacy);
      setEditInviteEmail('');
      setShowEditModal(true);
      setShowMenu(false);
  };

  // Logic to Save Album Changes
  const handleSaveAlbum = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editTitle.trim()) return;
      
      setAlbumData(prev => ({
          ...prev,
          title: editTitle,
          privacy: editPrivacy
      }));
      setShowEditModal(false);
  };

  // Logic to Add Member in Edit Modal
  const handleAddMember = () => {
      if (!editInviteEmail.trim()) return;
      const newId = Date.now().toString();
      const newName = editInviteEmail.split('@')[0];
      
      const newMember: Member = {
          id: newId,
          name: newName,
          email: editInviteEmail,
          role: 'Viewer',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcv982I7G6AwR2ArjgABfsykIPFsPnnW0ZPk6MxtnoE-rNe4IQjPCGP1-yY3QJmhznYL1OLL1sNzobhF7dA3N3dr-O7qLmYCsuph0C3jCb6EsrIhhD6OMdef3ID4zUh37bA8Lvac34C18xjSIPIDm9WYUGATaJfRHYeQw1FhvghtBssTiUDdDGlqdnjO3TII9nAuNsa1ilB3KLpnWJN78Jr9bQUrt8BsNGkpxhC-L8cVZhODK8TVHBtAfS-6NoIKxX7s9-t7JMZLCu',
          status: 'Pending'
      };
      setMembers([...members, newMember]);
      setEditInviteEmail('');

      // Simulate sending an invitation which triggers a notification on the "Invitee's" screen
      // For demo purposes, we show this notification immediately
      setTimeout(() => {
          setIncomingInvite({
              id: newId,
              name: newName,
              albumName: albumData.title
          });
      }, 500);
  };

  const handleRoleChange = (memberId: string, newRole: 'Editor' | 'Viewer') => {
    setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  const handleAcceptInvite = () => {
      if (incomingInvite) {
          setMembers(prev => prev.map(m => m.id === incomingInvite.id ? { ...m, status: 'Active' } : m));
          setIncomingInvite(null);
      }
  };

  const handleDeclineInvite = () => {
      if (incomingInvite) {
          setMembers(prev => prev.filter(m => m.id !== incomingInvite.id));
          setIncomingInvite(null);
      }
  };

  const handleRemoveMember = (id: string) => {
      setMembers(members.filter(m => m.id !== id));
  };

  // Logic to Delete Album
  const handleDeleteAlbum = () => {
      setShowDeleteModal(false);
      onBack(); // Return to dashboard
  };

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

  // Actions
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handlePhotoClick = (photo: Photo) => {
    if (isSelectionMode) {
      toggleSelection(photo.id);
    } else {
      onPhotoClick(photo);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === processedPhotos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(processedPhotos.map(p => p.id)));
    }
  };

  const handleDeleteSelected = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.size} photo(s)?`)) {
        setLocalPhotos(prev => prev.filter(p => !selectedIds.has(p.id)));
        setSelectedIds(new Set());
        setIsSelectionMode(false);
    }
  };

  const handleFavoriteSelected = () => {
    setLocalPhotos(prev => prev.map(p => {
        if (selectedIds.has(p.id)) {
            return { ...p, isFavorite: !p.isFavorite };
        }
        return p;
    }));
    setSelectedIds(new Set());
    setIsSelectionMode(false);
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      setLocalPhotos(prev => prev.map(p => 
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ));
  };

  const handlePlaySlideshow = () => {
    if (processedPhotos.length > 0) {
        onPhotoClick(processedPhotos[0]);
    }
  };

  const handleDownload = () => {
    alert(`Downloading ${selectedIds.size} files... (Mock)`);
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  const handleShare = () => {
      alert(`Sharing link generated for ${selectedIds.size} files!`);
      setIsSelectionMode(false);
      setSelectedIds(new Set());
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Simulation complete, add a dummy photo
          setTimeout(() => {
            const newPhoto: Photo = {
              id: Date.now().toString(),
              src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-sXDf_DDGfHj5ALxt8V56IktoM_lPFcQFUDydsotCBKFzYV9VqeGJL00x7OWXaUGhbUU8ra7JtrssTymUzahUCauXXWYVG2xJwmKuZj4VUfdma6_Lzp3DgydpLRlcrt-QismVKN-sg_XBX4kaucgS5MUZdt48G_uqH5B_9UdSU33fx6r6Q-rZkSWRljVDqz3nVbUYVWSAcMTAeDODpqG06eij3wnFbL2zpl3J6XkPZ5PHB99IapS_yq-YdwAc38_Tz2mW4zFXpPQQ',
              alt: 'New Upload',
              date: 'Just now',
              timestamp: Date.now(),
              isFavorite: false
            };
            setLocalPhotos(prev => [newPhoto, ...prev]);
            setShowUploadModal(false);
            setIsUploading(false);
          }, 500);
          
          return 100;
        }
        // Random increment for realism
        return Math.min(prev + Math.floor(Math.random() * 10) + 5, 100);
      });
    }, 200);
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
                                onClick={openEditModal}
                                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Album Settings
                            </button>
                            <button 
                                onClick={() => { setShowMenu(false); alert("Download Album clicked"); }}
                                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Download All
                            </button>
                             <div className="h-px bg-white/5 my-1 mx-2"></div>
                            <button 
                                onClick={() => { setShowMenu(false); setShowDeleteModal(true); }}
                                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Delete Album
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
                <span className="text-white font-medium">{albumData.title}</span>
            </div>
            {isSelectionMode && (
                <div className="flex items-center gap-3">
                    <span className="text-white text-sm font-medium">{selectedIds.size} Selected</span>
                    <button onClick={toggleSelectAll} className="text-primary text-sm hover:underline">
                        {selectedIds.size === processedPhotos.length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>
            )}
        </div>

        {/* Hero Section */}
        {!searchQuery && !isSelectionMode && (
            <section className="relative rounded-2xl overflow-hidden mb-8 group">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105" 
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-sXDf_DDGfHj5ALxt8V56IktoM_lPFcQFUDydsotCBKFzYV9VqeGJL00x7OWXaUGhbUU8ra7JtrssTymUzahUCauXXWYVG2xJwmKuZj4VUfdma6_Lzp3DgydpLRlcrt-QismVKN-sg_XBX4kaucgS5MUZdt48G_uqH5B_9UdSU33fx6r6Q-rZkSWRljVDqz3nVbUYVWSAcMTAeDODpqG06eij3wnFbL2zpl3J6XkPZ5PHB99IapS_yq-YdwAc38_Tz2mW4zFXpPQQ')` }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#101723] via-[#101723]/60 to-transparent"></div>
                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end min-h-[400px]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 w-fit">
                                <span className="material-symbols-outlined text-xs text-primary">{albumData.privacy === 'public' ? 'public' : 'lock'}</span>
                                <span className="text-xs font-medium text-white/90">{albumData.privacy === 'public' ? 'Public Album' : 'Private Album'}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">{albumData.title}</h1>
                            <p className="text-lg text-white/80 font-normal max-w-xl">
                                {albumData.description}
                            </p>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-4">
                            <div className="flex items-center -space-x-3 mb-2">
                                {members.filter(m => m.status === 'Active').slice(0, 3).map(m => (
                                    <div key={m.id} className="size-10 rounded-full border-2 border-[#101723] bg-cover bg-center" style={{ backgroundImage: `url('${m.avatar}')` }}></div>
                                ))}
                                {members.filter(m => m.status === 'Active').length > 3 && (
                                    <div className="size-10 rounded-full border-2 border-[#101723] bg-surface text-white text-xs font-bold flex items-center justify-center">+{members.filter(m => m.status === 'Active').length - 3}</div>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button 
                                    onClick={() => setShowUploadModal(true)}
                                    className="h-12 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/20 flex items-center gap-2 transition-all"
                                >
                                    <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                                    Add Photos
                                </button>
                                <button 
                                    onClick={openEditModal}
                                    className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide backdrop-blur-md border border-white/10 flex items-center gap-2 transition-all"
                                >
                                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                                    Invite
                                </button>
                                <button 
                                    onClick={handlePlaySlideshow}
                                    aria-label="Play Slideshow" 
                                    className="h-12 w-12 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all"
                                >
                                    <span className="material-symbols-outlined fill-current">play_arrow</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* Toolbar */}
        {!searchQuery && !isSelectionMode && (
            <div className="sticky top-[64px] z-40 mb-6 py-3 glass-panel border-b border-[#223149] shadow-lg rounded-xl px-4 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                     <div className="relative flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors cursor-pointer group/sort">
                        <span className="material-symbols-outlined text-[20px] text-[#8fa6cc]">sort</span>
                        <select 
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="bg-transparent border-none text-white text-sm focus:ring-0 cursor-pointer pl-0 pr-8"
                        >
                            <option className="bg-[#101723]" value="date-desc">Date (Newest)</option>
                            <option className="bg-[#101723]" value="date-asc">Date (Oldest)</option>
                            <option className="bg-[#101723]" value="name-asc">Name (A-Z)</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-surface rounded-lg p-1 border border-[#223149]">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-sm' : 'text-[#8fa6cc] hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined text-[20px] block">grid_view</span>
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-[#8fa6cc] hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined text-[20px] block">view_list</span>
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Empty State */}
        {processedPhotos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-slate-500 text-[32px]">search_off</span>
                </div>
                <h3 className="text-white font-bold text-lg">No photos found</h3>
                <p className="text-slate-400 text-sm">Try adjusting your search query.</p>
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
                    {/* Grid Layout: Start with 2 columns on mobile, scale up */}
                    <div className={viewMode === 'grid' 
                        ? "columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
                        : "flex flex-col gap-4"
                    }>
                        {photos.map((photo) => (
                            <div 
                                key={photo.id} 
                                onClick={() => handlePhotoClick(photo)} 
                                className={`
                                    relative group rounded-xl overflow-hidden cursor-pointer bg-surface-dark transition-all duration-300
                                    ${viewMode === 'grid' ? 'break-inside-avoid' : 'flex items-center p-3 gap-4 h-24'}
                                    ${isSelectionMode && selectedIds.has(photo.id) ? 'ring-4 ring-primary ring-offset-2 ring-offset-[#101723] scale-[0.98]' : ''}
                                    ${isSelectionMode && !selectedIds.has(photo.id) ? 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0' : 'opacity-100'}
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
                                
                                {viewMode === 'list' && (
                                    <div className="flex-1 flex justify-between items-center pr-4">
                                        <div>
                                            <p className="text-white font-medium">{photo.alt}</p>
                                            <p className="text-slate-400 text-sm">IMG_{photo.id}.jpg • 2.4 MB</p>
                                        </div>
                                        {photo.type === 'video' && (
                                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                                                 <span className="material-symbols-outlined text-[16px]">videocam</span> {photo.duration}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {viewMode === 'grid' && photo.type === 'video' && (
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">videocam</span> {photo.duration}
                                    </div>
                                )}
                                
                                {/* Overlay for normal mode (Grid) */}
                                {viewMode === 'grid' && !isSelectionMode && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                                        <div className="flex justify-end">
                                            <div className={`size-6 rounded-full border-2 ${photo.isFavorite ? 'bg-primary border-primary' : 'border-white/50 bg-black/20 hover:bg-primary hover:border-primary'} transition-colors flex items-center justify-center`}>
                                                {photo.isFavorite && <span className="material-symbols-outlined text-[14px] text-white">check</span>}
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <button 
                                                onClick={(e) => toggleFavorite(e, photo.id)}
                                                className={`${photo.isFavorite ? 'text-accent-pink' : 'text-white hover:text-accent-pink'} transition-colors`}
                                            >
                                                <span className={`material-symbols-outlined text-[24px] ${photo.isFavorite ? 'fill-current text-red-500' : ''}`}>favorite</span>
                                            </button>
                                            <button className="text-white hover:text-primary transition-colors"><span className="material-symbols-outlined text-[24px]">chat_bubble</span></button>
                                        </div>
                                    </div>
                                )}

                                {/* Overlay for Selection Mode */}
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

      {/* Contextual Action Bar */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${isSelectionMode && selectedIds.size > 0 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#1e293b] border border-white/10 shadow-2xl shadow-black/50 rounded-full px-6 py-3 flex items-center gap-6 backdrop-blur-xl">
            <span className="text-white font-bold text-sm whitespace-nowrap border-r border-white/10 pr-6 mr-[-10px]">{selectedIds.size} Selected</span>
            <button 
                onClick={handleDownload}
                className="flex flex-col items-center gap-1 group text-slate-400 hover:text-white transition-colors"
            >
                 <span className="material-symbols-outlined text-[24px] group-hover:-translate-y-0.5 transition-transform">download</span>
                 <span className="text-[10px] font-medium">Download</span>
            </button>
            <button 
                onClick={handleFavoriteSelected}
                className="flex flex-col items-center gap-1 group text-slate-400 hover:text-white transition-colors"
            >
                 <span className="material-symbols-outlined text-[24px] group-hover:-translate-y-0.5 transition-transform">favorite</span>
                 <span className="text-[10px] font-medium">Favorite</span>
            </button>
            <button 
                onClick={handleShare}
                className="flex flex-col items-center gap-1 group text-slate-400 hover:text-white transition-colors"
            >
                 <span className="material-symbols-outlined text-[24px] group-hover:-translate-y-0.5 transition-transform">share</span>
                 <span className="text-[10px] font-medium">Share</span>
            </button>
            <button 
                onClick={handleDeleteSelected}
                className="flex flex-col items-center gap-1 group text-slate-400 hover:text-red-400 transition-colors"
            >
                 <span className="material-symbols-outlined text-[24px] group-hover:-translate-y-0.5 transition-transform">delete</span>
                 <span className="text-[10px] font-medium">Delete</span>
            </button>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Photos">
        <div className="flex flex-col gap-6">
            {!isUploading ? (
                <>
                    <div 
                        onClick={handleFileUpload}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-slate-600 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer py-12"
                    >
                        <div className="w-12 h-12 rounded-full bg-surface-highlight flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(55,128,246,0.5)]">
                            <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-white">Drop Zone</p>
                            <p className="text-xs text-slate-400 mt-1">Drag & drop photos here</p>
                        </div>
                    </div>
                     <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                        <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">Cancel</button>
                        <button onClick={handleFileUpload} className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-white hover:bg-blue-600 shadow-[0_0_20px_-5px_rgba(55,128,246,0.5)] transition-all">Select Files</button>
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
                                <p className="text-sm font-medium text-white truncate">Uploading 3 items...</p>
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
                    
                    <div className="space-y-3">
                         <div className="flex items-center gap-3 px-2 opacity-50">
                             <span className="material-symbols-outlined text-slate-500 text-[18px]">pending</span>
                             <span className="text-xs text-slate-400">Processing media...</span>
                         </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5 mt-2">
                        <button className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 cursor-not-allowed opacity-50" disabled>Cancel Upload</button>
                    </div>
                </div>
            )}
        </div>
      </Modal>

      {/* Edit Album Modal (Includes Invite) */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Album">
        <form onSubmit={handleSaveAlbum} className="flex flex-col gap-6">
            <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">Album Title</label>
                <input 
                    type="text" 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
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
                        onClick={() => setEditPrivacy('private')}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${editPrivacy === 'private' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-[24px]">lock</span>
                        <span className="text-sm font-bold">Private</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditPrivacy('public')}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${editPrivacy === 'public' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
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
                <div className="flex gap-2 mb-4 relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input 
                        type="email" 
                        value={editInviteEmail}
                        onChange={(e) => setEditInviteEmail(e.target.value)}
                        placeholder="Search or invite by email..." 
                        className="flex-1 bg-black/20 border border-slate-700 rounded-md py-2.5 pl-10 pr-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    />
                    <button 
                        type="button"
                        onClick={handleAddMember}
                        className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/10 uppercase tracking-wide"
                    >
                        Add
                    </button>
                </div>

                {/* Members List */}
                <div className="bg-black/20 rounded-xl border border-white/5 divide-y divide-white/5 max-h-[160px] overflow-y-auto custom-scrollbar">
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
                                {member.status === 'Pending' && (
                                     <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/10">
                                        Pending
                                    </span>
                                )}
                                
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
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">
                    Save Changes
                </button>
            </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
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
                  <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">Cancel</button>
                  <button onClick={handleDeleteAlbum} className="px-5 py-2 rounded-md text-sm font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all">Delete Album</button>
              </div>
          </div>
      </Modal>
      
      {/* Invite Modal (Simple - Keep for other buttons if needed, or remove if redundant. Keeping for safety based on existing logic) */}
      <Modal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="Invite People">
        <div className="flex flex-col gap-6">
            <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">Email Address</label>
                <div className="flex gap-2">
                    <input 
                        type="email" 
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="friend@example.com" 
                        className="flex-1 bg-black/20 border border-slate-700 rounded-md py-2.5 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    />
                    <button className="px-4 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/10">Add</button>
                </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <button className="text-xs text-primary hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">link</span> Copy Invite Link
                </button>
                <button onClick={() => setShowInviteModal(false)} className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-white hover:bg-blue-600 shadow-[0_0_20px_-5px_rgba(55,128,246,0.5)] transition-all">Send Invites</button>
            </div>
        </div>
      </Modal>

      {/* Invitation Notification Simulation (Invitee View) */}
      {incomingInvite && (
        <div className="fixed bottom-6 right-6 z-[100] w-96 bg-[#1e293b] border border-white/10 shadow-2xl rounded-xl p-4 animate-[pulse-slow_0.2s_ease-out] backdrop-blur-md">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-1">Invitation Received</h4>
                    <p className="text-xs text-slate-300 mb-3">
                        You have been invited to join the album <strong className="text-white">"{incomingInvite.albumName}"</strong> as a Viewer.
                    </p>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleAcceptInvite}
                            className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors flex-1"
                        >
                            Accept
                        </button>
                        <button 
                            onClick={handleDeclineInvite}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition-colors flex-1"
                        >
                            Decline
                        </button>
                    </div>
                </div>
                <button 
                    onClick={() => setIncomingInvite(null)}
                    className="text-slate-500 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
            </div>
        </div>
      )}

    </div>
  );
};

export default AlbumDetailView;