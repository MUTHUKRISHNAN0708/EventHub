import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Force DNS resolution to use Google's DNS servers for SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const startSeeding = async () => {
    try {
        console.log('Connecting to MongoDB at:', process.env.MONGO_URI ? 'URI PRESENT' : 'URI MISSING');
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 60000,
            connectTimeoutMS: 60000,
        });
        
        console.log('MongoDB connected successfully for seeding');
        
        // Dynamic imports for models and data to ensure connection is ready
        const { default: Vendor } = await import('./models/Vendor.js');
        const { default: Service } = await import('./models/Service.js');
        const { default: User } = await import('./models/User.js');
        const { default: Booking } = await import('./models/Booking.js');
        const { default: vendors } = await import('./data/vendors.js');

        console.log('Models and Data imported. Starting cleanup...');

        await Booking.deleteMany();
        await Service.deleteMany();
        await Vendor.deleteMany();
        await User.deleteMany();

        console.log('Cleanup complete. Creating users...');

        // Create an Admin user
        const adminUser = await User.create({
            name: 'Muthu Krishnan',
            email: 'muthugk@gmail.com',
            password: 'muthu@2005',
            role: 'admin'
        });

        // Create Customer
        const customerUser = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'customer'
        });

        console.log('Users created. Inserting vendors...');
        const createdVendors = await Vendor.insertMany(vendors);
        console.log(`${createdVendors.length} vendors inserted.`);

        const serviceTemplates = {
            'Venue': [
                { name: 'Grand Ballroom Access', price: 5000, packageLevel: 'Premium', desc: 'Full-day access to the flagship ballroom with setup.' },
                { name: 'Rooftop Garden Setup', price: 3000, packageLevel: 'Standard', desc: 'Breathtaking open-air experience for evening parties.' },
                { name: 'Intimate Lounge Suite', price: 1200, packageLevel: 'Basic', desc: 'Perfect for small gatherings and private celebrations.' },
                { name: 'VIP Bridal Prep Suite', price: 800, packageLevel: 'Standard', desc: 'Luxury preparation rooms with 5-star amenities.' },
                { name: 'Imperial Dining Hall', price: 2500, packageLevel: 'Standard', desc: 'Classic hall for banquet-style dining.' },
                { name: 'Lakeside Pavilion', price: 4500, packageLevel: 'Premium', desc: 'Scenic waterfront access for outdoor ceremonies.' },
                { name: 'Executive Meeting Hub', price: 1500, packageLevel: 'Basic', desc: 'Professional space for corporate summits.' },
                { name: 'Poolside Party Deck', price: 2000, packageLevel: 'Standard', desc: 'Vibrant outdoor lounge for social parties.' },
                { name: 'Valet & Security Pack', price: 600, packageLevel: 'Basic', desc: 'Premium valet and guard services for 100+ cars.' },
                { name: '48hr Full Buyout', price: 15000, packageLevel: 'Premium', desc: 'exclusive access to all facilities for the entire weekend.' }
            ],
            'Catering': [
                { name: 'Royal Wedding Buffet', price: 85, packageLevel: 'Premium', desc: 'Elite multi-cuisine experience with 10+ live stations.' },
                { name: 'Heritage Classic Thali', price: 45, packageLevel: 'Standard', desc: 'Traditional recipes served in authentic style.' },
                { name: 'Global Fusion Menu', price: 65, packageLevel: 'Premium', desc: 'A sophisticated blend of east and west cuisines.' },
                { name: 'Midnight Spark Bites', price: 25, packageLevel: 'Basic', desc: 'Gourmet late-night snacks for the after-party.' },
                { name: 'Artisan Dessert Wall', price: 30, packageLevel: 'Standard', desc: 'Visual and culinary masterpiece of fine sweets.' },
                { name: 'Champagne & Caviar Bar', price: 150, packageLevel: 'Premium', desc: 'Ultra-luxury service for high-end receptions.' },
                { name: 'Healthy Harvest Vegan', price: 55, packageLevel: 'Standard', desc: 'Trend-setting plant-based dining experience.' },
                { name: 'Live BBQ & Grill Station', price: 70, packageLevel: 'Standard', desc: 'Freshly grilled premium cuts and seafood.' },
                { name: 'High-Tea Elite Service', price: 40, packageLevel: 'Basic', desc: 'Sophisticated afternoon tea with delicate pastries.' },
                { name: 'Kids Fun Food Pack', price: 20, packageLevel: 'Basic', desc: 'Colorful and healthy menu tailored for children.' }
            ],
            'Photography': [
                { name: 'Cinematic Masterpiece', price: 4000, packageLevel: 'Premium', desc: 'Multi-cam 4K coverage with cinematic short film.' },
                { name: 'Heritage Wedding Album', price: 1500, packageLevel: 'Standard', desc: 'Traditional coverage with 100-page leather album.' },
                { name: 'Drone Aerial coverage', price: 1000, packageLevel: 'Standard', desc: 'Breathtaking 4K aerial shots of your venue.' },
                { name: 'Candid Soul Collection', price: 2000, packageLevel: 'Premium', desc: 'Focus on authentic emotions and raw moments.' },
                { name: 'Pre-Wedding Spark Tour', price: 1200, packageLevel: 'Standard', desc: '6-hour outdoor shoot at 3 premium locations.' },
                { name: 'Live Photo Booth Pro', price: 800, packageLevel: 'Basic', desc: 'Instant prints and props for guest entertainment.' },
                { name: 'Engagement Essentials', price: 900, packageLevel: 'Basic', desc: 'Core coverage for your promise ceremony.' },
                { name: '4K Full Length Edit', price: 1800, packageLevel: 'Standard', desc: 'Professionally edited 90-minute event film.' },
                { name: 'Luxury Coffee Table Book', price: 500, packageLevel: 'Standard', desc: 'Minimalist high-quality print collection.' },
                { name: 'Fast-Track Raw Edits', price: 300, packageLevel: 'Basic', desc: 'Receive all raw files within 24 hours.' }
            ],
            'Music & Entertainment': [
                { name: 'Symphony Live Band', price: 3500, packageLevel: 'Premium', desc: '8-piece professional orchestra for grand events.' },
                { name: 'Elite LED DJ Set', price: 1500, packageLevel: 'Standard', desc: 'Modern club-style DJ with LED console and effects.' },
                { name: 'Acoustic Soul Duo', price: 800, packageLevel: 'Basic', desc: 'Intimate vocal and guitar performance for cocktails.' },
                { name: 'Traditional Folk Troupe', price: 1200, packageLevel: 'Standard', desc: 'Authentic cultural dancers and musicians.' },
                { name: 'Grand Entrance Percussion', price: 1000, packageLevel: 'Standard', desc: 'Powerful drum core for the arrivals.' },
                { name: 'Celebrity Host / MC', price: 2000, packageLevel: 'Premium', desc: 'High-energy professional event host.' },
                { name: 'Laser & Light Show', price: 2500, packageLevel: 'Premium', desc: 'Synchronized visual and music performance.' },
                { name: 'Classical Harp Soloist', price: 600, packageLevel: 'Basic', desc: 'Elegant instrumental music for ceremonies.' },
                { name: 'Jazz Quartet Soirée', price: 1800, packageLevel: 'Standard', desc: 'Smooth jazz for premium networking dinners.' },
                { name: 'Karaoke Pro Station', price: 500, packageLevel: 'Basic', desc: 'Interactive guest singing experience setup.' }
            ],
            'Decor & Styling': [
                { name: 'Royal Palace Theme', price: 6000, packageLevel: 'Premium', desc: 'Opulent gold and white decor with floral walls.' },
                { name: 'Enchanted Forest Setup', price: 4500, packageLevel: 'Premium', desc: 'Magical greenery and fairy light installation.' },
                { name: 'Modern Minimalist Decor', price: 2500, packageLevel: 'Standard', desc: 'Sleek, sharp, and contemporary aesthetic.' },
                { name: 'Floral Canopy Entrance', price: 1200, packageLevel: 'Basic', desc: 'Exquisite fresh flower tunnel for guest arrival.' },
                { name: 'Vintage Sparkle Theme', price: 3000, packageLevel: 'Standard', desc: 'Classic retro vibes with velvet and brass.' },
                { name: 'Centerpiece Elite Pack', price: 1000, packageLevel: 'Standard', desc: 'Custom table designs for 50 tables.' },
                { name: 'Stage & Mandap Design', price: 3500, packageLevel: 'Premium', desc: 'Bespoke central stage for the main ceremony.' },
                { name: 'Fabric & Silk Draping', price: 1500, packageLevel: 'Standard', desc: 'Flowing ceiling and wall draping for elegance.' },
                { name: 'Outdoor Fairy Lighting', price: 800, packageLevel: 'Basic', desc: 'Warm ambient lighting for open-air spaces.' },
                { name: 'Themed Photo Backdrop', price: 500, packageLevel: 'Basic', desc: 'High-quality visual wall for guest photos.' }
            ],
            'Lighting & Technical': [
                { name: 'Grand Stage Illumination', price: 2500, packageLevel: 'Premium', desc: 'Full stage lighting rig with moving heads and haze.' },
                { name: 'LED Video Wall (12x8)', price: 3000, packageLevel: 'Premium', desc: 'High-resolution backdrop for visuals and live feed.' },
                { name: 'Ambient Uplighting Pack', price: 600, packageLevel: 'Basic', desc: '20 LED par cans to paint the venue in your colors.' },
                { name: 'Intelligent Dance Lighting', price: 1200, packageLevel: 'Standard', desc: 'Automated lights synchronized to the DJ beats.' },
                { name: 'Pro Sound System (Large)', price: 1800, packageLevel: 'Standard', desc: 'Crystal clear audio for up to 1000 guests.' },
                { name: 'Cold Spark Fountain (4)', price: 800, packageLevel: 'Standard', desc: 'Safe indoor pyrotechnics for grand entries.' },
                { name: 'Laser Beam Graphics', price: 1500, packageLevel: 'Premium', desc: 'Stunning laser animations and beam effects.' },
                { name: 'Live Stream Setup', price: 1000, packageLevel: 'Standard', desc: 'Multi-camera broadcast for remote attendees.' },
                { name: 'Wireless Mic & PA Pack', price: 300, packageLevel: 'Basic', desc: 'Essential audio for speeches and announcements.' },
                { name: 'Fog & Bubble Machines', price: 200, packageLevel: 'Basic', desc: 'Fun atmosphere enhancers for the dance floor.' }
            ],
            'Beauty & Personal Services': [
                { name: 'Royal Bridal Transformation', price: 1200, packageLevel: 'Premium', desc: 'Elite makeup, hair, and draping for the big day.' },
                { name: 'Luxury Groom Grooming', price: 400, packageLevel: 'Standard', desc: 'Full skin and hair prep for the groom.' },
                { name: 'Bridesmaid Glam Pack (5)', price: 1500, packageLevel: 'Standard', desc: 'Consistent, elegant look for the bridal party.' },
                { name: 'High-Def Airbrush Makeup', price: 600, packageLevel: 'Premium', desc: 'Flawless, sweat-proof finish for 12+ hours.' },
                { name: 'Pre-Wedding Spa Retreat', price: 800, packageLevel: 'Premium', desc: 'Full-body relaxation and skin rejuvenation.' },
                { name: 'Traditional Mehndi Art', price: 300, packageLevel: 'Standard', desc: 'Intricate henna designs for hands and feet.' },
                { name: 'Hair Extensions & Styling', price: 500, packageLevel: 'Standard', desc: 'Bespoke hair design with volume and length.' },
                { name: 'Touch-up Kit & Assistant', price: 400, packageLevel: 'Basic', desc: 'Dedicated assistant for on-the-go fixes.' },
                { name: 'Manicure & Pedicure Elite', price: 200, packageLevel: 'Basic', desc: 'Complete nail care with premium gel polish.' },
                { name: 'Floral Hair Accessories', price: 150, packageLevel: 'Basic', desc: 'Fresh flower jewelry and hair accents.' }
            ],
            'Event Planning': [
                { name: 'Full Imperial Planning', price: 5000, packageLevel: 'Premium', desc: 'End-to-end coordination from concept to cleanup.' },
                { name: 'Month-of Management', price: 2000, packageLevel: 'Standard', desc: 'Tying loose ends and executing the final 30 days.' },
                { name: 'On-Day Coordination', price: 1000, packageLevel: 'Basic', desc: 'Professional on-site management for 12 hours.' },
                { name: 'Budget & Vendor Concierge', price: 1500, packageLevel: 'Standard', desc: 'Expert financial planning and vendor selection.' },
                { name: 'Theme & Concept Design', price: 1200, packageLevel: 'Standard', desc: 'Creating the visual identity and mood of your event.' },
                { name: 'Destination Scout Pack', price: 800, packageLevel: 'Basic', desc: 'Research and site visits for 3 potential cities.' },
                { name: 'RSVP & Guest Management', price: 1000, packageLevel: 'Standard', desc: 'Handling invites, tracking, and seating arrangements.' },
                { name: 'Emergency Crisis Support', price: 1500, packageLevel: 'Premium', desc: 'Dedicated team for last-minute problem solving.' },
                { name: 'Legal & Permit Handling', price: 500, packageLevel: 'Basic', desc: 'Managing licenses for music, fire, and venue.' },
                { name: 'Honeymoon Planning Pro', price: 700, packageLevel: 'Standard', desc: 'Bespoke travel itinerary and booking.' }
            ],
            'generic': [
                { name: 'Elite Service Pack', price: 2000, packageLevel: 'Premium', desc: 'Comprehensive top-tier professional support.' },
                { name: 'Standard Choice', price: 1000, packageLevel: 'Standard', desc: 'Reliable and high-quality core service.' },
                { name: 'Basic Assistance', price: 500, packageLevel: 'Basic', desc: 'Essential support for smaller gatherings.' },
                { name: 'Premium Add-on', price: 700, packageLevel: 'Premium', desc: 'Expert level care for complex requirements.' },
                { name: 'Custom Consultation', price: 300, packageLevel: 'Standard', desc: 'Tailored planning for your specific vision.' },
                { name: 'Full-Day Dedication', price: 1500, packageLevel: 'Premium', desc: 'Uninterrupted priority service for your event.' },
                { name: 'Essential Equipment', price: 400, packageLevel: 'Basic', desc: 'Quality tools and hardware for standard needs.' },
                { name: 'Express Delivery/Setup', price: 200, packageLevel: 'Basic', desc: 'Fast-track preparation for tight schedules.' },
                { name: 'VVIP Experience', price: 2500, packageLevel: 'Premium', desc: 'Ultimate attention to detail and luxury.' },
                { name: 'Extended Coverage', price: 600, packageLevel: 'Standard', desc: 'Additional hours of professional dedication.' }
            ]
        };

        const services = [];

        createdVendors.forEach(vendor => {
            const templates = serviceTemplates[vendor.vendorType] || serviceTemplates['generic'];
            
            templates.forEach(template => {
                services.push({
                    name: `${vendor.name} ${template.name}`,
                    vendorId: vendor._id,
                    category: vendor.vendorType,
                    packageLevel: template.packageLevel,
                    eventTypes: vendor.eventTypes && vendor.eventTypes.length > 0 
                        ? vendor.eventTypes 
                        : ['Wedding Ceremony', 'Wedding Reception', 'Birthday Party'],
                    price: template.price,
                    description: template.desc,
                    features: [
                        template.packageLevel === 'Premium' ? 'Royal Support' : 'Standard Care',
                        'Full Guarantee',
                        'Professional Execution',
                        'Imperial Quality'
                    ]
                });
            });
        });

        console.log(`Creating ${services.length} services...`);
        await Service.insertMany(services);

        console.log('Data Imported Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:');
        console.error(error.message);
        process.exit(1);
    }
};

startSeeding();
