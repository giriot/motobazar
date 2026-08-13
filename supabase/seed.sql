-- MotoBazar Demo/Seed Data
-- Run after schema.sql

-- ============================================================
-- CITIES
-- ============================================================
INSERT INTO cities (name, slug, state, region) VALUES
('Chennai', 'chennai', 'Tamil Nadu', 'South'),
('Coimbatore', 'coimbatore', 'Tamil Nadu', 'South'),
('Bengaluru', 'bengaluru', 'Karnataka', 'South'),
('Hyderabad', 'hyderabad', 'Telangana', 'South'),
('Mumbai', 'mumbai', 'Maharashtra', 'West'),
('Pune', 'pune', 'Maharashtra', 'West'),
('Delhi', 'delhi', 'Delhi', 'North'),
('Kochi', 'kochi', 'Kerala', 'South'),
('Madurai', 'madurai', 'Tamil Nadu', 'South'),
('Salem', 'salem', 'Tamil Nadu', 'South'),
('Tiruppur', 'tiruppur', 'Tamil Nadu', 'South'),
('Trichy', 'trichy', 'Tamil Nadu', 'South'),
('Erode', 'erode', 'Tamil Nadu', 'South'),
('Ahmedabad', 'ahmedabad', 'Gujarat', 'West'),
('Jaipur', 'jaipur', 'Rajasthan', 'North'),
('Lucknow', 'lucknow', 'Uttar Pradesh', 'North'),
('Kolkata', 'kolkata', 'West Bengal', 'East'),
('Nagpur', 'nagpur', 'Maharashtra', 'Central'),
('Indore', 'indore', 'Madhya Pradesh', 'Central'),
('Vizag', 'vizag', 'Andhra Pradesh', 'South');

-- ============================================================
-- BRANDS
-- ============================================================
INSERT INTO brands (name, slug, country, description, sort_order) VALUES
('Honda', 'honda', 'Japan', 'Honda Motorcycle & Scooter India - known for reliability and fuel efficiency', 1),
('Yamaha', 'yamaha', 'Japan', 'Yamaha Motor India - performance motorcycles and scooters', 2),
('Royal Enfield', 'royal-enfield', 'India', 'Royal Enfield - iconic Indian motorcycle manufacturer', 3),
('TVS', 'tvs', 'India', 'TVS Motor Company - innovation-driven two-wheeler manufacturer', 4),
('Bajaj', 'bajaj', 'India', 'Bajaj Auto - worlds largest three-wheeler manufacturer', 5),
('Hero', 'hero', 'India', 'Hero MotoCorp - worlds largest two-wheeler manufacturer', 6),
('Suzuki', 'suzuki', 'Japan', 'Suzuki Motor India - sport and commuter motorcycles', 7),
('KTM', 'ktm', 'Austria', 'KTM - Ready to Race performance motorcycles', 8),
('Jawa', 'jawa', 'India', 'Jawa - Classic motorcycles reborn', 9),
('BMW', 'bmw', 'Germany', 'BMW Motorrad - Premium motorcycles', 10),
('Triumph', 'triumph', 'UK', 'Triumph Motorcycles - British premium motorcycles', 11),
('Kawasaki', 'kawasaki', 'Japan', 'Kawasaki - Performance motorcycles', 12);

-- ============================================================
-- BIKE MODELS (20+ models)
-- ============================================================
INSERT INTO bike_models (brand_id, name, slug, category, description, launch_year) VALUES
-- Honda
((SELECT id FROM brands WHERE slug='honda'), 'Activa 6G', 'activa-6g', 'scooter', 'Hondas best-selling scooter with refined engine and excellent mileage', 2020),
((SELECT id FROM brands WHERE slug='honda'), 'SP 125', 'sp-125', 'commuter', 'Stylish commuter with BSG engine and digital console', 2019),
((SELECT id FROM brands WHERE slug='honda'), 'Unicorn', 'unicorn', 'commuter', 'Reliable commuter bike known for comfort and mileage', 2004),
((SELECT id FROM brands WHERE slug='honda'), 'CB350', 'cb350', 'cruiser', 'Modern classic with Honda refinement', 2021),
((SELECT id FROM brands WHERE slug='honda'), 'Shine', 'shine', 'commuter', 'One of Indias most popular commuter bikes', 2004),

-- Yamaha
((SELECT id FROM brands WHERE slug='yamaha'), 'MT-15 V2', 'mt-15-v2', 'sport', 'Naked sport bike with R15 derived engine', 2022),
((SELECT id FROM brands WHERE slug='yamaha'), 'R15 V4', 'r15-v4', 'sport', 'Supersport bike with racing DNA', 2022),
((SELECT id FROM brands WHERE slug='yamaha'), 'FZ-S V4', 'fz-s-v4', 'sport', 'Street fighter with muscular design', 2023),

-- Royal Enfield
((SELECT id FROM brands WHERE slug='royal-enfield'), 'Classic 350', 'classic-350', 'cruiser', 'Iconic retro motorcycle - the definitive classic', 2021),
((SELECT id FROM brands WHERE slug='royal-enfield'), 'Meteor 350', 'meteor-350', 'cruiser', 'Modern cruiser for highways and city', 2020),
((SELECT id FROM brands WHERE slug='royal-enfield'), 'Hunter 350', 'hunter-350', 'roadster', 'Royal Enfields most accessible motorcycle', 2022),
((SELECT id FROM brands WHERE slug='royal-enfield'), 'Himalayan 450', 'himalayan-450', 'adventure', 'Adventure motorcycle built for all terrains', 2024),

-- TVS
((SELECT id FROM brands WHERE slug='tvs'), 'Jupiter 125', 'jupiter-125', 'scooter', 'Feature-rich scooter with great storage', 2022),
((SELECT id FROM brands WHERE slug='tvs'), 'Apache RTR 160 4V', 'apache-rtr-160-4v', 'sport', 'Performance commuter with 4 valves', 2019),
((SELECT id FROM brands WHERE slug='tvs'), 'Apache RTR 200 4V', 'apache-rtr-200-4v', 'sport', 'Premium sport commuter with ride modes', 2019),
((SELECT id FROM brands WHERE slug='tvs'), 'Apache RTR 310', 'apache-rtr-310', 'sport', 'TVS flagship sport motorcycle', 2023),

-- Bajaj
((SELECT id FROM brands WHERE slug='bajaj'), 'Pulsar 150', 'pulsar-150', 'sport', 'Indias favourite sport commuter', 2001),
((SELECT id FROM brands WHERE slug='bajaj'), 'Pulsar NS200', 'pulsar-ns200', 'sport', 'Liquid cooled performance naked', 2015),
((SELECT id FROM brands WHERE slug='bajaj'), 'Dominar 400', 'dominar-400', 'touring', 'Touring motorcycle for long rides', 2017),

-- Hero
((SELECT id FROM brands WHERE slug='hero'), 'Splendor Plus', 'splendor-plus', 'commuter', 'Indias best selling motorcycle', 1994),
((SELECT id FROM brands WHERE slug='hero'), 'Xtreme 160R', 'xtreme-160r', 'sport', 'Modern sport commuter', 2020),
((SELECT id FROM brands WHERE slug='hero'), 'Xpulse 200', 'xpulse-200', 'adventure', 'Adventure touring on a budget', 2018),

-- Suzuki
((SELECT id FROM brands WHERE slug='suzuki'), 'Gixxer SF 250', 'gixxer-sf-250', 'sport', 'Fully faired sport with powerful engine', 2019),
((SELECT id FROM brands WHERE slug='suzuki'), 'Access 125', 'access-125', 'scooter', 'Reliable and popular scooter', 2007),

-- KTM
((SELECT id FROM brands WHERE slug='ktm'), 'Duke 200', 'duke-200', 'sport', 'The street bomber - aggressive naked', 2012),
((SELECT id FROM brands WHERE slug='ktm'), 'Duke 390', 'duke-390', 'sport', 'Premium naked with race tech', 2013),
((SELECT id FROM brands WHERE slug='ktm'), 'RC 200', 'rc-200', 'sport', 'Race-replica inspired sport', 2015);

-- ============================================================
-- BIKE VARIANTS (30+ variants)
-- ============================================================
INSERT INTO bike_variants (model_id, name, year_from, ex_showroom_price, engine_cc, power_bhp, torque_nm, mileage_kmpl, weight_kg, fuel_capacity_l, fuel_type, transmission, abs_type, colours, pros, cons, features) VALUES
-- Honda Activa 6G
((SELECT id FROM bike_models WHERE slug='activa-6g'), 'STD', 2020, 76000, 109.5, 7.8, 8.9, 60, 107, 5.3, 'petrol', 'cvt', 'none', '["Pearl Amazing White", "Matt Amazing Blue", "Black"]', '["Excellent mileage", "Smooth engine", "Large boot space", "Good resale value"]', '["No front disc brake", "Basic instrument cluster"]', '["LED headlamp", "External fuel filler", "Silent start"]'),
((SELECT id FROM bike_models WHERE slug='activa-6g'), 'Deluxe', 2020, 78500, 109.5, 7.8, 8.9, 60, 108, 5.3, 'petrol', 'cvt', 'none', '["Pearl Amazing White", "Rebel Red"]', '["Excellent mileage", "Digital odometer", "Mobile charging socket"]', '["No front disc brake"]', '["LED headlamp", "Digital console", "Mobile charging"]'),
((SELECT id FROM bike_models WHERE slug='activa-6g'), 'H-Smart', 2020, 85000, 109.5, 7.8, 8.9, 60, 109, 5.3, 'petrol', 'cvt', 'none', '["Pearl Amazing White", "Mat Axis Grey"]', '["Keyless operation", "Best in class features"]', '["Premium price"]', '["Smart key", "LED everything", "Powered fuel lid"]'),

-- Honda SP 125
((SELECT id FROM bike_models WHERE slug='sp-125'), 'Drum Brake', 2019, 85000, 124, 10.7, 10.9, 65, 116, 11, 'petrol', 'manual', 'single_channel', '["Black", "Glitter Blue Blazer"]', '["Great mileage", "Comfortable ride", "BS6 compliant"]', '["Drum brakes only base variant", "Light build"]', '["Digital console", "LED tail lamp", "ACG silent start"]'),
((SELECT id FROM bike_models WHERE slug='sp-125'), 'Disc Brake', 2019, 89000, 124, 10.7, 10.9, 65, 117, 11, 'petrol', 'manual', 'single_channel', '["Mat Marvel Blue", "Glitter Black"]', '["Front disc brake", "Good mileage", "Comfortable"]', '["No rear disc", "Basic suspension"]', '["Front disc", "Digital display", "Side stand engine cut-off"]'),

-- Royal Enfield Classic 350
((SELECT id FROM bike_models WHERE slug='classic-350'), 'Halcyon', 2021, 193000, 349, 20.2, 27, 35, 195, 13, 'petrol', 'manual', 'single_channel', '["Halcyon Grey", "Halcyon Green"]', '["Classic styling", "Comfortable ride", "Great sound", "J-platform engine"]', '["Heavy for beginners", "Vibrations at high RPM", "Lower mileage"]', '["Triple pod instruments", "All LED lighting", "Navigation ready"]'),
((SELECT id FROM bike_models WHERE slug='classic-350'), 'Signals', 2021, 218000, 349, 20.2, 27, 35, 197, 13, 'petrol', 'manual', 'dual_channel', '["Marsh Grey", "Stealth Black"]', '["Dual channel ABS", "Premium finish", "Cruise control feel"]', '["Premium pricing", "Heavy weight"]', '["Dual channel ABS", "Tripper dash", "Cruise control"]'),

-- TVS Jupiter 125
((SELECT id FROM bike_models WHERE slug='jupiter-125'), 'Drum', 2022, 75000, 124.8, 8.0, 10.5, 55, 108, 6.5, 'petrol', 'cvt', 'none', '["Titanium Grey", "Starlight Blue"]', '["Largest boot in segment", "Fuel filler at front", "Good mileage"]', '["No disc option base", "Basic variants"]', '["LED DRL", "External fuel filler", "22L boot space"]'),
((SELECT id FROM bike_models WHERE slug='jupiter-125'), 'Disc', 2022, 82000, 124.8, 8.0, 10.5, 55, 109, 6.5, 'petrol', 'cvt', 'none', '["Glossy Black", "Midnight Blue"]', '["Front disc", "Bluetooth connectivity", "SmartXonnect"]', '["No ABS"]', '["SmartXonnect", "Front disc", "LED headlamp"]'),

-- TVS Apache RTR 160 4V
((SELECT id FROM bike_models WHERE slug='apache-rtr-160-4v'), 'STD', 2019, 120000, 159, 16.3, 14.8, 45, 140, 12, 'petrol', 'manual', 'single_channel', '["Racing Red", "Pearl White"]', '["4 valve engine", "Good pickup", "Ride modes"]', '["Pillion footrest vibrates", "Mirrors vibrate"]', '["SmartXonnect", "Ride modes", "GTT", "LED headlamp"]'),
((SELECT id FROM bike_models WHERE slug='apache-rtr-160-4v'), 'Racing Edition', 2019, 135000, 159, 16.3, 14.8, 45, 140, 12, 'petrol', 'manual', 'dual_channel', '["Racing Black"]', '["Dual ABS", "Quick shifter", "Best features"]', '["Higher price"]', '["Quick shifter", "Dual ABS", "All riding modes"]'),

-- Bajaj Pulsar 150
((SELECT id FROM bike_models WHERE slug='pulsar-150'), 'STD', 2001, 105000, 149.5, 13.8, 13.4, 50, 145, 14, 'petrol', 'manual', 'single_channel', '["Spark Black", "Platinum Silver"]', '["Reliable engine", "Good pickup", "Affordable"]', '["Older design", "Drum brake base variant"]', '["Digital console", "Tubeless tyres", "Split seat"]'),
((SELECT id FROM bike_models WHERE slug='pulsar-150'), 'Twin Disc', 2001, 115000, 149.5, 13.8, 13.4, 50, 147, 14, 'petrol', 'manual', 'single_channel', '["Spark Black", "Racing Red"]', '["Dual disc brakes", "Sporty look"]', '["No ABS", "Older engine"]', '["Dual disc", "Digital console", "Backstep pegs"]'),

-- Yamaha MT-15 V2
((SELECT id FROM bike_models WHERE slug='mt-15-v2'), 'STD', 2022, 168000, 155, 18.2, 14.7, 48, 139, 10.4, 'petrol', 'manual', 'single_channel', '["Cyan Storm", "Racing Blue"]', '["R15 engine", "Aggressive design", "Lightweight"]', '["Small fuel tank", "Firm ride quality"]', '["Inverted forks", "LED everything", "Slipper clutch", "VVA engine"]'),

-- KTM Duke 200
((SELECT id FROM bike_models WHERE slug='duke-200'), 'STD', 2012, 196000, 199.5, 25, 19.2, 40, 159, 13.4, 'petrol', 'manual', 'dual_channel', '["Electronic Orange", "Racing Blue"]', '["Most powerful 200cc", "Excellent handling", "Dual ABS"]', '["Stiff ride", "Service cost", "Vibrations"]', '["WP suspension", "ByBre brakes", "Dual ABS", "LED headlamp"]'),

-- Hero Splendor Plus
((SELECT id FROM bike_models WHERE slug='splendor-plus'), 'STD', 1994, 74000, 97.2, 7.9, 8.1, 80, 112, 9.7, 'petrol', 'manual', 'none', '["Black with Red", "Heavy Grey"]', '["Best mileage", "Lowest maintenance", "Highest resale"]', '["Outdated design", "Low power", "Basic brakes"]', '["i3s start-stop", "Self start", "Comfi ride"]'),

-- Suzuki Access 125
((SELECT id FROM bike_models WHERE slug='access-125'), 'Drum', 2007, 80000, 124, 8.5, 10, 53, 106, 5.5, 'petrol', 'cvt', 'none', '["Matte Axis Grey", "Candy Iron Red"]', '["Refined engine", "Good mileage", "Stylish"]', '["Basic variant has drum brakes"]', '["LED headlamp", "External fuel cap", "USB charger"]');

-- ============================================================
-- BIKE IMAGES (demo URLs - replace with real images)
-- ============================================================
INSERT INTO bike_images (model_id, image_url, alt_text, is_primary, sort_order) VALUES
((SELECT id FROM bike_models WHERE slug='activa-6g'), '/images/bikes/honda-activa-6g.jpg', 'Honda Activa 6G', true, 1),
((SELECT id FROM bike_models WHERE slug='sp-125'), '/images/bikes/honda-sp-125.jpg', 'Honda SP 125', true, 1),
((SELECT id FROM bike_models WHERE slug='classic-350'), '/images/bikes/re-classic-350.jpg', 'Royal Enfield Classic 350', true, 1),
((SELECT id FROM bike_models WHERE slug='meteor-350'), '/images/bikes/re-meteor-350.jpg', 'Royal Enfield Meteor 350', true, 1),
((SELECT id FROM bike_models WHERE slug='hunter-350'), '/images/bikes/re-hunter-350.jpg', 'Royal Enfield Hunter 350', true, 1),
((SELECT id FROM bike_models WHERE slug='jupiter-125'), '/images/bikes/tvs-jupiter-125.jpg', 'TVS Jupiter 125', true, 1),
((SELECT id FROM bike_models WHERE slug='apache-rtr-160-4v'), '/images/bikes/tvs-apache-rtr-160-4v.jpg', 'TVS Apache RTR 160 4V', true, 1),
((SELECT id FROM bike_models WHERE slug='pulsar-150'), '/images/bikes/bajaj-pulsar-150.jpg', 'Bajaj Pulsar 150', true, 1),
((SELECT id FROM bike_models WHERE slug='mt-15-v2'), '/images/bikes/yamaha-mt-15-v2.jpg', 'Yamaha MT-15 V2', true, 1),
((SELECT id FROM bike_models WHERE slug='r15-v4'), '/images/bikes/yamaha-r15-v4.jpg', 'Yamaha R15 V4', true, 1),
((SELECT id FROM bike_models WHERE slug='duke-200'), '/images/bikes/ktm-duke-200.jpg', 'KTM Duke 200', true, 1),
((SELECT id FROM bike_models WHERE slug='splendor-plus'), '/images/bikes/hero-splendor-plus.jpg', 'Hero Splendor Plus', true, 1),
((SELECT id FROM bike_models WHERE slug='xtreme-160r'), '/images/bikes/hero-xtreme-160r.jpg', 'Hero Xtreme 160R', true, 1),
((SELECT id FROM bike_models WHERE slug='access-125'), '/images/bikes/suzuki-access-125.jpg', 'Suzuki Access 125', true, 1),
((SELECT id FROM bike_models WHERE slug='gixxer-sf-250'), '/images/bikes/suzuki-gixxer-sf-250.jpg', 'Suzuki Gixxer SF 250', true, 1),
((SELECT id FROM bike_models WHERE slug='dominar-400'), '/images/bikes/bajaj-dominar-400.jpg', 'Bajaj Dominar 400', true, 1),
((SELECT id FROM bike_models WHERE slug='himalayan-450'), '/images/bikes/re-himalayan-450.jpg', 'Royal Enfield Himalayan 450', true, 1),
((SELECT id FROM bike_models WHERE slug='apache-rtr-310'), '/images/bikes/tvs-apache-rtr-310.jpg', 'TVS Apache RTR 310', true, 1),
((SELECT id FROM bike_models WHERE slug='duke-390'), '/images/bikes/ktm-duke-390.jpg', 'KTM Duke 390', true, 1),
((SELECT id FROM bike_models WHERE slug='rc-200'), '/images/bikes/ktm-rc-200.jpg', 'KTM RC 200', true, 1);

-- ============================================================
-- ARTICLE CATEGORIES
-- ============================================================
INSERT INTO article_categories (name, slug, description) VALUES
('Bike News', 'bike-news', 'Latest motorcycle news and launches'),
('Reviews', 'reviews', 'In-depth motorcycle reviews'),
('Buying Guides', 'buying-guides', 'Guides to help you choose the right bike'),
('Comparison', 'comparison', 'Bike comparison articles'),
('Tips & Guides', 'tips-guides', 'Maintenance and riding tips'),
('Price Guide', 'price-guide', 'Bike pricing and value guides');

-- ============================================================
-- DEMO ARTICLES
-- ============================================================
INSERT INTO articles (title, slug, excerpt, content, author_name, category_id, status, meta_title, meta_description, is_featured, published_at) VALUES
('Best Bikes Under ₹1 Lakh in 2024', 'best-bikes-under-1-lakh', 'Top motorcycles you can buy with a budget of ₹1 lakh', '<h2>Best Motorcycles Under ₹1 Lakh</h2><p>Looking for a motorcycle that fits your budget without compromising on features? Here are the best options under ₹1 lakh ex-showroom.</p><h3>1. Honda SP 125</h3><p>The Honda SP 125 offers the perfect balance of performance and mileage. With its 124cc BSG engine, you get 65 kmpl and a comfortable riding posture.</p><h3>2. TVS Apache RTR 160 4V</h3><p>For those who want sporty performance, the Apache RTR 160 4V is unbeatable at this price point. SmartXonnect connectivity and ride modes make it tech-forward.</p><h3>3. Bajaj Pulsar 150</h3><p>The legendary Pulsar continues to be a solid choice. Reliable, comfortable and affordable to maintain.</p>', 'MotoBazar Editorial', (SELECT id FROM article_categories WHERE slug='price-guide'), 'approved', 'Best Bikes Under 1 Lakh 2024 - MotoBazar', 'Find the best motorcycles under ₹1 lakh. Top picks include Honda SP 125, TVS Apache RTR 160 4V and more.', true, NOW()),

('Used Bike Buying Guide: What to Check Before You Buy', 'used-bike-buying-guide', 'Complete checklist for buying a used motorcycle', '<h2>How to Buy a Used Bike</h2><p>Buying a used bike can save you significant money, but you need to know what to check. Here is your complete checklist.</p><h3>1. Verify RC and Documents</h3><p>Always check the RC book, insurance validity and PUC certificate. Ensure the chassis and engine numbers match.</p><h3>2. Check Engine Condition</h3><p>Start the bike cold. Listen for unusual noises. Check for smoke from the exhaust. The engine should idle smoothly.</p><h3>3. Inspect Body and Frame</h3><p>Look for welding marks on the frame which might indicate accident damage. Check panel gaps for consistency.</p><h3>4. Test Ride</h3><p>Always take a test ride. Check gear shifts, braking, suspension and steering. The bike should track straight.</p>', 'MotoBazar Editorial', (SELECT id FROM article_categories WHERE slug='buying-guides'), 'approved', 'Used Bike Buying Guide - Complete Checklist | MotoBazar', 'Complete guide to buying a used motorcycle. Check engine, RC, documents, body condition and more.', true, NOW()),

('Royal Enfield Classic 350 vs Meteor 350: Which Should You Buy?', 'classic-350-vs-meteor-350', 'Detailed comparison of two popular Royal Enfield motorcycles', '<h2>Classic 350 vs Meteor 350</h2><p>Both share the same J-platform 349cc engine but serve very different purposes. Which one is right for you?</p><h3>Design and Position</h3><p>The Classic 350 has an upright, traditional riding position. The Meteor 350 offers a more relaxed cruiser stance with forward-set footpegs.</p><h3>Ride Quality</h3><p>For city riding, the Classic is more nimble. For highways, the Meteor feels more planted and comfortable.</p><h3>Verdict</h3><p>Choose Classic for nostalgia and city riding. Choose Meteor for touring comfort and modern features.</p>', 'MotoBazar Editorial', (SELECT id FROM article_categories WHERE slug='comparison'), 'approved', 'Classic 350 vs Meteor 350 Comparison 2024', 'Compare Royal Enfield Classic 350 and Meteor 350 - price, specs, features and verdict.', false, NOW()),

('How to Transfer Bike Ownership in India', 'how-to-transfer-bike-ownership', 'Step-by-step guide to ownership transfer', '<h2>Bike Ownership Transfer Process</h2><p>After buying a used bike, you must transfer ownership to your name within 30 days. Here is the complete process.</p><h3>Required Documents</h3><ul><li>RC Book (original)</li><li>Valid Insurance</li><li>PUC Certificate</li><li>Form 29 (Notice of Transfer)</li><li>Form 30 (Report of Transfer)</li><li>Identity proof</li></ul><h3>Process</h3><p>Visit your nearest RTO with all documents. Both buyer and seller must sign Form 29 and 30. Pay the transfer fee.</p>', 'MotoBazar Editorial', (SELECT id FROM article_categories WHERE slug='tips-guides'), 'approved', 'How to Transfer Bike Ownership in India - Complete Guide', 'Step-by-step guide to transferring motorcycle ownership. Documents required, RTO process and fees.', false, NOW()),

('Top 5 Scooters for Daily Commuting in 2024', 'best-scooters-daily-commuting', 'Best scooters for everyday city riding', '<h2>Best Scooters for Indian Roads</h2><p>Daily commuting in Indian traffic requires a scooter that is fuel-efficient, comfortable and reliable. Here are our top picks.</p><h3>1. Honda Activa 6G</h3><p>The undisputed king of Indian scooters. Smooth, reliable and excellent resale value.</p><h3>2. TVS Jupiter 125</h3><p>Largest boot space in the segment, external fuel filler and great features at a competitive price.</p><h3>3. Suzuki Access 125</h3><p>Refined 124cc engine, excellent build quality and comfortable ride.</p>', 'MotoBazar Editorial', (SELECT id FROM article_categories WHERE slug='buying-guides'), 'approved', 'Top 5 Scooters for Daily Commuting 2024 - MotoBazar', 'Best scooters for Indian city riding. Honda Activa, TVS Jupiter and Suzuki Access lead the pack.', true, NOW());

-- ============================================================
-- DEMO BIKE REVIEWS
-- ============================================================
INSERT INTO bike_reviews (model_id, title, content, rating, ownership_duration, pros, cons, status, is_expert) VALUES
((SELECT id FROM bike_models WHERE slug='activa-6g'), 'Best Scooter for Family Use', 'I have been using Activa 6G for 6 months now. The mileage is excellent at 58 kmpl in city traffic. The silent start feature is very convenient. Boot space is sufficient for daily use.', 4.2, '6 months', '["Excellent mileage", "Silent start", "Smooth ride", "Good boot space"]', '["No disc brake option", "Could be more powerful"]', 'approved', true),
((SELECT id FROM bike_models WHERE slug='classic-350'), 'Pure Riding Joy', 'The Classic 350 is not about numbers. Its about the experience. The thump, the looks, the comfortable ride - everything about this bike makes you want to ride more.', 4.5, '1 year', '["Iconic design", "Comfortable", "Great sound", "Build quality"]', '["Heavy in traffic", "Lower mileage", "Vibrations above 90kmph"]', 'approved', true),
((SELECT id FROM bike_models WHERE slug='apache-rtr-160-4v'), 'Best 160cc Commuter', 'The Apache RTR 160 4V punches well above its weight. The 4-valve engine is responsive and the ride modes are a genuine improvement. SmartXonnect is a bonus.', 4.3, '8 months', '["Great engine", "Ride modes", "Good features", "Aggressive design"]', '["Pillion discomfort on long rides", "Wind blast above 100kmph"]', 'approved', true),
((SELECT id FROM bike_models WHERE slug='mt-15-v2'), 'Pocket Rocket', 'The MT-15 V2 is the most fun you can have on two wheels at this price. The R15 engine in a naked format is a blast. Light, quick and agile.', 4.4, '4 months', '["R15 engine", "Lightweight", "Great handling", "Inverted forks"]', '["Small fuel tank", "Firm suspension", "Expensive spares"]', 'approved', false),
((SELECT id FROM bike_models WHERE slug='splendor-plus'), 'The People Champion', 'After 2 years and 40,000 km, my Splendor Plus still runs like new. The mileage is consistently above 75 kmpl. Maintenance cost is almost zero. Simply the best commuter.', 4.0, '2 years', '["Amazing mileage", "Zero maintenance", "Best resale", "Comfortable"]', '["Outdated design", "No power", "Drum brakes"]', 'approved', false);

-- ============================================================
-- VALUATION RULES
-- ============================================================
INSERT INTO valuation_rules (brand_id, depreciation_year, km_factor, owner_factor, condition_factors, insurance_bonus, service_history_bonus) VALUES
(NULL, 12, 0.5, 8, '{"excellent": 5, "good": 0, "fair": -10, "needs_repair": -25}', 3, 2);

-- ============================================================
-- AD SETTINGS (default: ads off)
-- ============================================================
INSERT INTO ad_settings (ads_enabled, placements) VALUES
(false, '{"home_top": false, "home_middle": false, "article_middle": false, "article_bottom": false, "sidebar": false, "used_listing": false, "bike_detail": false}');
