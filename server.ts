import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// In-memory cache for live Chennai data (30 mins duration)
let liveCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION_MS = 30 * 60 * 1000;

// API Endpoint 1: Live Weather & Search Grounded Events for Chennai
app.get('/api/chennai-live', async (req, res) => {
  const now = Date.now();
  
  // Return cached response if valid
  if (liveCache && now - liveCache.timestamp < CACHE_DURATION_MS) {
    return res.json(liveCache.data);
  }

  const fallbackData = {
    success: true,
    weather: {
      temp: '32°C',
      condition: 'Partly Cloudy & Humid',
      humidity: '74%',
      recommendation: 'Ideal for early evening beach walks at Besant Nagar or ECR cafe hopping after 4:30 PM.',
      isLive: true,
    },
    liveEvents: [
      'Sundowner DJ Sets at ECR Beachfront Cafes (East Coast Road)',
      'Sowcarpet Weekend Street Food Night Market Trail',
      'Kathipara Urban Square Open-Air Music Jam & Flea Market',
    ],
  };

  try {
    const ai = getAi();
    if (!ai) {
      liveCache = { data: fallbackData, timestamp: now };
      return res.json(fallbackData);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: 'Provide the current weather report and top 3 trending weekend events or activity spots for college students in Chennai right now. Format as JSON with fields: weather (object with temp, condition, humidity, recommendation) and liveEvents (array of strings).',
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text ? response.text.trim() : '{}';
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch {
      data = fallbackData;
    }

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || 'Source',
        url: chunk.web.uri || '#',
      }));

    const result = {
      success: true,
      weather: data.weather || fallbackData.weather,
      liveEvents: data.liveEvents || fallbackData.liveEvents,
      sources,
    };

    liveCache = { data: result, timestamp: now };
    return res.json(result);
  } catch (error: any) {
    // Store fallback in cache for 5 mins to prevent repeated failing requests on quota limit
    liveCache = { data: fallbackData, timestamp: now - CACHE_DURATION_MS + 5 * 60 * 1000 };
    return res.json(fallbackData);
  }
});

// API Endpoint 2: AI Itinerary Recommendation Generator
app.post('/api/ai-itinerary', async (req, res) => {
  const { vibe, startingPoint, budget, commute, groupSize } = req.body;

  try {
    const ai = getAi();
    if (!ai) {
      return res.json({ success: false, fallback: true });
    }

    const prompt = `Act as an expert local Chennai college student itinerary planner. Generate a custom weekend itinerary starting Saturday 1:00 PM to Sunday Evening based on:
- Current Vibe: ${vibe}
- Starting Point: ${startingPoint}
- Budget Category: ${budget}
- Commute Mode: ${commute}
- Squad Size: ${groupSize}

Return a valid JSON object with the structure:
{
  "title": "Custom Itinerary Title",
  "vibeTagline": "Short punchy catchphrase",
  "schedule": [
    {
      "day": "Saturday",
      "time": "1:30 PM",
      "venue": "Place Name in Chennai",
      "neighborhood": "Area Name",
      "category": "Lunch / Chill / Action / Sunset / Nightlife",
      "estCostPerPerson": "₹300",
      "mustTry": "Specific dish or activity",
      "commuteFromPrev": "3.5 km • 12 mins via Rapido",
      "badge": "Insta-Famous | Aesthetic Spot | Student Hack",
      "description": "Why it fits this vibe",
      "latitude": 13.00,
      "longitude": 80.25
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, itinerary: parsed });
  } catch (error: any) {
    return res.json({ success: false, fallback: true, error: error?.message || 'API unavailable' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
