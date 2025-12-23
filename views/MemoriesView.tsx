import React from 'react';

const MemoriesView: React.FC = () => {
  const memories = [
    { year: 2023, title: "Summer Vibes", date: "June 15", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8qtQFwtW_q1ML7Kw_qTqtatxBQSrRq7-KVaGSNlBHDvO7zdt5enHSbSQWTvJJwDFx8lJtdOjuOqe4mDoUz6Zvky0Hz0hAyXlrJ_NCvEFyVPCsTp3fML0dl4Xc-A5q1RjoBwIy9TVy-HIepKv1AhRpdW9X9F3oHfTT8LeNdnU0UXSjEBdzEgw3Ok2VM0_BygSlTgzjlbm7-9894y0aK3UhPmjJPHkoVsXuk9DhoM0xHoOXKkdIYK5DwRa_2eMjq4U0VevBUS2ARX2W" },
    { year: 2022, title: "University Grad", date: "May 20", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCihmFhbGb25vEBfDU5xZcDtbcjmYVJPQQlDI8ZzNy2eutSJ18-hH3znrUWPh2T8ml5liNIoZ93VcFBtBPAQaXiRkO_JUc6DfT3BCx4SsOupYbNNQmIZDnZh4ATd26BRIqGu4J2V5WSniSk9maZCFP_1ghsprytt8jt-imxDEPkhnlXtx34d4Kua6nonHvVIGPhAUJRt8_hbQ0FhbZ_AgoIxcjfozUMORf4waDLw-qHD5F32qToiTSj8Hm60k4Vnpwx4l28MkCxJnRs" },
    { year: 2020, title: "Swiss Alps", date: "Jan 10", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJDslZIa4-Qz_LAK0tX1DbwI1gr49JqGh9MAFkLJA2v1zL1qZ1ZpNqZun_EsApIOO7m6g6Pwn7Puc_2a58_ckbmEUOn55molKjHiZ_aYZl7SqIF5GUZ-XO1qGTSJLqLgHMrINIqucgc6pKZg_5OXzEa-OZPkANGejbClDgsUZmVJXBzPEHDGmd_J7PBCnLC0h-97jAQZd78EmgcfwlK1GRrygrOT9hH3A9vHTi4WfQcqdU1ELIW9H7OMPUQnSHLcaMZlLGE009K4RM" },
    { year: 2019, title: "Mom's Birthday", date: "Dec 05", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuKI3rvFSNj7KBY0ZeyGGEnpzML3TXrUg2cOAFo01s8BcxOsiDPJUPio0zDe0v0ZTotYL5yd3k7WY4TERcehvw7TL9QkY4yfBGYfggCqxbqElnKtJecSJl_GzBwwB-fWtSJ7cjEaOt0-9PiYqofR045AeWZdNskahf4TjOMW_gmV5TihVnobfZmxH72w0DQgDmEa5LaJW37Jkv2_xfvFfEdQXv-jyOs_fsfVUST2MvAFCGy94B1Tb5MX-NdRo1HA26yxvr9-4RYKiI" },
    { year: 2018, title: "Paris Trip", date: "Oct 12", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBouGcsxuDyzlb8AY4Hlmo-WDysxTo0f2KRF2--S-_Z_IDe-wiSwnDtTQwLtQl7SD1FMMSe0_64lQGhvbH6moFgje1h1_JuSwaJWs-IVKwSVynvKldDJsmI4hM-vdpV55oqzNQGZ2TYOYOnhqOzoXUrXmwD48hJeIRNm6KY6a6JJx19cYzVi905dTnAzcItMujUOTafVIYrkdt3HHlZIBPcPA1Be8e3D8DcGCOewCOeE7Hom2_V8ZssAlZ12zY3Om7EufgXECPpJfHk" },
    { year: 2017, title: "Hiking Adventure", date: "Aug 22", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuALrooqafrVK9UqbQ33Wp5LiihjFIeMhL4tmQJEhIO75tc0xXl3QbhwqsXaz-tN4x8iCMSnqas3li9HxPGZRgwrMqlewv2Zw6_ZyLUNjZmz4X8bNcN7HwkfydNDsuw04q3QU6YXcWsCyMTcQlLfGPYdaEYVoeGNhVH9mSXJz4V2WkJM7hraOhpVl26So09M6mAUBHoicGekCkWvyeQfl1msRUxQ08Oky2pZaBpM34UIEYCNz-HrgEVGllW7zQ8qvR6UM60rNVHRUV5b" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10 h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">Your Timeline</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Rediscover your favorite moments from the past.</p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((item, index) => (
                <div key={index} className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
                    <img 
                        src={item.src} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg">
                        {item.year}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <div className="w-10 h-1 bg-primary rounded-full mb-4 w-0 group-hover:w-10 transition-all duration-500"></div>
                        <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{item.date}</p>
                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Click to view 24 photos from this day.</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MemoriesView;
