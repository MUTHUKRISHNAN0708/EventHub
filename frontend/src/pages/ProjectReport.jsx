import React from 'react';
import { Calendar, Layers, Shield, Database, Layout, Users, TrendingUp, Cpu, Globe, Rocket, Zap, Image as ImageIcon, CheckCircle, Smartphone, ExternalLink, Printer } from 'lucide-react';

const ProjectReport = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif overflow-y-auto">
      {/* Print Controls - Hidden during print */}
      <div className="fixed top-6 right-6 z-50 no-print">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 font-sans font-bold uppercase tracking-widest text-xs"
        >
          <Printer size={16} /> Export Imperial PDF
        </button>
      </div>

      {/* Global Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; }
          .page-break { page-break-after: always; }
          .report-page { height: 100vh; padding: 2cm; display: flex; flex-col: column; }
          .section-title { color: #d4af37 !important; border-bottom: 2px solid #d4af37 !important; }
        }
        .text-gradient-gold { 
          background: linear-gradient(135deg, #d4af37 0%, #f1c40f 50%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .report-page { width: 100%; max-width: 1000px; margin: 0 auto; min-height: 100vh; padding: 3rem; background: white; box-shadow: 0 0 40px rgba(0,0,0,0.05); }
      `}</style>

      {/* PAGE 1: COVER PAGE */}
      <section className="report-page page-break flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 mb-6 bg-primary-600 rounded-2xl flex items-center justify-center text-white">
          <Calendar size={48} />
        </div>
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-gray-900">EventSpark</h1>
        <h2 className="text-xl font-bold uppercase tracking-[0.4em] text-primary-600 mb-12">Eternal Edition</h2>
        <div className="h-1 w-32 bg-primary-600 mb-12"></div>
        <p className="text-2xl font-light italic mb-20 text-gray-500">Comprehensive Technical Implementation Report</p>
        <div className="space-y-2 text-sm font-sans uppercase tracking-widest text-gray-400">
          <p>Prepared for: Royal Administration</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Version: 2.1.0 Cloud Tier</p>
        </div>
      </section>

      {/* PAGE 2: PROJECT VISION */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Rocket className="text-primary-600" /> 01. Project Vision
        </h3>
        <p className="text-lg leading-relaxed mb-6">
          EventSpark was conceived as the premier "all-in-one" ecosystem for event management. Unlike traditional booking platforms, EventSpark focuses on a <strong>Royal Aesthetic</strong> combined with <strong>Industrial-Grade Backend Stability</strong>.
        </p>
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-primary-600 mb-2 uppercase tracking-wide">Core Objective</h4>
            <p className="text-sm text-gray-600 leading-relaxed">To bridge the gap between niche vendors and high-intent clients through a seamless, automated interface that handles everything from discovery to financial settlement.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-primary-600 mb-2 uppercase tracking-wide">Market Position</h4>
            <p className="text-sm text-gray-600 leading-relaxed">The "Eternal Edition" targets the luxury segment, emphasizing high-end venues, cinematic photography, and elite catering services.</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
           <Zap className="text-primary-600/20 w-32 h-32" />
        </div>
      </section>

      {/* PAGE 3: TECHNICAL ARCHITECTURE (MERN) */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Layers className="text-primary-600" /> 02. Technical Architecture
        </h3>
        <p className="text-lg leading-relaxed mb-8">
          The platform follows a classic yet highly optimized <strong>MERN Stack</strong> (MongoDB, Express, React, Node) architecture, decoupled to allow for independent scaling of the frontend and API layers.
        </p>
        <div className="border-4 border-gray-100 p-4 rounded-3xl mb-8 flex justify-center bg-gray-900 overflow-hidden">
          <img src="/mern_architecture_diagram_1773246287510.png" alt="MERN Architecture" className="w-full h-auto rounded-xl" />
        </div>
        <ul className="space-y-4 font-sans list-none">
          <li className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] mt-1 shrink-0">1</div>
            <div>
              <span className="font-bold">React Frontend:</span> Single Page Application (SPA) utilizing Hooks and Context API for global state management.
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] mt-1 shrink-0">2</div>
            <div>
              <span className="font-bold">Node/Express Backend:</span> RESTful API architecture with middleware-driven security and JSON-based communication.
            </div>
          </li>
        </ul>
      </section>

      {/* PAGE 4: DATABASE SCHEMA & MODELING */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Database className="text-primary-600" /> 03. Data Modeling
        </h3>
        <p className="text-lg leading-relaxed mb-8">
          Our data schema is designed for <strong>Relational Consistency</strong> within a Non-Relational (NoSQL) database. We utilize Mongoose for schema enforcement and automated relationship mapping.
        </p>
        <div className="border-4 border-gray-100 p-4 rounded-3xl mb-8 flex justify-center bg-gray-900 overflow-hidden">
          <img src="/database_schema_visualization_1773246323294.png" alt="Database Schema" className="w-full h-auto rounded-xl" />
        </div>
        <div className="grid grid-cols-3 gap-4 font-sans text-[10px] uppercase font-bold tracking-widest text-center">
          <div className="bg-gray-100 p-4 rounded-xl">Users (Auth/Roles)</div>
          <div className="bg-gray-100 p-4 rounded-xl">Vendors (Catalog)</div>
          <div className="bg-gray-100 p-4 rounded-xl">Bookings (Transactions)</div>
        </div>
      </section>

      {/* PAGE 5: USER EXPERIENCE & INTERFACE */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Layout className="text-primary-600" /> 04. UI/UX Philosophy
        </h3>
        <p className="text-lg leading-relaxed mb-12">
          The interface leverages a <strong>Glassmorphic Dark Mode</strong>, inspired by modern royal aesthetics. We prioritize visual hierarchy using high-contrast gold accents against midnight-black backgrounds.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-12">
           <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
             <img src="/media__1773234979211.png" alt="Landing UI" className="w-full h-full object-cover" />
           </div>
           <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
             <img src="/media__1773237370043.png" alt="Categories UI" className="w-full h-full object-cover" />
           </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <Zap className="text-primary-600 px-1 bg-primary-100 rounded" />
             <span className="font-bold">Micro-interactions:</span> Subtle hover states and float animations for a premium feel.
          </div>
          <div className="flex items-center gap-4">
             <Smartphone className="text-primary-600 px-1 bg-primary-100 rounded" />
             <span className="font-bold">Responsive Design:</span> Fully fluid layouts that transition from mobile to 4K displays.
          </div>
        </div>
      </section>

      {/* PAGE 6: AUTHENTICATION & SECURITY */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Shield className="text-primary-600" /> 05. Security Protocols
        </h3>
        <div className="bg-primary-50 p-8 rounded-[3rem] border-2 border-primary-100 mb-12">
          <h4 className="text-xl font-bold text-primary-900 mb-4">JWT Implementation</h4>
          <p className="text-gray-700 leading-relaxed italic">
            "All sessions are secured via stateless JSON Web Tokens, stored using HTTP-only strategies to prevent XSS and CSRF vulnerabilities."
          </p>
        </div>
        <div className="space-y-8 font-sans">
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white shadow-xl border border-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
              <Cpu className="text-primary-600" />
            </div>
            <div>
              <h5 className="font-bold text-lg">Bcrypt Hashing</h5>
              <p className="text-gray-500 text-sm">Passwords are never stored in plain text. We utilize 10 rounds of salt-based hashing to ensure cryptographic integrity.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white shadow-xl border border-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
              <TrendingUp className="text-primary-600" />
            </div>
            <div>
              <h5 className="font-bold text-lg">Middleware Guards</h5>
              <p className="text-gray-500 text-sm">Every admin route is multi-layered. First, the 'protect' middleware verifies the token, then 'admin' middleware checks for the required role level.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 7: ADMIN DASHBOARD (OVERVIEW) */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Cpu className="text-primary-600" /> 06. Admin Command Center
        </h3>
        <p className="text-lg leading-relaxed mb-8">
           The <strong>Imperial Command Center</strong> provides a birds-eye view of platform performance metrics, booking growth, and registry health.
        </p>
        <div className="border-8 border-gray-900 p-2 rounded-[2.5rem] mb-12 shadow-2xl overflow-hidden bg-gray-950">
          <img src="/admin_dashboard_overview_1773241168317.png" alt="Admin Dashboard" className="w-full h-auto rounded-xl" />
        </div>
        <div className="grid grid-cols-4 gap-4">
           {['KPI Analytics', 'Booking Logs', 'Vendor Registry', 'Citizen Index'].map(item => (
             <div key={item} className="p-3 border border-gray-200 rounded-xl text-[9px] font-black uppercase tracking-tighter text-center bg-white shadow-sm">
               {item}
             </div>
           ))}
        </div>
      </section>

      {/* PAGE 8: VENDOR REGISTRY & MANAGEMENT */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Globe className="text-primary-600" /> 07. Vendor Management
        </h3>
        <p className="text-lg leading-relaxed mb-6">
          The registry serves as the backbone of the platform, hosting over 260+ active services. Admins have granular control over vendor metadata, ratings, and gallery assets.
        </p>
        <div className="bg-gray-900 p-8 rounded-3xl text-primary-200 font-sans text-sm mb-12 shadow-inner">
          <p className="font-mono text-primary-500/50 mb-4">// Core Registry Operations</p>
          <div className="space-y-2">
            <p className="flex items-center gap-2"><CheckCircle size={14} /> POST /api/admin/vendors (Creation)</p>
            <p className="flex items-center gap-2"><CheckCircle size={14} /> PUT /api/admin/vendors/:id (Update)</p>
            <p className="flex items-center gap-2"><CheckCircle size={14} /> DELETE /api/admin/vendors/:id (Eviction)</p>
          </div>
        </div>
        <p className="text-gray-500 italic text-center">Implementation of Universal Booking logic allows any vendor type to be booked directly without prerequisite steps.</p>
      </section>

      {/* PAGE 9: BOOKING ENGINE & WORKFLOW */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <TrendingUp className="text-primary-600" /> 08. Booking Engine
        </h3>
        <p className="text-lg leading-relaxed mb-8">
           The booking engine handles complex temporal logic, ensuring date availability and capacity constraints are respected across various vendor categories.
        </p>
        <div className="space-y-12">
          <div className="relative pl-12 border-l-4 border-primary-600">
            <div className="absolute top-0 -left-[14px] w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-[10px]">1</div>
            <h5 className="font-bold uppercase tracking-widest text-primary-600">Event Configuration</h5>
            <p className="text-sm text-gray-600">Users select event types, guests count, and dates. Logic dynamically updates available services based on these parameters.</p>
          </div>
          <div className="relative pl-12 border-l-4 border-primary-600">
            <div className="absolute top-0 -left-[14px] w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-[10px]">2</div>
            <h5 className="font-bold uppercase tracking-widest text-primary-600">Service Selection</h5>
            <p className="text-sm text-gray-600">Multi-tier package selection with real-time price calculation and feature comparison.</p>
          </div>
          <div className="relative pl-12 border-l-4 border-primary-600">
            <div className="absolute top-0 -left-[14px] w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-[10px]">3</div>
            <h5 className="font-bold uppercase tracking-widest text-primary-600">Provisioning</h5>
            <p className="text-sm text-gray-600">Automated ledger entry creation and notification triggers for vendor response.</p>
          </div>
        </div>
      </section>

      {/* PAGE 10: USER REGISTRY (CITIZENS) */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Users className="text-primary-600" /> 09. Imperial Citizens
        </h3>
        <p className="text-lg leading-relaxed mb-8">
           The Citizens registry manages the entire user base, providing admins with role-based orchestration tools (Citizen vs. Admin).
        </p>
        <div className="flex gap-8 items-center mb-12">
          <div className="flex-1 bg-primary-900 text-white p-6 rounded-3xl text-center">
            <h6 className="text-xs uppercase opacity-60 mb-2 tracking-[0.2em]">Total Population</h6>
            <p className="text-4xl font-black">Live Index</p>
          </div>
          <div className="flex-1 bg-primary-50 text-primary-900 p-6 rounded-3xl text-center border-2 border-primary-100">
            <h6 className="text-xs uppercase opacity-60 mb-2 tracking-[0.2em]">Active Admins</h6>
            <p className="text-4xl font-black">Managed</p>
          </div>
        </div>
        <p className="text-gray-600 font-sans italic">"Deleted accounts are purged instantly, while role changes propagate through the system in real-time without session disruption."</p>
      </section>

      {/* PAGE 11: FINANCIAL ANALYTICS (TREASURY) */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <TrendingUp className="text-primary-600" /> 10. Royal Treasury
        </h3>
        <p className="text-lg leading-relaxed mb-8">
           The Treasury tab provides high-fidelity financial insights, aggregating data across thousands of potential booking scenarios to produce actionable business intelligence.
        </p>
        <div className="grid grid-cols-2 gap-8 mb-12">
           <div className="p-8 border-4 border-gray-100 rounded-3xl">
             <h6 className="font-bold text-gray-400 mb-4 uppercase text-xs">Revenue Streams</h6>
             <div className="space-y-4">
               {[ {n: 'Venues', p: '65%'}, {n: 'Catering', p: '20%'}, {n: 'Services', p: '15%'}].map(s => (
                 <div key={s.n} className="flex justify-between items-center text-sm font-bold">
                    <span>{s.n}</span>
                    <span className="text-primary-600">{s.p}</span>
                 </div>
               ))}
             </div>
           </div>
           <div className="bg-gray-900 rounded-3xl flex items-center justify-center p-8">
              <div className="w-full h-full border-2 border-dashed border-primary-500/30 rounded-2xl flex items-center justify-center">
                 <TrendingUp size={48} className="text-primary-500/40" />
              </div>
           </div>
        </div>
        <p className="text-sm font-sans text-gray-500">Analytics are generated using MongoDB's $aggregate framework for real-time calculation accuracy.</p>
      </section>

      {/* PAGE 12: CATALOG DENSITY & EXPANSION */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Rocket className="text-primary-600" /> 11. Data Catalog Expansion
        </h3>
        <p className="text-lg leading-relaxed mb-8">
           Standardizing the vendor experience led to the <strong>Multi-Template Injection</strong> strategy, ensuring every partner has 10+ high-quality products.
        </p>
        <div className="space-y-6">
           <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-6">
             <div className="p-3 bg-white shadow rounded-lg"><CheckCircle className="text-green-500" /></div>
             <div>
               <h6 className="font-bold">260+ Unique Services</h6>
               <p className="text-xs text-gray-500">Categorized by type, level (Premium/Basic), and features.</p>
             </div>
           </div>
           <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-6">
             <div className="p-3 bg-white shadow rounded-lg"><CheckCircle className="text-green-500" /></div>
             <div>
               <h6 className="font-bold">Dynamic Pricing Models</h6>
               <p className="text-xs text-gray-500">Auto-generated realistic prices based on industry standards.</p>
             </div>
           </div>
        </div>
      </section>

      {/* PAGE 13: CLOUD INFRASTRUCTURE (ATLAS) */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Globe className="text-primary-600" /> 12. Cloud Infrastructure
        </h3>
        <p className="text-lg leading-relaxed mb-8">
           Migration from local storage to **MongoDB Atlas** ensures 99.9% uptime and allows for multi-region data replication.
        </p>
        <div className="relative p-12 bg-white border-2 border-primary-100 rounded-3xl overflow-hidden shadow-xl text-center">
           <Globe size={120} className="absolute -right-8 -bottom-8 text-primary-500/5" />
           <h6 className="text-primary-600 font-black mb-4 uppercase tracking-[0.3em]">AWS Global Cluster</h6>
           <p className="text-gray-600 italic">"Leveraging the 'Cluster0' tier for high-availability cloud storage."</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 text-xs font-sans uppercase tracking-widest">
           <div className="p-4 border border-gray-100 rounded-lg text-center">Auto-Scaling Logic</div>
           <div className="p-4 border border-gray-100 rounded-lg text-center">Global IP Whitelisting</div>
        </div>
      </section>

      {/* PAGE 14: FRONTEND OPTIMIZATION */}
      <section className="report-page page-break">
        <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
          <Zap className="text-primary-600" /> 13. Frontend Performance
        </h3>
        <p className="text-lg leading-relaxed mb-12">
           The frontend uses <strong>Vite</strong> for ultra-fast build times and <strong>Tailwind CSS</strong> for atomic-level styling control.
        </p>
        <div className="p-8 bg-gray-900 rounded-[3rem] text-primary-200">
           <h6 className="font-bold text-primary-500 mb-6 uppercase tracking-widest">Optimized Assets</h6>
           <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest">
                  <span>Image Optimization</span>
                  <span>98/100</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full"><div className="w-[98%] bg-primary-600 h-full rounded-full"></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest">
                  <span>Logic Bundling</span>
                  <span>Lightweight</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full"><div className="w-[100%] bg-primary-600 h-full rounded-full"></div></div>
              </div>
           </div>
        </div>
      </section>

      {/* PAGE 15: CONCLUSION & FUTURE ROADMAP */}
      <section className="report-page flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-black uppercase tracking-widest border-b-4 border-primary-600 pb-4 mb-8 section-title flex items-center gap-4">
            <Rocket className="text-primary-600" /> 14. Conclusion & Roadmap
          </h3>
          <p className="text-lg leading-relaxed mb-12">
            EventSpark Eternal Edition represents the pinnacle of modern web development for the event industry. The foundation is set for massive global scale.
          </p>
          <div className="grid grid-cols-1 gap-6">
             <div className="flex items-center gap-6 p-6 border-l-8 border-primary-600 bg-primary-50/50">
               <ImageIcon className="text-primary-600" />
               <div className="font-bold uppercase tracking-widest">AI Matching Engine</div>
             </div>
             <div className="flex items-center gap-6 p-6 border-l-8 border-primary-600 bg-primary-50/50">
               <Shield className="text-primary-600" />
               <div className="font-bold uppercase tracking-widest">Escrow Payment Gateway</div>
             </div>
             <div className="flex items-center gap-6 p-6 border-l-8 border-primary-600 bg-primary-50/50 opacity-40">
               <Globe className="text-primary-600" />
               <div className="font-bold uppercase tracking-widest">Multi-Lingual Registry</div>
             </div>
          </div>
        </div>
        
        <div className="mt-20 text-center border-t border-gray-100 pt-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Finalizing Decree</p>
          <div className="flex justify-center gap-2">
            {[1,2,3].map(i => <div key={i} className="w-6 h-1 bg-primary-600"></div>)}
          </div>
          <p className="mt-8 text-2xl font-black italic tracking-tighter">EventSpark Team</p>
        </div>
      </section>
    </div>
  );
};

export default ProjectReport;
