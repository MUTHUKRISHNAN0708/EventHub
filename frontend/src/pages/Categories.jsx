import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const weddingFunctions = [
  { name: 'Wedding Ceremony', icon: '💍', desc: 'Find Venues, Decorators, Photographers and Caterers.' },
  { name: 'Wedding Reception', icon: '🥂', desc: 'Party halls, fine dining, and entertainers.' },
  { name: 'Engagement Ceremony', icon: '💖', desc: 'Intimate venues, rings, and romantic decor.' },
  { name: 'Mehendi Function', icon: '🌿', desc: 'Specialized artists, floral decor, and lively music.' },
  { name: 'Haldi Ceremony', icon: '🟡', desc: 'Bright yellow decor, photography, and joyful vibes.' },
  { name: 'Sangeet Night', icon: '🎶', desc: 'Choreographers, DJs, and grand stages.' },
  { name: 'Bridal Shower', icon: '👑', desc: 'Elegant small spaces, games, and curated gifts.' },
  { name: 'Bachelor & Bachelorette', icon: '🎉', desc: 'Exciting venues and entertainment for friends.' },
];

const celebrationFunctions = [
  { name: 'Birthday Party', icon: '🎂', desc: 'Venues, cake shops, and entertainers of all kinds.' },
  { name: 'Kids Birthday Party', icon: '🎈', desc: 'Clowns, face painting, and activity coordinators.' },
  { name: 'Anniversary', icon: '🍷', desc: 'Romantic spots, private dining, and gifting.' },
  { name: 'Baby Shower', icon: '👶', desc: 'Cozy spaces and beautiful pastel decorations.' },
  { name: 'Naming Ceremony', icon: '📜', desc: 'Traditional venues and catering for family gatherings.' },
  { name: 'Graduation Party', icon: '🎓', desc: 'Party halls to celebrate academic achievements.' },
  { name: 'Housewarming', icon: '🏠', desc: 'Catering and decor for your new home.' },
  { name: 'Family Reunion', icon: '👨‍👩‍👧‍👦', desc: 'Large spaces, catering, and fun activities for everyone.' },
];

const Categories = () => {
  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get('type');

  return (
    <div className="bg-midnight min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gradient inline-block tracking-tight mb-4">Event Categories</h1>
          <p className="text-lg md:text-xl text-primary-400/60 max-w-2xl mx-auto italic font-medium uppercase tracking-tighter leading-tight translate-y-[-5px] md:translate-y-[-10px]">
            Curating the finest legends and imperial venues for your monumental milestones.
          </p>
        </div>

        <div className="mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-primary-200 mb-8 md:mb-10 tracking-tight uppercase border-b border-primary-500/10 pb-4 inline-block">Wedding Celebrations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {weddingFunctions.map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/vendors?eventType=${cat.name}`}
                className={`bg-white/5 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border group relative overflow-hidden hover:-translate-y-2 hover-glow ${
                  selectedType === cat.name 
                  ? 'border-royal-blue dark:border-primary-500 scale-[1.02] shadow-xl' 
                  : 'border-primary-500/10 dark:border-primary-900/20 hover:border-royal-blue dark:hover:border-primary-500'
                }`}
              >
                {selectedType === cat.name && (
                  <div className="absolute top-0 right-0 royal-gradient text-primary-200 px-3 py-1 rounded-bl-xl text-[8px] font-black tracking-widest shadow-lg">
                    SELECTED
                  </div>
                )}
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:animate-float drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">{cat.icon}</div>
                <h3 className="text-lg md:text-xl font-black text-primary-100 mb-2 md:mb-3 tracking-tighter uppercase group-hover:text-primary-500 transition-colors leading-tight">{cat.name}</h3>
                <p className="text-primary-200/60 mb-4 md:mb-6 font-semibold uppercase text-[8px] md:text-[9px] tracking-[0.12em] md:tracking-[0.15em] leading-snug lg:h-16">{cat.desc}</p>
                <div className="text-royal-blue dark:text-primary-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] flex items-center group-hover:translate-x-1 transition-all">
                  Find Vendors <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-primary-200 mb-10 tracking-tight uppercase border-b border-primary-500/10 pb-4 inline-block">Personal Celebrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {celebrationFunctions.map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/vendors?eventType=${cat.name}`}
                className={`bg-white/5 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border group relative overflow-hidden hover:-translate-y-2 hover-glow ${
                  selectedType === cat.name 
                  ? 'border-royal-blue dark:border-primary-500 scale-[1.02] shadow-xl' 
                  : 'border-primary-500/10 dark:border-primary-900/20 hover:border-royal-blue dark:hover:border-primary-500'
                }`}
              >
                {selectedType === cat.name && (
                  <div className="absolute top-0 right-0 royal-gradient text-primary-200 px-3 py-1 rounded-bl-xl text-[8px] font-black tracking-widest shadow-lg">
                    SELECTED
                  </div>
                )}
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:animate-float drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">{cat.icon}</div>
                <h3 className="text-lg md:text-xl font-black text-primary-100 mb-2 md:mb-3 tracking-tighter uppercase group-hover:text-primary-500 transition-colors leading-tight">{cat.name}</h3>
                <p className="text-primary-200/60 mb-4 md:mb-6 font-semibold uppercase text-[8px] md:text-[9px] tracking-[0.12em] md:tracking-[0.15em] leading-snug lg:h-16">{cat.desc}</p>
                <div className="text-royal-blue dark:text-primary-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] flex items-center group-hover:translate-x-1 transition-all">
                  Find Vendors <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
