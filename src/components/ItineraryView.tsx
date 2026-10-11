import React, { useState } from 'react';
import { Clock, MapPin, Navigation, Utensils, Bookmark, Share2, Plus, RefreshCw, Shirt, ArrowRight, Sparkles, Check, Star, MessageSquare, Leaf, Dog } from 'lucide-react';
import { CHENNAI_SPOTS } from '../data/chennaiSpots';
import { ItineraryItem, SurveyState } from '../types';
import { getVenueRatingStats } from '../utils/reviewsManager';
import { VenueReviewsModal } from './VenueReviewsModal';

interface ItineraryViewProps {
  items: ItineraryItem[];
  setItems: React.Dispatch<React.SetStateAction<ItineraryItem[]>>;
  survey: SurveyState;
  onSavePlan: () => void;
  onViewOutfit: () => void;
  onShareSquad: () => void;
  isSaved: boolean;
  darkMode: boolean;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  items,
  setItems,
  survey,
  onSavePlan,
  onViewOutfit,
  onShareSquad,
  isSaved,
  darkMode,
}) => {
  const [selectedDay, setSelectedDay] = useState<'All' | 'Saturday' | 'Sunday'>('All');
  const [vegFilter, setVegFilter] = useState<boolean>(!!survey.vegOnly);
  const [petFilter, setPetFilter] = useState<boolean>(!!survey.petFriendlyOnly);
  const [showAddModal, setShowAddModal] = useState(false);
  const [swappingId, setSwappingId] = useState<string | null>(null);

  // Active venue modal for ratings & reviews
  const [reviewsModalVenue, setReviewsModalVenue] = useState<{ name: string; area: string } | null>(null);
  const [reviewTick, setReviewTick] = useState(0);

  // New Custom Spot Form State
  const [customVenue, setCustomVenue] = useState('');
  const [customArea, setCustomArea] = useState('Besant Nagar');
  const [customCategory, setCustomCategory] = useState<'Lunch' | 'Chill & Cafe' | 'Action & Thrill' | 'Sunset & Beach' | 'Dinner & Night'>('Chill & Cafe');
  const [customCost, setCustomCost] = useState('300');
  const [customDish, setCustomDish] = useState('');

  const filteredItems = items.filter(item => {
    if (selectedDay !== 'All' && item.day !== selectedDay) return false;
    if (vegFilter && item.vegType !== 'pure-veg' && item.vegType !== 'veg-friendly') return false;
    if (petFilter && !item.isPetFriendly) return false;
    return true;
  });


  // Calculate Total Estimated Cost
  const totalCost = items.reduce((acc, item) => {
    const costNum = parseInt(item.estCostPerPerson.replace(/[^0-9]/g, '')) || 0;
    return acc + costNum;
  }, 0);

  // Swap Spot Logic
  const handleSwapSpot = (targetId: string) => {
    const availableSpots = CHENNAI_SPOTS.filter(s => !items.some(i => i.venue === s.name));
    if (availableSpots.length === 0) return;

    const randomReplacement = availableSpots[Math.floor(Math.random() * availableSpots.length)];

    setItems(prev =>
      prev.map(item => {
        if (item.id === targetId) {
          return {
            ...item,
            venue: randomReplacement.name,
            neighborhood: randomReplacement.area,
            estCostPerPerson: `₹${randomReplacement.avgCost}`,
            mustTry: randomReplacement.mustTry,
            badge: randomReplacement.badge,
            description: randomReplacement.description,
            image: randomReplacement.image,
            lat: randomReplacement.lat,
            lng: randomReplacement.lng,
          };
        }
        return item;
      })
    );
    setSwappingId(null);
  };

  // Add Custom Spot Logic
  const handleAddCustomSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVenue.trim()) return;

    const newItem: ItineraryItem = {
      id: `custom-${Date.now()}`,
      day: selectedDay === 'Sunday' ? 'Sunday' : 'Saturday',
      time: '7:30 PM',
      venue: customVenue,
      neighborhood: customArea,
      category: customCategory,
      estCostPerPerson: `₹${customCost}`,
      mustTry: customDish || 'Specialty Local Refreshments',
      commuteFromPrev: {
        distance: '2.5 km',
        duration: '10 mins',
        recommendedMode: `${survey.commute.toUpperCase()} Ride`,
      },
      badge: 'Student Hack',
      description: 'Custom added spot by your squad!',
      lat: 13.04,
      lng: 80.25,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    };

    setItems([...items, newItem]);
    setCustomVenue('');
    setCustomDish('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Header Bar */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-extrabold uppercase tracking-wide border border-amber-500/20">
                {survey.vibe.toUpperCase()} VIBE
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-500 text-xs font-extrabold uppercase tracking-wide border border-teal-500/20">
                STARTING FROM {survey.startingPoint.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-extrabold uppercase tracking-wide border border-indigo-500/20">
                {survey.groupSize.toUpperCase()} SQUAD
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Your Customized Weekend Itinerary
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Saturday 1:00 PM to Sunday Evening • Est. Pocket Damage: <span className="font-extrabold text-amber-600 dark:text-amber-500">₹{totalCost} / person</span>
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onSavePlan}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isSaved
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-900'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Plan Saved!' : 'Save Plan'}</span>
            </button>

            <button
              onClick={onShareSquad}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>Share With Squad</span>
            </button>

            <button
              onClick={onViewOutfit}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Shirt className="w-4 h-4" />
              <span>Outfit & Weather</span>
            </button>
          </div>
        </div>

        {/* Day & Quick Filter Controls */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Saturday', 'Sunday'] as const).map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDay === day
                    ? 'bg-amber-500 text-slate-900 font-extrabold shadow-md'
                    : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {day === 'All' ? 'Full Schedule' : day}
              </button>
            ))}

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block" />

            {/* Quick Veg Toggle */}
            <button
              onClick={() => setVegFilter(!vegFilter)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                vegFilter
                  ? 'bg-emerald-500 text-slate-900 border-emerald-500 font-extrabold shadow-sm'
                  : darkMode ? 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-emerald-500/50' : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-emerald-500/50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>100% Veg Only</span>
            </button>

            {/* Quick Pet Toggle */}
            <button
              onClick={() => setPetFilter(!petFilter)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                petFilter
                  ? 'bg-amber-500 text-slate-900 border-amber-500 font-extrabold shadow-sm'
                  : darkMode ? 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-amber-500/50' : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-amber-500/50'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              <span>Pet-Friendly 🐾</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl border border-dashed border-amber-500 text-amber-500 hover:bg-amber-500/10 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Spot</span>
          </button>
        </div>
      </div>

      {/* Chronological Timeline Cards */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-teal-500 before:to-indigo-500 before:hidden sm:before:block">
        {filteredItems.map((item, idx) => {
          const stats = getVenueRatingStats(item.venue);

          return (
            <div key={item.id} className="relative sm:pl-16 space-y-4">
              
              {/* Timeline Day/Time Badge */}
              <div className="hidden sm:flex absolute left-0 top-6 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 text-slate-900 font-black text-xs flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                #{idx + 1}
              </div>

              {/* Commute Info Pill Between Consecutive Venues */}
              {item.commuteFromPrev && idx > 0 && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 text-amber-300 text-[11px] font-semibold border border-amber-500/20 backdrop-blur-md shadow-sm">
                  <Navigation className="w-3.5 h-3.5 text-teal-400" />
                  <span>Travel: {item.commuteFromPrev.distance} ({item.commuteFromPrev.duration})</span>
                  <span className="text-slate-400">• {item.commuteFromPrev.recommendedMode}</span>
                </div>
              )}

              {/* Main Venue Card */}
              <div className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl ${
                darkMode ? 'bg-slate-800/90 border-slate-700/80' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Spot Image */}
                  <div className="lg:col-span-4 relative h-48 sm:h-52 rounded-2xl overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.venue}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-slate-900/80 text-amber-400 backdrop-blur-md border border-amber-400/30">
                        {item.badge}
                      </span>
                    </div>

                    {/* Day & Time Overlay */}
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.day} {item.time}</span>
                    </div>
                  </div>

                  {/* Spot Details */}
                  <div className="lg:col-span-8 space-y-3">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                            {item.category}
                          </span>

                          {/* EXPLICIT VEG BADGE */}
                          {(item.vegBadge === '100% Pure Veg' || item.vegType === 'pure-veg') && (
                            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                              <Leaf className="w-3 h-3 fill-emerald-500/20" />
                              🟢 100% Pure Veg
                            </span>
                          )}
                          {(item.vegBadge === 'Veg-Friendly' || item.vegType === 'veg-friendly') && (
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                              <Leaf className="w-3 h-3" />
                              🌱 Veg-Friendly Cafe
                            </span>
                          )}

                          {/* PET FRIENDLY BADGE */}
                          {item.isPetFriendly && (
                            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                              <Dog className="w-3 h-3 text-amber-500" />
                              🐾 Verified Pet Friendly
                            </span>
                          )}

                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            {item.neighborhood}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                          {item.venue}
                        </h3>

                        {/* STAR RATING & REVIEWS PILL */}
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-black border border-amber-500/20">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{stats.avgRating}</span>
                            <span className="text-slate-500 dark:text-slate-400 font-normal text-[10px]">
                              ({stats.totalCount} {stats.totalCount === 1 ? 'review' : 'reviews'})
                            </span>
                          </div>

                          <button
                            onClick={() => setReviewsModalVenue({ name: item.venue, area: item.neighborhood })}
                            className="text-xs font-extrabold text-indigo-500 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Rate & Reviews</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-black text-amber-500">
                          {item.estCostPerPerson}
                        </span>
                        <p className="text-[10px] text-slate-400">avg per person</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* RECENT REVIEW SNIPPET */}
                    {stats.recentReview && (
                      <div className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                        darkMode ? 'bg-slate-900/60 border-slate-700/70 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold mt-0.5">
                          <Star className="w-3 h-3 fill-amber-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="font-extrabold text-[11px] text-slate-900 dark:text-white truncate">
                              {stats.recentReview.userName} ({stats.recentReview.collegeOrRole || 'Chennai Local'})
                            </span>
                            <span className="text-[10px] font-bold text-amber-500 shrink-0">
                              {stats.recentReview.rating}★
                            </span>
                          </div>
                          <p className="italic text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                            &quot;{stats.recentReview.comment}&quot;
                          </p>
                        </div>
                      </div>
                    )}

                    {/* MUST-TRY SPECIALTY DISH SPOTLIGHT */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-teal-500/10 border border-amber-500/30 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center shrink-0 font-bold mt-0.5">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                          Must-Try Specialty Dish / Activity
                        </p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                          {item.mustTry}
                          {(item.vegType === 'pure-veg' || item.vegType === 'veg-friendly') && (
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" title="100% Vegetarian Dish" />
                          )}
                        </p>
                      </div>
                    </div>

                    {/* VERIFIED PET-FRIENDLY POLICY NOTE */}
                    {item.isPetFriendly && (
                      <div className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                        darkMode ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50/80 border-amber-200 text-amber-900'
                      }`}>
                        <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 font-bold mt-0.5">
                          <Dog className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-extrabold uppercase text-[10px] tracking-wider block text-amber-600 dark:text-amber-400">
                            Verified Pet-Friendly Policy 🐾
                          </span>
                          <span className="text-xs font-medium">
                            {item.petNote || 'Pets are allowed in outdoor, courtyard, and patio seating sections.'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Card Bottom Actions */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => handleSwapSpot(item.id)}
                        className="text-slate-500 hover:text-amber-500 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                        title="Swap this spot with another Chennai hotspot"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Swap Spot</span>
                      </button>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.venue} ${item.neighborhood} Chennai`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 dark:text-teal-400 hover:underline font-bold flex items-center gap-1"
                      >
                        <span>Open in Google Maps</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          );
        })}

      </div>

      {/* Add Custom Spot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className={`max-w-md w-full p-6 rounded-3xl border shadow-2xl space-y-5 ${
            darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Add Custom Chennai Spot
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomSpot} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Venue / Spot Name</label>
                <input
                  type="text"
                  placeholder="e.g. Broken Bridge View Point or Cozee Dosa"
                  value={customVenue}
                  onChange={e => setCustomVenue(e.target.value)}
                  className={`w-full p-3 rounded-xl border ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Neighborhood</label>
                  <select
                    value={customArea}
                    onChange={e => setCustomArea(e.target.value)}
                    className={`w-full p-3 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <option value="Besant Nagar">Besant Nagar</option>
                    <option value="ECR">ECR</option>
                    <option value="Nungambakkam">Nungambakkam</option>
                    <option value="Sowcarpet">Sowcarpet</option>
                    <option value="Guindy">Guindy</option>
                    <option value="Anna Nagar">Anna Nagar</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Est. Cost / Person (₹)</label>
                  <input
                    type="number"
                    value={customCost}
                    onChange={e => setCustomCost(e.target.value)}
                    className={`w-full p-3 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Must-Try Specialty Item</label>
                <input
                  type="text"
                  placeholder="e.g. Hot filter coffee & ghee roast"
                  value={customDish}
                  onChange={e => setCustomDish(e.target.value)}
                  className={`w-full p-3 rounded-xl border ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold"
                >
                  Add To Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Venue Reviews & Rating Modal */}
      {reviewsModalVenue && (
        <VenueReviewsModal
          venueName={reviewsModalVenue.name}
          neighborhood={reviewsModalVenue.area}
          darkMode={darkMode}
          onClose={() => setReviewsModalVenue(null)}
          onReviewSubmitted={() => setReviewTick(prev => prev + 1)}
        />
      )}

    </div>
  );
};
