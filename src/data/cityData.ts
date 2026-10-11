import { ChennaiSpot, CityHub, CityTipCard, OutfitRecommendation, VibeType, WeatherInfo } from '../types';
import { CHENNAI_SPOTS } from './chennaiSpots';

export const SUPPORTED_CITIES = ['Chennai', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Goa'];

// Starting hubs per city as requested in specification
export const CITY_STARTING_HUBS: Record<string, CityHub[]> = {
  'Chennai': [
    { id: 'guindy', name: 'Guindy / IIT Campus', description: 'Central student hub near Kathipara Square' },
    { id: 'omr', name: 'OMR Tech Corridor', description: 'IT Expressway, Sholinganallur & Perungudi' },
    { id: 'nungambakkam', name: 'Nungambakkam & Harrington Rd', description: 'Trendy cafe district & college belt' },
    { id: 'annanagar', name: 'Anna Nagar', description: 'Bustling food street & shopping zone' },
    { id: 'adyar', name: 'Adyar & Besant Nagar', description: 'Beachfront cafes & Bessie sunset strip' },
  ],
  'Bengaluru': [
    { id: 'koramangala', name: 'Koramangala', description: 'Startup central, microbreweries & student hangs' },
    { id: 'indiranagar', name: 'Indiranagar', description: 'High-energy 100ft road cafes, pubs & boutiques' },
    { id: 'hsr', name: 'HSR Layout', description: 'Chic tree-lined avenues, bakes & co-working cafes' },
    { id: 'mgroad', name: 'MG Road & Church St', description: 'Bookstores, vintage pubs & metro connectivity' },
    { id: 'whitefield', name: 'Whitefield', description: 'EPIP tech parks, rooftop lounges & malls' },
  ],
  'Mumbai': [
    { id: 'bandra', name: 'Bandra & Pali Hill', description: 'Queen of suburbs, sea link views & hipster cafes' },
    { id: 'colaba', name: 'Colaba & Fort', description: 'Heritage architecture, Leopold Cafe & Marine Drive' },
    { id: 'lowerparel', name: 'Lower Parel', description: 'Phoenix Palladium, rooftop bars & nightlife mills' },
    { id: 'juhu', name: 'Juhu & Versova', description: 'Sunset beach vibes, Prithvi Theatre & celeb spots' },
    { id: 'powai', name: 'Powai', description: 'IIT Bombay campus, lake promenade & high-street cafes' },
  ],
  'Delhi NCR': [
    { id: 'hauzkhas', name: 'Hauz Khas Village', description: 'Medieval fort ruins, lake view lounges & indie art' },
    { id: 'gurgaon', name: 'Gurgaon CyberHub', description: 'Futuristic glass towers, craft beer & open plazas' },
    { id: 'cp', name: 'Connaught Place (CP)', description: 'Colonial white arcades, street food & underground market' },
    { id: 'southdelhi', name: 'South Delhi & GK', description: 'M-Block markets, chic rooftop cafes & green parks' },
    { id: 'noida', name: 'Noida Sector 18', description: 'DLF Mall of India & bustling street food hubs' },
  ],
  'Hyderabad': [
    { id: 'jubileehills', name: 'Jubilee Hills', description: 'Luxury microbreweries, lush drive-ins & cafes' },
    { id: 'banjarahills', name: 'Banjara Hills', description: 'Durgam Cheruvu bridge views & trendy lounges' },
    { id: 'gachibowli', name: 'Gachibowli & HITECH', description: 'Financial District, late-night food trucks & parks' },
    { id: 'charminar', name: 'Charminar & Old City', description: 'Iconic heritage, Irani chai, Osmania biscuits & biryani' },
    { id: 'kondapur', name: 'Kondapur & Madhapur', description: 'Student hotbed, bowling alleys & live music joints' },
  ],
  'Goa': [
    { id: 'anjuna', name: 'Anjuna & Vagator', description: 'Clifftop sunset bars, techno music & beach shacks' },
    { id: 'panjim', name: 'Panjim & Fontainhas', description: 'Latin Quarter cobblestones, heritage pastel villas & river cruises' },
    { id: 'candolim', name: 'Candolim & Calangute', description: 'Water sports, lively beach strips & night markets' },
    { id: 'palolem', name: 'Palolem & South Goa', description: 'Serene palm-fringed bays, silent discos & kayaker chill' },
    { id: 'assagao', name: 'Assagao', description: 'Trendy jungle boutiques, French bakeries & artisanal dining' },
  ]
};

// Default hubs generator for custom cities
export const getStartingHubsForCity = (cityName: string): CityHub[] => {
  const normalized = cityName.trim();
  const matchedKey = Object.keys(CITY_STARTING_HUBS).find(
    k => k.toLowerCase() === normalized.toLowerCase()
  );

  if (matchedKey && CITY_STARTING_HUBS[matchedKey]) {
    return CITY_STARTING_HUBS[matchedKey];
  }

  return [
    { id: 'central', name: `Central ${cityName}`, description: 'Downtown / Main City Center & High Street' },
    { id: 'north', name: `North ${cityName}`, description: 'Bustling commercial hub & student district' },
    { id: 'south', name: `South ${cityName}`, description: 'Scenic green parks & upscale cafes' },
    { id: 'west', name: `West ${cityName}`, description: 'Nightlife lounges & shopping promenades' },
    { id: 'east', name: `East ${cityName}`, description: 'Tech parks & waterfront chill zones' },
  ];
};

// BENGALURU HOTSPOTS
const BENGALURU_SPOTS: ChennaiSpot[] = [
  {
    id: 'blr-church-st',
    name: 'Church Street & Blossom Book House',
    area: 'MG Road / Church St',
    category: 'cafe',
    avgCost: 250,
    mustTry: 'Filter Coffee & Vintage Book Browsing + Matte Mocha',
    badge: 'Aesthetic Spot',
    vibes: ['chill', 'foodie'],
    suitableBudgets: ['broke', 'reasonable', 'splurge'],
    lat: 12.9752,
    lng: 77.6053,
    description: 'The iconic cobblestone cultural heart of Namma Bengaluru. Street buskers, indie bookshops, and cozy coffee nooks.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Artisanal Filter Coffee & Cheese Croissant',
    isPetFriendly: true,
    petNote: 'Pets allowed in pedestrianized street outdoor cafes',
  },
  {
    id: 'blr-toit',
    name: 'Toit Craft Brewery',
    area: 'Indiranagar (100ft Rd)',
    category: 'nightlife',
    avgCost: 850,
    mustTry: 'Basmati Blonde Ale & Woodfired Pepperoni Pizza',
    badge: 'Insta-Famous',
    vibes: ['party', 'foodie', 'chill'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 12.9791,
    lng: 77.6406,
    description: 'Bengaluru’s legendary pub pioneer with multi-level brick interiors, fresh house brews, and electric weekend crowds.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Gourmet Truffle Mushroom Wood-Fired Pizza & Craft Brews',
    isPetFriendly: true,
    petNote: 'Pets allowed in outdoor balcony seating',
  },
  {
    id: 'blr-cubbon-park',
    name: 'Cubbon Park Sunday Stroll',
    area: 'Central Bengaluru',
    category: 'thrill',
    avgCost: 50,
    mustTry: 'Fresh Tender Coconut & Dog Spotting Lawn Picnics',
    badge: 'Student Hack',
    vibes: ['chill', 'beach'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 12.9763,
    lng: 77.5929,
    description: '300 acres of lush green canopy right in the city center. Vehicle-free Sundays perfect for skating, acoustic jams, and reading.',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    vegType: 'pure-veg',
    vegDish: 'Fresh Tender Coconut Water & Mint Lemonade',
    isPetFriendly: true,
    petNote: 'Pets welcome on spacious green picnic lawns',
  },
  {
    id: 'blr-ctr-dosa',
    name: 'CTR (Central Tiffin Room / Shri Sagar)',
    area: 'Malleswaram',
    category: 'food',
    avgCost: 120,
    mustTry: 'Crispy Butter Masala Dosa & Hot Filter Coffee',
    badge: 'Local Legend',
    vibes: ['foodie', 'chill'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 13.0012,
    lng: 77.5711,
    description: 'Mouthwatering golden-crisp butter dosas served piping hot since 1920. Essential Bengaluru foodie pilgrimage.',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80',
    vegType: 'pure-veg',
    vegDish: 'Crispy Benne Masala Dosa & Piping Hot Filter Coffee',
    isPetFriendly: false,
  },
  {
    id: 'blr-bobs-bar',
    name: 'Bob’s Bar',
    area: 'Koramangala / Indiranagar',
    category: 'nightlife',
    avgCost: 500,
    mustTry: 'Ghee Roast Pork/Paneer & Filter Coffee Cocktail',
    badge: 'Student Hack',
    vibes: ['party', 'chill'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 12.9352,
    lng: 77.6245,
    description: 'Nostalgic pocket-friendly pub serving vintage local snacks and ice-cold draughts in a retro garden setting.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Ghee Roast Paneer & Filter Coffee Cocktail',
    isPetFriendly: true,
    petNote: 'Pets allowed in outdoor garden patio',
  },
  {
    id: 'blr-third-wave',
    name: 'Third Wave Coffee Roasters',
    area: 'HSR Layout',
    category: 'cafe',
    avgCost: 350,
    mustTry: 'Sea Salt Mocha & Cinnamon French Toast',
    badge: 'Aesthetic Spot',
    vibes: ['chill', 'foodie'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 12.9121,
    lng: 77.6445,
    description: 'Spacious glass-front startup cafe with artisanal manual brews, fast Wi-Fi, and vibrant youth energetic vibes.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Sea Salt Mocha & Avocado Toasties',
    isPetFriendly: true,
    petNote: 'Pets allowed in outdoor patio seating',
  }
];

// MUMBAI HOTSPOTS
const MUMBAI_SPOTS: ChennaiSpot[] = [
  {
    id: 'bom-marine-drive',
    name: 'Marine Drive & Queens Necklace',
    area: 'Colaba / South Mumbai',
    category: 'beach',
    avgCost: 100,
    mustTry: 'Kulhad Cutting Chai & Roasted Bhutta (Corn) at Sunset',
    badge: 'Local Legend',
    vibes: ['beach', 'chill'],
    suitableBudgets: ['broke', 'reasonable', 'splurge'],
    lat: 18.944,
    lng: 72.8238,
    description: 'The soul of Mumbai. Sit along the promenade wall, feel the cool Arabian Sea breeze, and watch the glowing city skyline.',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    vegType: 'pure-veg',
    vegDish: 'Kulhad Cutting Chai & Roasted Bhutta (Corn) at Sunset',
    isPetFriendly: true,
    petNote: 'Pets welcome along sea promenade',
  },
  {
    id: 'bom-prithvi',
    name: 'Prithvi Theatre Cafe',
    area: 'Juhu',
    category: 'cafe',
    avgCost: 300,
    mustTry: 'Irish Coffee, Hot Parathas & Fresh Kulhad Chai',
    badge: 'Aesthetic Spot',
    vibes: ['chill', 'foodie'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 19.1062,
    lng: 72.8258,
    description: 'Lush tree-shaded courtyards with lantern lighting, bohemian theatre rehearsals, and Bollywood artistic energy.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Fresh Kulhad Chai, Hot Stuffed Aloo Parathas & Cheese Toast',
    isPetFriendly: true,
    petNote: 'Pets allowed in lush tree-shaded courtyard seating',
  },
  {
    id: 'bom-bandra-fort',
    name: 'Bandra Fort & Pali Hill Cafe Crawl',
    area: 'Bandra West',
    category: 'chill',
    avgCost: 450,
    mustTry: 'Sourdough Croissant at Subko Coffee & Sea Link View',
    badge: 'Insta-Famous',
    vibes: ['chill', 'foodie'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 19.0435,
    lng: 72.8193,
    description: 'Historic Portuguese fort ruins overlooking the Sea Link, followed by artisanal cold brews in heritage Bandra alleys.',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Subko Coffee Sourdough Veg Toastie & Cold Brew',
    isPetFriendly: true,
    petNote: 'Pets allowed in fort outdoor grounds & outdoor cafe yards',
  },
  {
    id: 'bom-social-lower-parel',
    name: 'Todi Mill Social',
    area: 'Lower Parel',
    category: 'nightlife',
    avgCost: 750,
    mustTry: 'Long Island Iced Tea & Death By Chocolate Waffle',
    badge: 'Student Hack',
    vibes: ['party', 'chill'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 18.9953,
    lng: 72.8277,
    description: 'Industrial chic mill space converting co-working workspace by day into high-voltage weekend party venue.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Loaded Veg Poutine & Death By Chocolate Waffle',
    isPetFriendly: false,
  },
  {
    id: 'bom-bademiya',
    name: 'Bademiya Late Night Kebab Trail',
    area: 'Colaba',
    category: 'food',
    avgCost: 350,
    mustTry: 'Mutton Seekh Roll & Chicken Baida Roti',
    badge: 'Late-Night Gem',
    vibes: ['foodie', 'party'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 18.9231,
    lng: 72.8315,
    description: 'Legendary open-air street stall behind Taj Mahal Palace serving hot charcoal kebabs until 3 AM.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Paneer Tikka Roll & Paneer Baida Roti',
    isPetFriendly: false,
  }
];

// DELHI NCR HOTSPOTS
const DELHI_SPOTS: ChennaiSpot[] = [
  {
    id: 'del-hkv',
    name: 'Hauz Khas Fort & Social',
    area: 'Hauz Khas Village',
    category: 'nightlife',
    avgCost: 650,
    mustTry: 'HKV Sunset Beer Bowl & Butter Chicken Pasta',
    badge: 'Insta-Famous',
    vibes: ['party', 'chill', 'thrill'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 28.5529,
    lng: 77.1945,
    description: '14th century medieval fort ruins overlooking a tranquil lake, surrounded by energetic rooftop nightlife bars.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Rooftop Cold Brew & Truffle Mushroom Pasta',
    isPetFriendly: true,
    petNote: 'Pets allowed in fort park & outdoor rooftop terraces',
  },
  {
    id: 'del-diggin',
    name: 'Diggin Cafe',
    area: 'Chanakyapuri / Anand Lok',
    category: 'cafe',
    avgCost: 550,
    mustTry: 'Fairy Light Baked Penne & Rose Iced Tea',
    badge: 'Aesthetic Spot',
    vibes: ['chill', 'foodie'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 28.5833,
    lng: 77.2023,
    description: 'Dreamy French brickwork cafe covered in lush green vines, floral fairy light arches, and artisan mocktails.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Fairy Light Baked Penne & Rose Iced Tea',
    isPetFriendly: true,
    petNote: 'Pets allowed in outdoor garden patio seats',
  },
  {
    id: 'del-cyberhub',
    name: 'Gurgaon CyberHub Open Plaza',
    area: 'Gurgaon CyberHub',
    category: 'food',
    avgCost: 700,
    mustTry: 'Craft Beer Tasters at CyberHub Brewpub & Dim Sums',
    badge: 'Aesthetic Spot',
    vibes: ['foodie', 'party'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 28.4952,
    lng: 77.0886,
    description: 'Ultra-modern culinary amphitheater surrounded by corporate towers, neon walkways, and live street buskers.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Crispy Veg Steamed Dim Sums & Craft Cold Brews',
    isPetFriendly: true,
    petNote: 'Pets allowed in open plaza walkways',
  },
  {
    id: 'del-cp-depot',
    name: 'Connaught Place & Indian Coffee House',
    area: 'Connaught Place',
    category: 'chill',
    avgCost: 200,
    mustTry: 'Cold Coffee with Ice Cream & Dahi Bhalla at CP Inner Circle',
    badge: 'Local Legend',
    vibes: ['chill', 'foodie'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 28.6315,
    lng: 77.2167,
    description: 'Symphony of Georgian architecture, underground Palika Bazaar, rooftop bars, and vintage coffee houses.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    vegType: 'pure-veg',
    vegDish: 'CP Dahi Bhalla, Cold Coffee with Ice Cream & Hot Vegetable Cutlets',
    isPetFriendly: false,
  }
];

// HYDERABAD HOTSPOTS
const HYD_SPOTS: ChennaiSpot[] = [
  {
    id: 'hyd-prost',
    name: 'Prost Brewpub & Rooftop',
    area: 'Jubilee Hills',
    category: 'nightlife',
    avgCost: 800,
    mustTry: 'Hyderabad Wheat Craft Beer & Telangana Chilli Chicken',
    badge: 'Insta-Famous',
    vibes: ['party', 'foodie'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 17.4312,
    lng: 78.4071,
    description: 'Multi-level rustic industrial microbrewery overlooking Jubilee Hills valley with DJ acoustic sets.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Chilli Paneer & Craft Wheat Brews',
    isPetFriendly: false,
  },
  {
    id: 'hyd-charminar-chai',
    name: 'Nimrah Cafe & Charminar Heritage Walk',
    area: 'Old City / Charminar',
    category: 'food',
    avgCost: 100,
    mustTry: 'Piping Hot Irani Chai with Butter Osmania Biscuits',
    badge: 'Local Legend',
    vibes: ['foodie', 'chill'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 17.3616,
    lng: 78.4747,
    description: 'Sip legendary Irani tea right in front of the illuminated 16th century Charminar monument.',
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=800&q=80',
    vegType: 'pure-veg',
    vegDish: 'Piping Hot Irani Chai with Butter Osmania Biscuits',
    isPetFriendly: false,
  },
  {
    id: 'hyd-durgam-cheruvu',
    name: 'Durgam Cheruvu Cable Bridge Promenade',
    area: 'Banjara Hills / HITECH',
    category: 'chill',
    avgCost: 150,
    mustTry: 'Sunset Cable Bridge Selfie & Floating Cafe Mocktails',
    badge: 'Aesthetic Spot',
    vibes: ['chill', 'beach'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 17.4385,
    lng: 78.3842,
    description: 'Gleaming cable-stayed bridge over secret lake waters, illuminated with colorful LED fountains at night.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Fresh Lime Cooler & Floating Cafe Mocktails',
    isPetFriendly: true,
    petNote: 'Pets allowed on lakefront park promenade',
  },
  {
    id: 'hyd-shadab-biryani',
    name: 'Hotel Shadab / Cafe Bahar',
    area: 'Old City / Hyderguda',
    category: 'food',
    avgCost: 300,
    mustTry: 'Authentic Mutton Dum Biryani with Mirchi Ka Salan',
    badge: 'Local Legend',
    vibes: ['foodie'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 17.3712,
    lng: 78.4761,
    description: 'The pinnacle of Hyderabadi culinary heritage. Fragrant long-grain basmati rice cooked on dum slow fire.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Vegetable Dum Biryani with Mirchi Ka Salan & Double Ka Meetha',
    isPetFriendly: false,
  }
];

// GOA HOTSPOTS
const GOA_SPOTS: ChennaiSpot[] = [
  {
    id: 'goa-thalassa',
    name: 'Thalassa Greek Taverna',
    area: 'Siolim / Vagator Cliff',
    category: 'cafe',
    avgCost: 900,
    mustTry: 'Sunset Cocktail, Greek Souvlaki & Sirtaki Dance Show',
    badge: 'Insta-Famous',
    vibes: ['chill', 'party', 'beach'],
    suitableBudgets: ['splurge'],
    lat: 15.6181,
    lng: 73.7431,
    description: 'Clifftop open-air white taverna looking out onto Arabian sea sunsets with live fire dancers.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Greek Veg Souvlaki & Sunset Passionfruit Mocktails',
    isPetFriendly: true,
    petNote: 'Pets allowed on cliffside outdoor deck',
  },
  {
    id: 'goa-curlies',
    name: 'Anjuna Beach Shack & Sunset Deck',
    area: 'Anjuna',
    category: 'beach',
    avgCost: 500,
    mustTry: 'Fresh Watermelon Mojito & Goan Prawn Balchão',
    badge: 'Local Legend',
    vibes: ['beach', 'party', 'chill'],
    suitableBudgets: ['reasonable', 'splurge'],
    lat: 15.5821,
    lng: 73.7381,
    description: 'The quintessential Goan beach shack experience. Feet in soft sand, waves crashing, and trance beats.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Fresh Watermelon Mojito & Crispy Mushroom Caldin',
    isPetFriendly: true,
    petNote: 'Pets welcome on open beach sand',
  },
  {
    id: 'goa-fontainhas',
    name: 'Fontainhas Heritage Latin Quarter',
    area: 'Panjim',
    category: 'chill',
    avgCost: 250,
    mustTry: 'Bebinca Layered Cake & Espresso at Confeitaria 31 De Janeiro',
    badge: 'Aesthetic Spot',
    vibes: ['chill', 'foodie'],
    suitableBudgets: ['broke', 'reasonable'],
    lat: 15.4989,
    lng: 73.8322,
    description: 'Vibrant yellow, blue, and red Portuguese colonial villas with cobblestone streets made for Instagram photo walks.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    vegType: 'veg-friendly',
    vegDish: 'Eggless Bebinca & Espresso at Confeitaria 31 De Janeiro',
    isPetFriendly: true,
    petNote: 'Pets allowed in outdoor cafe alley seating',
  }
];

// Helper to fetch spots array for any city
export const getSpotsForCity = (cityName: string): ChennaiSpot[] => {
  const norm = cityName.trim().toLowerCase();

  if (norm.includes('chennai')) return CHENNAI_SPOTS;
  if (norm.includes('bengaluru') || norm.includes('bangalore')) return BENGALURU_SPOTS;
  if (norm.includes('mumbai') || norm.includes('bombay')) return MUMBAI_SPOTS;
  if (norm.includes('delhi') || norm.includes('gurgaon') || norm.includes('noida')) return DELHI_SPOTS;
  if (norm.includes('hyderabad')) return HYD_SPOTS;
  if (norm.includes('goa')) return GOA_SPOTS;

  // Custom city generator with tailored spots
  return [
    {
      id: `custom-1-${norm}`,
      name: `${cityName} Skydeck Lounge & Cafe`,
      area: `Downtown ${cityName}`,
      category: 'cafe',
      avgCost: 400,
      mustTry: `Signature Cold Brew & ${cityName} Gourmet Platter`,
      badge: 'Aesthetic Spot',
      vibes: ['chill', 'foodie'],
      suitableBudgets: ['broke', 'reasonable', 'splurge'],
      lat: 13.0,
      lng: 80.0,
      description: `Panoramic rooftop city views over ${cityName}, artisanal mocktails, and relaxing ambient music.`,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: `custom-2-${norm}`,
      name: `${cityName} Heritage Street Food Market`,
      area: `Old Quarter, ${cityName}`,
      category: 'food',
      avgCost: 200,
      mustTry: `Local Street Chaat & Hot Kulhad Chai`,
      badge: 'Local Legend',
      vibes: ['foodie', 'chill'],
      suitableBudgets: ['broke', 'reasonable'],
      lat: 13.01,
      lng: 80.01,
      description: `Bustling open market alley with iconic regional delicacies, sizzling grills, and lively evening energy.`,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: `custom-3-${norm}`,
      name: `${cityName} Central Park Promenade`,
      area: `Garden District, ${cityName}`,
      category: 'thrill',
      avgCost: 100,
      mustTry: 'Sunset Lake Kayaking & Bicycle Trail',
      badge: 'Student Hack',
      vibes: ['chill', 'thrill'],
      suitableBudgets: ['broke', 'reasonable'],
      lat: 13.02,
      lng: 80.02,
      description: `Lush green public park with lakeside walkways, outdoor acoustic jam lawns, and peaceful evening breezes.`,
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: `custom-4-${norm}`,
      name: `The ${cityName} Brewpub & Social`,
      area: `Nightlife District, ${cityName}`,
      category: 'nightlife',
      avgCost: 650,
      mustTry: 'Craft Lager & Loaded Nachos',
      badge: 'Insta-Famous',
      vibes: ['party', 'foodie'],
      suitableBudgets: ['reasonable', 'splurge'],
      lat: 13.03,
      lng: 80.03,
      description: `Popular weekend hotspot featuring live DJs, neon lights, and ice-cold craft beers with local college squads.`,
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    }
  ];
};

// Weather and climate tips per city
export const getWeatherAndTipsForCity = (cityName: string): { weather: WeatherInfo; tips: CityTipCard[] } => {
  const norm = cityName.trim().toLowerCase();

  if (norm.includes('bengaluru') || norm.includes('bangalore')) {
    return {
      weather: {
        temp: '24°C',
        condition: 'Pleasant & Breezy',
        humidity: '58%',
        recommendation: 'Perfect weather all day! Ideal for outdoor Church St walks and Indiranagar rooftop microbreweries.',
        isLive: true,
      },
      tips: [
        { id: '1', title: 'Namma Metro Hack', desc: 'Use the Purple line for Church St & Indiranagar to skip peak traffic jams.', icon: 'traffic' },
        { id: '2', title: 'Light Jacket Advantage', desc: 'Evenings can get chilly around 21°C. Carry a light denim or corduroy jacket.', icon: 'sun' },
        { id: '3', title: 'Microbrewery Reservations', desc: 'Popular pubs in Koramangala & Indiranagar fill up by 7:30 PM on Saturdays.', icon: 'party' },
      ],
    };
  }

  if (norm.includes('mumbai') || norm.includes('bombay')) {
    return {
      weather: {
        temp: '29°C',
        condition: 'Humid Coastal Breeze',
        humidity: '78%',
        recommendation: 'Head to Marine Drive or Bandra Fort after 5 PM for ocean breeze and cooler temperatures.',
        isLive: true,
      },
      tips: [
        { id: '1', title: 'Mumbai Local & Auto', desc: 'Shared autos run smoothly in Bandra & Juhu; use Western Line local trains for South Bombay.', icon: 'traffic' },
        { id: '2', title: 'Breathable Fabrics', desc: 'High humidity calls for cotton tees, linen shorts, and comfortable walking sneakers.', icon: 'sun' },
        { id: '3', title: 'Sunset Timing', desc: 'Arrive at Marine Drive or Juhu promenade by 5:45 PM for prime golden hour reflections.', icon: 'clock' },
      ],
    };
  }

  if (norm.includes('delhi') || norm.includes('gurgaon') || norm.includes('noida')) {
    return {
      weather: {
        temp: '30°C',
        condition: 'Sunny & Clear Skies',
        humidity: '45%',
        recommendation: 'Plan outdoor HKV fort walks post 4 PM; enjoy climate-controlled CyberHub or CP dining earlier.',
        isLive: true,
      },
      tips: [
        { id: '1', title: 'Delhi Metro Express', desc: 'Yellow Line connects CP, Hauz Khas, and Gurgaon CyberHub super fast.', icon: 'traffic' },
        { id: '2', title: 'Sunglasses & Sunscreen', desc: 'Bright afternoon sun requires UV protection and hydration during outdoor heritage walks.', icon: 'sun' },
        { id: '3', title: 'Late Night Grub', desc: 'CP and CyberHub food spots stay vibrant well past midnight on weekends.', icon: 'party' },
      ],
    };
  }

  if (norm.includes('hyderabad')) {
    return {
      weather: {
        temp: '28°C',
        condition: 'Mild & Sunny',
        humidity: '52%',
        recommendation: 'Great time for Durgam Cheruvu bridge walks at sunset and Jubilee Hills rooftop lounges at night.',
        isLive: true,
      },
      tips: [
        { id: '1', title: 'Rapido & Metro Connectivity', desc: 'Hyderabad Metro is smooth for HITECH City to Old City heritage rides.', icon: 'traffic' },
        { id: '2', title: 'Late Night Biryani Timing', desc: 'Authentic Biryani spots around Charminar & Old City peak after 10 PM.', icon: 'party' },
        { id: '3', title: 'Comfort Footwear', desc: 'Wear comfortable sneakers for exploring cobblestones around Charminar and Lake bridge.', icon: 'footprints' },
      ],
    };
  }

  if (norm.includes('goa')) {
    return {
      weather: {
        temp: '28°C',
        condition: 'Tropical Ocean Breeze',
        humidity: '72%',
        recommendation: 'Beach shack sunsets, watersports at Vagator, and open-air music deck parties in Anjuna!',
        isLive: true,
      },
      tips: [
        { id: '1', title: 'Scooter Rental Hack', desc: 'Renting a scooter or Thar is the easiest way to hop between Assagao cafes and Anjuna shacks.', icon: 'traffic' },
        { id: '2', title: 'Beachwear & Sunnies', desc: 'Light linen shirts, flip-flops, and polarized sunglasses are mandatory Goan drip.', icon: 'sun' },
        { id: '3', title: 'Sunset Shack Booking', desc: 'Reserve clifftop tables at Vagator or Morjim by 5 PM for front-row sunset views.', icon: 'clock' },
      ],
    };
  }

  // Chennai (Default)
  return {
    weather: {
      temp: '32°C',
      condition: 'Partly Cloudy & Coastal Humid',
      humidity: '74%',
      recommendation: 'Ideal for early evening beach walks at Besant Nagar or ECR cafe hopping after 4:30 PM.',
      isLive: true,
    },
    tips: [
      { id: '1', title: 'ECR Traffic Tip', desc: 'Avoid East Coast Road bottleneck between 6-7 PM; take coastal internal roads.', icon: 'traffic' },
      { id: '2', title: 'Coastal Footwear', desc: 'Opt for waterproof sandals or slides if hitting Bessie or Kovalam beach sand.', icon: 'footprints' },
      { id: '3', title: 'Hydration Hack', desc: 'Enjoy fresh tender coconut (Elaneer) at beach stalls to beat coastal humidity.', icon: 'sun' },
    ],
  };
};

// Outfit recommendation per city & vibe
export const getOutfitForCityAndVibe = (cityName: string, vibe: VibeType): OutfitRecommendation => {
  const norm = cityName.trim().toLowerCase();

  let cityContext = 'Coastal';
  if (norm.includes('bengaluru')) cityContext = 'Cool Garden City';
  if (norm.includes('mumbai')) cityContext = 'Bombay Street Chic';
  if (norm.includes('delhi')) cityContext = 'Urban High-Street';
  if (norm.includes('goa')) cityContext = 'Tropical Beach Resort';
  if (norm.includes('hyderabad')) cityContext = 'Royal Lounge';

  const OUTFITS: Record<VibeType, OutfitRecommendation> = {
    chill: {
      vibe: 'chill',
      title: `${cityContext} Casual Drip`,
      subtitle: `Relaxed, effortless styling for ${cityName} cafe hopping`,
      top: 'Over-sized relaxed linen shirt or pastel drop-shoulder tee',
      bottom: 'Relaxed cotton drawstring trousers or vintage straight denim',
      footwear: 'Minimalist white leather sneakers or birkenstock slides',
      accessories: 'Polarized tinted sunglasses + canvas tote bag',
      vibeTip: `Breaths easily under ${cityName} afternoon sun while looking camera-ready at aesthetic cafes.`,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    },
    thrill: {
      vibe: 'thrill',
      title: `${cityContext} Adventure Athleisure`,
      subtitle: `High-durability squad gear for active ${cityName} exploring`,
      top: 'Breathable quick-dry sports tee or light zip jacket',
      bottom: 'Flexible cargo joggers with secure utility pockets',
      footwear: 'High-traction trail running sneakers or sports sandals',
      accessories: 'Smartwatch tracker + cross-body chest bag',
      vibeTip: `Protects against sun and water splashes while keeping you agile across outdoor spots in ${cityName}.`,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    },
    foodie: {
      vibe: 'foodie',
      title: `${cityContext} Street Food & Dining Fit`,
      subtitle: `Comfortable yet fashionable fit for ${cityName} food crawls`,
      top: 'Soft breathable cotton polo shirt or vintage graphic tee',
      bottom: 'Comfortable flex-waist shorts or relaxed chinos',
      footwear: 'Slip-on canvas shoes or clean retro sneakers',
      accessories: 'Light jacket + wet wipes pouch & crossbody sling',
      vibeTip: `Designed with extra waist comfort so you can indulge in ${cityName} street food feasts freely.`,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    },
    party: {
      vibe: 'party',
      title: `${cityContext} Nightlife Glam`,
      subtitle: `Sleek dark-mode styling for ${cityName} lounges & brewpubs`,
      top: 'Textured Cuban collar dark shirt or satin top with chain link',
      bottom: 'Tailored slim trousers or dark-wash distressed denim',
      footwear: 'Sleek chelsea boots or crisp high-top sneakers',
      accessories: 'Minimalist silver watch + subtle woody cologne',
      vibeTip: `Passes all upscale ${cityName} pub dress codes while popping under club neon lighting.`,
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    },
    beach: {
      vibe: 'beach',
      title: `${cityContext} Golden Hour Resort Fit`,
      subtitle: `Sunset sunset aesthetic for ${cityName} waterfronts & lakes`,
      top: 'Open-collar tropical print linen shirt or ribbed tank top',
      bottom: 'Quick-dry tailored swim shorts or light linen pants',
      footwear: 'Water-resistant slides or comfortable espadrilles',
      accessories: 'Retro round sunglasses + woven straw hat',
      vibeTip: `Perfect for transitioning from walking along ${cityName} waters to sipping evening coolers.`,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
  };

  return OUTFITS[vibe] || OUTFITS.chill;
};
