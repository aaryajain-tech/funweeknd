export type VibeType = 'chill' | 'thrill' | 'foodie' | 'party' | 'beach';

export type StartingLocation = string;

export type BudgetTier = 'broke' | 'reasonable' | 'splurge';

export type CommuteMode = 'bike' | 'metro' | 'rapido' | 'cab';

export type GroupSize = 'solo' | 'duo' | 'squad' | 'gang';

export interface SurveyState {
  vibe: VibeType;
  startingPoint: StartingLocation;
  budget: BudgetTier;
  commute: CommuteMode;
  groupSize: GroupSize;
  city?: string;
  vegOnly?: boolean;
  petFriendlyOnly?: boolean;
}

export interface CityHub {
  id: string;
  name: string;
  description?: string;
}

export interface CityTipCard {
  id: string;
  title: string;
  desc: string;
  icon: 'sun' | 'clock' | 'footprints' | 'umbrella' | 'traffic' | 'party';
}

export interface ItineraryItem {
  id: string;
  day: 'Saturday' | 'Sunday';
  time: string;
  venue: string;
  neighborhood: string;
  category: 'Lunch' | 'Chill & Cafe' | 'Action & Thrill' | 'Sunset & Beach' | 'Dinner & Night' | 'Breakfast' | 'Sightseeing';
  estCostPerPerson: string;
  mustTry: string;
  commuteFromPrev?: {
    distance: string;
    duration: string;
    recommendedMode: string;
  };
  badge: 'Insta-Famous' | 'Aesthetic Spot' | 'Student Hack' | 'Late-Night Gem' | 'Local Legend';
  description: string;
  lat: number;
  lng: number;
  image: string;
  vegType?: 'pure-veg' | 'veg-friendly' | 'non-veg';
  vegDish?: string;
  vegBadge?: '100% Pure Veg' | 'Veg-Friendly';
  isPetFriendly?: boolean;
  petNote?: string;
}

export interface OutfitRecommendation {
  vibe: VibeType;
  title: string;
  subtitle: string;
  top: string;
  bottom: string;
  footwear: string;
  accessories: string;
  vibeTip: string;
  image: string;
}

export interface WeatherInfo {
  temp: string;
  condition: string;
  humidity: string;
  recommendation: string;
  isLive?: boolean;
}

export interface ItineraryPlan {
  id: string;
  name: string;
  createdAt: string;
  city: string;
  survey: SurveyState;
  items: ItineraryItem[];
  totalEstCost: string;
}

export interface ChennaiSpot {
  id: string;
  name: string;
  area: string;
  category: 'cafe' | 'beach' | 'food' | 'thrill' | 'nightlife' | 'cinema' | 'chill';
  avgCost: number;
  mustTry: string;
  badge: 'Insta-Famous' | 'Aesthetic Spot' | 'Student Hack' | 'Late-Night Gem' | 'Local Legend';
  vibes: VibeType[];
  suitableBudgets: BudgetTier[];
  lat: number;
  lng: number;
  description: string;
  image: string;
  vegType?: 'pure-veg' | 'veg-friendly' | 'non-veg';
  vegDish?: string;
  isPetFriendly?: boolean;
  petNote?: string;
}

export interface VenueReview {
  id: string;
  venueName: string;
  cityName?: string;
  userName: string;
  collegeOrRole?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}


