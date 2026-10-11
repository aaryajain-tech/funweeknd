import { getSpotsForCity } from '../data/cityData';
import { ChennaiSpot, ItineraryItem, SurveyState } from '../types';

export function generateCustomItinerary(survey: SurveyState, city: string = 'Chennai'): ItineraryItem[] {
  const { vibe, startingPoint, budget, commute, vegOnly, petFriendlyOnly } = survey;

  const citySpots = getSpotsForCity(city);

  // Filter spots by vibe match, budget compatibility, vegetarian, and pet-friendly rules
  let spots = citySpots.filter(s => {
    const matchesVibe = s.vibes.includes(vibe) || s.vibes.includes('chill');
    const matchesBudget = s.suitableBudgets.includes(budget) || s.suitableBudgets.includes('reasonable');
    
    // Strict Veg filter check
    if (vegOnly && s.vegType !== 'pure-veg' && s.vegType !== 'veg-friendly') {
      return false;
    }

    // Strict Pet-Friendly filter check
    if (petFriendlyOnly && !s.isPetFriendly) {
      return false;
    }

    return matchesVibe && matchesBudget;
  });

  // Fallback 1: If strictly filtered list is too small, relax vibe/budget but maintain strict veg/pet rules if required
  if (spots.length < 4) {
    spots = citySpots.filter(s => {
      if (vegOnly && s.vegType !== 'pure-veg' && s.vegType !== 'veg-friendly') return false;
      if (petFriendlyOnly && !s.isPetFriendly) return false;
      return true;
    });
  }

  // Fallback 2: Final safety fallback
  if (spots.length < 1) {
    spots = [...citySpots];
  }

  // Define commute mode display
  let commuteLabel = 'Rapido Auto';
  if (commute === 'bike') commuteLabel = 'Personal Bike / Scooter';
  if (commute === 'metro') commuteLabel = `${city} Metro & Walk`;
  if (commute === 'cab') commuteLabel = 'Uber / Ola Cab with Squad';

  const selectedSpots: ItineraryItem[] = [];

  // Helper to construct ItineraryItem with Veg & Pet metadata
  const createItem = (
    spot: ChennaiSpot,
    id: string,
    day: 'Saturday' | 'Sunday',
    time: string,
    category: ItineraryItem['category'],
    defaultDesc: string,
    commuteInfo: ItineraryItem['commuteFromPrev']
  ): ItineraryItem => {
    const vegBadge: ItineraryItem['vegBadge'] = spot.vegType === 'pure-veg' 
      ? '100% Pure Veg' 
      : spot.vegType === 'veg-friendly' 
        ? 'Veg-Friendly' 
        : undefined;

    const mustTryText = (vegOnly && spot.vegDish) ? spot.vegDish : (spot.vegDish || spot.mustTry);

    return {
      id,
      day,
      time,
      venue: spot.name,
      neighborhood: spot.area,
      category,
      estCostPerPerson: `₹${spot.avgCost}`,
      mustTry: mustTryText,
      commuteFromPrev: commuteInfo,
      badge: spot.badge,
      description: spot.description || defaultDesc,
      lat: spot.lat,
      lng: spot.lng,
      image: spot.image,
      vegType: spot.vegType,
      vegDish: spot.vegDish,
      vegBadge,
      isPetFriendly: spot.isPetFriendly,
      petNote: spot.petNote,
    };
  };

  const spot0 = spots[0] || citySpots[0];
  const spot1 = spots[1] || citySpots[Math.min(1, citySpots.length - 1)];
  const spot2 = spots[2] || citySpots[Math.min(2, citySpots.length - 1)];
  const spot3 = spots[3] || citySpots[Math.min(3, citySpots.length - 1)];
  const spot4 = spots[4] || citySpots[Math.min(4, citySpots.length - 1)];
  const spot5 = spots[5] || citySpots[Math.min(5, citySpots.length - 1)];
  const spot6 = spots[6] || citySpots[0];

  // 1. Saturday 1:30 PM - Lunch / Starting Spot
  selectedSpots.push(createItem(
    spot0,
    `sat-1-${spot0.id}`,
    'Saturday',
    '1:30 PM',
    'Lunch',
    spot0.description,
    {
      distance: '1.2 km',
      duration: '7 mins',
      recommendedMode: `${commuteLabel} from Starting Hub (${startingPoint || city})`,
    }
  ));

  // 2. Saturday 4:00 PM - Afternoon Action / Cafe Hangout
  selectedSpots.push(createItem(
    spot1,
    `sat-2-${spot1.id}`,
    'Saturday',
    '4:00 PM',
    vibe === 'thrill' ? 'Action & Thrill' : 'Chill & Cafe',
    spot1.description,
    {
      distance: '4.8 km',
      duration: '16 mins',
      recommendedMode: `${commuteLabel} across ${city}`,
    }
  ));

  // 3. Saturday 6:30 PM - Golden Hour / Sunset Spot
  selectedSpots.push(createItem(
    spot2,
    `sat-3-${spot2.id}`,
    'Saturday',
    '6:30 PM',
    'Sunset & Beach',
    spot2.description,
    {
      distance: '3.5 km',
      duration: '12 mins',
      recommendedMode: `${commuteLabel} to waterfront / sunset viewpoint`,
    }
  ));

  // 4. Saturday 9:00 PM - Dinner & Nightlife
  selectedSpots.push(createItem(
    spot3,
    `sat-4-${spot3.id}`,
    'Saturday',
    '9:00 PM',
    'Dinner & Night',
    spot3.description,
    {
      distance: '6.1 km',
      duration: '20 mins',
      recommendedMode: `${commuteLabel} towards nightlife hub`,
    }
  ));

  // 5. Sunday 10:30 AM - Sunday Morning Breakfast
  selectedSpots.push(createItem(
    spot4,
    `sun-1-${spot4.id}`,
    'Sunday',
    '10:30 AM',
    'Breakfast',
    `Piping hot local tiffin and artisanal morning coffee in ${city}.`,
    {
      distance: '2.4 km',
      duration: '9 mins',
      recommendedMode: `${commuteLabel}`,
    }
  ));

  // 6. Sunday 2:00 PM - Matinee / Sightseeing
  selectedSpots.push(createItem(
    spot5,
    `sun-2-${spot5.id}`,
    'Sunday',
    '2:00 PM',
    'Sightseeing',
    spot5.description,
    {
      distance: '4.0 km',
      duration: '14 mins',
      recommendedMode: `${commuteLabel}`,
    }
  ));

  // 7. Sunday 5:30 PM - Weekend Finale Garden Cafe
  selectedSpots.push(createItem(
    spot6,
    `sun-3-${spot6.id}`,
    'Sunday',
    '5:30 PM',
    'Chill & Cafe',
    `Wind down your ${city} weekend in a cozy aesthetic courtyard or sunset deck.`,
    {
      distance: '3.0 km',
      duration: '10 mins',
      recommendedMode: `${commuteLabel}`,
    }
  ));

  return selectedSpots;
}

