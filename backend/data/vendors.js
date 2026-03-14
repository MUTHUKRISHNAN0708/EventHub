const categories = [
  'Wedding Ceremony', 'Wedding Reception', 'Engagement Ceremony', 'Mehendi Function', 'Haldi Ceremony', 'Sangeet Night', 'Bridal Shower', 'Bachelor & Bachelorette',
  'Birthday Party', 'Kids Birthday Party', 'Anniversary', 'Baby Shower', 'Naming Ceremony', 'Graduation Party', 'Housewarming', 'Family Reunion'
];

const vendors = [
  // --- VENUES ---
  {
    name: 'The Grand Imperial Ballroom',
    email: 'info@grandimperial.com',
    phone: '98765-10101',
    location: 'Central Plaza',
    rating: 4.9,
    capacity: 1500,
    vendorType: 'Venue',
    description: 'A majestic venue for grand wedding ceremonies and massive corporate events.',
    bannerImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Wedding Ceremony', 'Wedding Reception', 'Engagement Ceremony', 'Sangeet Night', 'Graduation Party'],
    gallery: []
  },
  {
    name: 'Emerald Heritage Gardens',
    email: 'events@emeraldheritage.com',
    phone: '98765-10102',
    location: 'North Ridge',
    rating: 4.8,
    capacity: 800,
    vendorType: 'Venue',
    description: 'Stunning outdoor landscapes for mehendi, haldi, and garden anniversaries.',
    bannerImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Mehendi Function', 'Haldi Ceremony', 'Anniversary', 'Baby Shower', 'Family Reunion'],
    gallery: []
  },
  {
    name: 'Crystal Waterfront Pavilion',
    email: 'book@crystalwater.com',
    phone: '98765-10103',
    location: 'West Shore',
    rating: 4.7,
    capacity: 500,
    vendorType: 'Venue',
    description: 'Serene lakeside pavilion ideal for bridal showers and intimate naming ceremonies.',
    bannerImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Bridal Shower', 'Naming Ceremony', 'Baby Shower', 'Engagement Ceremony', 'Wedding Ceremony'],
    gallery: []
  },
  {
    name: 'Skyline Urban Loft',
    email: 'hi@skylineloft.com',
    phone: '98765-10104',
    location: 'Uptown',
    rating: 4.6,
    capacity: 200,
    vendorType: 'Venue',
    description: 'Modern, chic loft space for bachelor parties and graduation celebrations.',
    bannerImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Bachelor & Bachelorette', 'Graduation Party', 'Sangeet Night', 'Birthday Party'],
    gallery: []
  },

  // --- CATERING ---
  {
    name: 'Royal Heritage Caterers',
    email: 'chef@royalheritage.com',
    phone: '98765-20201',
    location: 'Citywide',
    rating: 4.9,
    vendorType: 'Catering',
    description: 'Exquisite multi-cuisine menus for royal wedding receptions and grand feasts.',
    bannerImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Wedding Reception', 'Sangeet Night', 'Wedding Ceremony', 'Anniversary'],
    gallery: []
  },
  {
    name: 'The Spice Palette',
    email: 'info@spicepalette.com',
    phone: '98765-20202',
    location: 'Citywide',
    rating: 4.7,
    vendorType: 'Catering',
    description: 'Authentic flavors and traditional spreads for haldi, mehendi, and housewarmings.',
    bannerImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Haldi Ceremony', 'Mehendi Function', 'Housewarming', 'Naming Ceremony'],
    gallery: []
  },
  {
    name: 'Petals & Plates Gourmet',
    email: 'events@petalsplates.com',
    phone: '98765-20203',
    location: 'Citywide',
    rating: 4.8,
    vendorType: 'Catering',
    description: 'High-end artisan catering for baby showers and intimate family reunions.',
    bannerImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Baby Shower', 'Family Reunion', 'Bridal Shower', 'Birthday Party'],
    gallery: []
  },

  // --- PHOTOGRAPHY ---
  {
    name: 'Cinematic Soul Films',
    email: 'shoot@cinematicsoul.com',
    phone: '98765-30301',
    location: 'Citywide',
    rating: 4.9,
    vendorType: 'Photography',
    description: 'Award-winning cinematic coverage for weddings and grand milestones.',
    bannerImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Wedding Ceremony', 'Engagement Ceremony', 'Sangeet Night', 'Anniversary'],
    gallery: []
  },
  {
    name: 'Candid Moments Lab',
    email: 'hello@candidlab.com',
    phone: '98765-30302',
    location: 'Citywide',
    rating: 4.8,
    vendorType: 'Photography',
    description: 'Specializing in raw, emotional candid photography for baby showers and naming ceremonies.',
    bannerImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Baby Shower', 'Naming Ceremony', 'Kids Birthday Party', 'Mehendi Function'],
    gallery: []
  },

  // --- MUSIC & ENTERTAINMENT ---
  {
    name: 'The Beats Empire (DJs)',
    email: 'dj@beatsempire.com',
    phone: '98765-40401',
    location: 'Citywide',
    rating: 4.9,
    vendorType: 'Music & Entertainment',
    description: 'Premier DJ services and high-energy sound for sangeet nights and bachelors.',
    bannerImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Sangeet Night', 'Bachelor & Bachelorette', 'Birthday Party', 'Graduation Party'],
    gallery: []
  },
  {
    name: 'Soulful Strings Orchestra',
    email: 'live@soulfulstrings.com',
    phone: '98765-40402',
    location: 'Citywide',
    rating: 4.7,
    vendorType: 'Music & Entertainment',
    description: 'Live band and acoustic sets for elegant wedding ceremonies and cocktail evenings.',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Wedding Ceremony', 'Anniversary', 'Engagement Ceremony', 'Bridal Shower'],
    gallery: []
  },

  // --- DECOR & STYLING ---
  {
    name: 'Imperial Bloom Decor',
    email: 'style@imperialbloom.com',
    phone: '98765-50501',
    location: 'Citywide',
    rating: 4.9,
    vendorType: 'Decor & Styling',
    description: 'Bespoke high-end floral installations and luxury wedding themes.',
    bannerImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Wedding Ceremony', 'Wedding Reception', 'Engagement Ceremony', 'Anniversary'],
    gallery: []
  },
  {
    name: 'Vibrant Vibes Event Design',
    email: 'hello@vibrantvibes.com',
    phone: '98765-50502',
    location: 'Citywide',
    rating: 4.7,
    vendorType: 'Decor & Styling',
    description: 'Colorful, creative decor for mehendi, haldi, and joyful housewarmings.',
    bannerImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Mehendi Function', 'Haldi Ceremony', 'Housewarming', 'Birthday Party'],
    gallery: []
  },

  // --- LIGHTING & TECHNICAL ---
  {
    name: 'Grand Stage Productions',
    email: 'tech@grandstage.com',
    phone: '98765-60601',
    location: 'Citywide',
    rating: 4.8,
    vendorType: 'Lighting & Technical',
    description: 'Expert event lighting, LED walls, and high-fidelity sound for grand ceremonies.',
    bannerImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Sangeet Night', 'Graduation Party', 'Bachelor & Bachelorette', 'Wedding Reception'],
    gallery: []
  },

  // --- BEAUTY & PERSONAL SERVICES ---
  {
    name: 'Bridal Bliss Beauty',
    email: 'beauty@bridalbliss.com',
    phone: '98765-70701',
    location: 'Beauty Lane',
    rating: 4.9,
    vendorType: 'Beauty & Personal Services',
    description: 'Exclusive bridal makeup and styling for ceremonies and high-profile showers.',
    bannerImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Wedding Ceremony', 'Bridal Shower', 'Engagement Ceremony', 'Mehendi Function'],
    gallery: []
  },

  // --- EVENT PLANNING ---
  {
    name: 'Elegance Concierge Planners',
    email: 'manage@eleganceconcierge.com',
    phone: '98765-80801',
    location: 'Central Heights',
    rating: 4.9,
    vendorType: 'Event Planning',
    description: 'Bespoke end-to-end management for royal weddings and international family reunions.',
    bannerImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=70&w=800',
    eventTypes: ['Wedding Ceremony', 'Family Reunion', 'Wedding Reception', 'Engagement Ceremony'],
    gallery: []
  }
];

export default vendors;
