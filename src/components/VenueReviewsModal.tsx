import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle, User, Building } from 'lucide-react';
import { VenueReview } from '../types';
import { addVenueReview, getReviewsForVenue, getVenueRatingStats } from '../utils/reviewsManager';

interface VenueReviewsModalProps {
  venueName: string;
  neighborhood: string;
  darkMode: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

export const VenueReviewsModal: React.FC<VenueReviewsModalProps> = ({
  venueName,
  neighborhood,
  darkMode,
  onClose,
  onReviewSubmitted,
}) => {
  const [reviews, setReviews] = useState<VenueReview[]>(() => getReviewsForVenue(venueName));
  const [stats, setStats] = useState(() => getVenueRatingStats(venueName));

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState('');
  const [college, setCollege] = useState('');
  const [comment, setComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addVenueReview(venueName, userName, college, rating, comment);

    // Refresh modal data
    const updatedReviews = getReviewsForVenue(venueName);
    const updatedStats = getVenueRatingStats(venueName);

    setReviews(updatedReviews);
    setStats(updatedStats);

    // Reset form
    setComment('');
    setSubmittedSuccess(true);
    onReviewSubmitted();

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className={`max-w-2xl w-full max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-6 border-b flex items-center justify-between shrink-0 ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-wider border border-amber-500/20">
                Chennai Squad Ratings
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {neighborhood}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {venueName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Rating Summary Bar */}
        <div className="p-6 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-teal-500/10 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl sm:text-4xl font-black text-amber-500 flex items-center gap-1">
                <span>{stats.avgRating}</span>
                <Star className="w-7 h-7 fill-amber-500 text-amber-500 inline" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Average Rating
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Based on {stats.totalCount} student & local reviews
                </p>
              </div>
            </div>

            <a
              href="#review-form"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-black transition-all shadow-md"
            >
              + Rate Venue
            </a>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Write A Review Section */}
          <div id="review-form" className={`p-5 rounded-2xl border space-y-4 ${
            darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold flex items-center gap-2 text-slate-900 dark:text-white">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                Leave Your Rating & Experience
              </h3>
              <span className="text-[10px] text-slate-400">Saved to LocalStorage</span>
            </div>

            {submittedSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! Your rating and review were saved successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Picker */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Your Rating (1 to 5 Stars):
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(starNum => {
                    const isFilled = starNum <= (hoverRating || rating);
                    return (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => setRating(starNum)}
                        onMouseEnter={() => setHoverRating(starNum)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-amber-500 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${isFilled ? 'fill-amber-500 text-amber-500' : 'text-slate-400 dark:text-slate-600'}`} />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-black text-amber-500">
                    {hoverRating || rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & College Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Your Name or Squad Title
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Varun K."
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    College / Neighborhood
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Anna Univ / Besant Nagar"
                      value={college}
                      onChange={e => setCollege(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Short Review & Must-Try Advice *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Share what you ordered, best time to visit, or vibe rating..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className={`w-full p-3 rounded-xl text-xs border ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Local Review</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Reviews List */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Community Reviews ({reviews.length})
            </h3>

            {reviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No reviews yet for this venue. Be the first to rate it!</p>
            ) : (
              <div className="space-y-3">
                {reviews.map(rev => (
                  <div
                    key={rev.id}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      darkMode ? 'bg-slate-800/40 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                          {rev.userName}
                        </span>
                        {rev.collegeOrRole && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-bold">
                            {rev.collegeOrRole}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 ml-1.5">{rev.createdAt}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
