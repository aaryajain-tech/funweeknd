import { VenueReview } from '../types';

const REVIEWS_STORAGE_KEY = 'vibeweek_venue_reviews';

// Initial curated default reviews for popular Chennai spots
const INITIAL_REVIEWS: VenueReview[] = [
  {
    id: 'rev-1',
    venueName: "Elliot's Beach (Bessie)",
    userName: 'Karthik & Squad',
    collegeOrRole: 'Anna University',
    rating: 5,
    comment: 'Best sunset spot in Chennai hands down! Getting hot molaga bajji at Murugan stall while ocean breeze hits is pure magic.',
    createdAt: '2 days ago',
  },
  {
    id: 'rev-2',
    venueName: "Elliot's Beach (Bessie)",
    userName: 'Divya M.',
    collegeOrRole: 'IIT Madras',
    rating: 5,
    comment: 'Super peaceful around 5 PM near Schmidt Memorial. Great acoustic guitar jams on weekends!',
    createdAt: '1 week ago',
  },
  {
    id: 'rev-3',
    venueName: 'Mash Resto Cafe',
    userName: 'Aravind S.',
    collegeOrRole: 'Loyola College',
    rating: 5,
    comment: 'The sea view from the rooftop is insane! Peach iced tea + loaded nachos is our mandatory order every Saturday.',
    createdAt: '3 days ago',
  },
  {
    id: 'rev-4',
    venueName: 'Pupil Pizzeria & Grill',
    userName: 'Rohan K.',
    collegeOrRole: 'Anna University',
    rating: 4,
    comment: 'Huge wood-fired pizza slices at super student-friendly prices. Oreo shake is super thick!',
    createdAt: '5 days ago',
  },
  {
    id: 'rev-5',
    venueName: "Writer's Cafe",
    userName: 'Sneha R.',
    collegeOrRole: 'Stella Maris',
    rating: 5,
    comment: 'So cozy and aesthetic! Love reading books while eating Swiss Flammkuchen pizza. Very affordable too.',
    createdAt: 'Yesterday',
  },
  {
    id: 'rev-6',
    venueName: "Sandy's Chocolate Laboratory",
    userName: 'Niveditha',
    collegeOrRole: 'MOP Vaishnav',
    rating: 5,
    comment: 'Hot chocolate syringe injection is an absolute experience! Must-visit if you have a sweet tooth.',
    createdAt: '4 days ago',
  },
  {
    id: 'rev-7',
    venueName: 'Sowcarpet Night Food Walk',
    userName: 'Vikram B.',
    collegeOrRole: 'SRM Kattankulathur',
    rating: 5,
    comment: 'Podi Dosa at Seena Bhai and melting cheese murukku sandwich are unmatched! Go on an empty stomach.',
    createdAt: '3 days ago',
  },
  {
    id: 'rev-8',
    venueName: 'Kakada Ramprasad Sweets & Chaat',
    userName: 'Preeti Shah',
    collegeOrRole: 'SSN Engineering',
    rating: 5,
    comment: 'Piping hot jalebi with rabri served late night is elite comfort food. Badam milk is super rich.',
    createdAt: '1 week ago',
  },
  {
    id: 'rev-9',
    venueName: 'Surf Turf Beach Cafe',
    userName: 'Sanjay V.',
    collegeOrRole: 'VIT Chennai',
    rating: 5,
    comment: 'Sipping cold brew right on Kovalam sand watching surfers catch waves. Beach resort feel in Chennai!',
    createdAt: '2 days ago',
  },
  {
    id: 'rev-10',
    venueName: 'Kathipara Urban Square',
    userName: 'Deepak & Gang',
    collegeOrRole: 'Guindy Techies',
    rating: 4,
    comment: 'Awesome open-air nightlife spot under the flyover. Food trucks, neon lighting, and cool buskers.',
    createdAt: 'Just now',
  },
  {
    id: 'rev-11',
    venueName: 'Sathyam Cinemas (SPI Cinemas)',
    userName: 'Anirudh G.',
    collegeOrRole: 'Chennai Film Buff',
    rating: 5,
    comment: 'The legendary Sathyam popcorn with 3 shaker seasoning powders is 10/10 alone. Best cinema experience.',
    createdAt: '3 days ago',
  },
  {
    id: 'rev-12',
    venueName: 'Muttukadu Boat House & Watersports',
    userName: 'Harish R.',
    collegeOrRole: 'Hindustan Univ',
    rating: 4,
    comment: 'Jet ski water scooter ride was an adrenaline rush! Great weekend group activity along ECR.',
    createdAt: '5 days ago',
  }
];

// Initialize localStorage with initial reviews if empty
export const initializeReviews = (): VenueReview[] => {
  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : INITIAL_REVIEWS;
  } catch {
    return INITIAL_REVIEWS;
  }
};

// Get all reviews
export const getAllReviews = (): VenueReview[] => {
  return initializeReviews();
};

// Get reviews for a specific venue name
export const getReviewsForVenue = (venueName: string): VenueReview[] => {
  const all = getAllReviews();
  return all.filter(r => r.venueName.trim().toLowerCase() === venueName.trim().toLowerCase());
};

// Add a new review
export const addVenueReview = (
  venueName: string,
  userName: string,
  collegeOrRole: string,
  rating: number,
  comment: string
): VenueReview => {
  const all = getAllReviews();
  const newReview: VenueReview = {
    id: `rev-${Date.now()}`,
    venueName,
    userName: userName.trim() || 'Anonymous Squad Member',
    collegeOrRole: collegeOrRole.trim() || 'Chennai Student',
    rating: Math.min(5, Math.max(1, rating)),
    comment: comment.trim(),
    createdAt: 'Just now',
  };

  const updated = [newReview, ...all];
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save review to localStorage:', e);
  }

  return newReview;
};

// Calculate average rating, total review count, and get the most recent review snippet
export const getVenueRatingStats = (venueName: string) => {
  const venueReviews = getReviewsForVenue(venueName);
  
  if (venueReviews.length === 0) {
    // Default fallback rating if new spot with no reviews yet
    return {
      avgRating: 4.8,
      totalCount: 1,
      recentReview: {
        id: 'default-rev',
        venueName,
        userName: 'Local Squad Member',
        collegeOrRole: 'Chennai Local',
        rating: 5,
        comment: 'Highly recommended spot on the Chennai weekend vibe circuit!',
        createdAt: 'Recently',
      },
    };
  }

  const sum = venueReviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = sum / venueReviews.length;

  return {
    avgRating: Number(avg.toFixed(1)),
    totalCount: venueReviews.length,
    recentReview: venueReviews[0],
  };
};
