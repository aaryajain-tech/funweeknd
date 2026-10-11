import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MoodSurvey } from './components/MoodSurvey';
import { ItineraryView } from './components/ItineraryView';
import { OutfitGuide } from './components/OutfitGuide';
import { SavedPlans } from './components/SavedPlans';
import { Footer } from './components/Footer';

import { ItineraryItem, ItineraryPlan, SurveyState, WeatherInfo } from './types';
import { generateCustomItinerary } from './utils/itineraryBuilder';
import { getStartingHubsForCity, getWeatherAndTipsForCity } from './data/cityData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'survey' | 'itinerary' | 'outfit' | 'saved'>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Global City Selector State (Default: Chennai)
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');

  // Initial Survey State
  const [survey, setSurvey] = useState<SurveyState>(() => {
    const hubs = getStartingHubsForCity('Chennai');
    return {
      vibe: 'chill',
      startingPoint: hubs[0]?.name || 'Chennai Central',
      budget: 'reasonable',
      commute: 'rapido',
      groupSize: 'squad',
      city: 'Chennai',
    };
  });

  // Current Generated Itinerary Items
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(() => {
    return generateCustomItinerary({
      vibe: 'chill',
      startingPoint: 'Chennai Central',
      budget: 'reasonable',
      commute: 'rapido',
      groupSize: 'squad',
      city: 'Chennai',
    });
  });

  // Saved Plans state with localStorage persistence
  const [savedPlans, setSavedPlans] = useState<ItineraryPlan[]>(() => {
    try {
      const stored = localStorage.getItem('vibeweek_saved_plans');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Live Weather Info State
  const [weather, setWeather] = useState<WeatherInfo>(() => {
    const cityInfo = getWeatherAndTipsForCity('Chennai');
    return {
      temp: cityInfo.weather.temp,
      condition: cityInfo.weather.condition,
      humidity: cityInfo.weather.humidity,
      recommendation: `Explore outdoors post 4:30 PM in Chennai.`,
    };
  });

  // Sync saved plans to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vibeweek_saved_plans', JSON.stringify(savedPlans));
    } catch (e) {
      console.error('Error saving plans to localStorage:', e);
    }
  }, [savedPlans]);

  // Handle City Change Globally
  const handleSelectCity = (newCity: string) => {
    setSelectedCity(newCity);
    const hubs = getStartingHubsForCity(newCity);
    const updatedSurvey: SurveyState = {
      ...survey,
      city: newCity,
      startingPoint: hubs[0]?.name || newCity,
    };
    setSurvey(updatedSurvey);
    
    // Regenerate itinerary for the newly selected city
    const newItems = generateCustomItinerary(updatedSurvey);
    setItineraryItems(newItems);

    // Update weather preset for new city
    const cityInfo = getWeatherAndTipsForCity(newCity);
    setWeather({
      temp: cityInfo.weather.temp,
      condition: cityInfo.weather.condition,
      humidity: cityInfo.weather.humidity,
      recommendation: `Perfect for weekend vibes in ${newCity}.`,
      isLive: false,
    });
  };

  // Initial Live Weather Fetch on App Load
  useEffect(() => {
    fetch(`/api/chennai-live?city=${encodeURIComponent(selectedCity)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.weather) {
          setWeather({
            temp: data.weather.temp || '30°C',
            condition: data.weather.condition || 'Partly Cloudy',
            humidity: data.weather.humidity || '68%',
            recommendation: data.weather.recommendation || `Plan outdoor spots post 4:30 PM in ${selectedCity}.`,
            isLive: true,
          });
        }
      })
      .catch(err => {
        console.log('Using default cached weather data:', err);
      });
  }, [selectedCity]);

  // Handle Survey Submit
  const handleSurveyGenerate = (newSurvey: SurveyState) => {
    const surveyWithCity = { ...newSurvey, city: selectedCity };
    setSurvey(surveyWithCity);
    const newItems = generateCustomItinerary(surveyWithCity);
    setItineraryItems(newItems);
    setActiveTab('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Saving Plan
  const handleSavePlan = () => {
    const totalCost = itineraryItems.reduce((acc, item) => {
      const costNum = parseInt(item.estCostPerPerson.replace(/[^0-9]/g, '')) || 0;
      return acc + costNum;
    }, 0);

    const planCity = survey.city || selectedCity;
    const newPlan: ItineraryPlan = {
      id: `plan-${Date.now()}`,
      name: `${survey.vibe.toUpperCase()} ${planCity.toUpperCase()} Weekend`,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      city: planCity,
      survey: { ...survey, city: planCity },
      items: itineraryItems,
      totalEstCost: `₹${totalCost}`,
    };

    setSavedPlans([newPlan, ...savedPlans]);
  };

  // Check if current plan is already saved
  const isCurrentPlanSaved = savedPlans.some(
    p => p.survey.vibe === survey.vibe &&
         (p.survey.city || 'Chennai') === (survey.city || selectedCity) &&
         p.items.length === itineraryItems.length
  );

  // Load Saved Plan
  const handleLoadSavedPlan = (plan: ItineraryPlan) => {
    const loadedCity = plan.survey.city || 'Chennai';
    setSelectedCity(loadedCity);
    setSurvey(plan.survey);
    setItineraryItems(plan.items);
    setActiveTab('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Saved Plan
  const handleDeleteSavedPlan = (planId: string) => {
    setSavedPlans(savedPlans.filter(p => p.id !== planId));
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      darkMode ? 'vibrant-bg-dark text-slate-100' : 'vibrant-bg-light text-slate-900'
    }`}>
      
      {/* Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        weather={weather}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {activeTab === 'home' && (
          <HeroSection
            onStartSurvey={() => {
              setActiveTab('survey');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSpot={_spotId => {
              setActiveTab('itinerary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            darkMode={darkMode}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
          />
        )}

        {activeTab === 'survey' && (
          <MoodSurvey
            onGenerate={handleSurveyGenerate}
            darkMode={darkMode}
            selectedCity={selectedCity}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryView
            items={itineraryItems}
            setItems={setItineraryItems}
            survey={survey}
            onSavePlan={handleSavePlan}
            onViewOutfit={() => {
              setActiveTab('outfit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShareSquad={() => {
              if (!isCurrentPlanSaved) {
                handleSavePlan();
              }
              setActiveTab('saved');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isSaved={isCurrentPlanSaved}
            darkMode={darkMode}
          />
        )}

        {activeTab === 'outfit' && (
          <OutfitGuide
            currentVibe={survey.vibe}
            weather={weather}
            setWeather={setWeather}
            darkMode={darkMode}
            selectedCity={selectedCity}
          />
        )}

        {activeTab === 'saved' && (
          <SavedPlans
            savedPlans={savedPlans}
            onLoadPlan={handleLoadSavedPlan}
            onDeletePlan={handleDeleteSavedPlan}
            darkMode={darkMode}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        darkMode={darkMode}
        onNavigate={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}

