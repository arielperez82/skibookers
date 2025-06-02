import React from 'react';
import CloseButton from '@resort-discovery/adapters/web-ui/components/CloseButton';
import { useImage } from '@shared/adapters/web-ui/hooks/useImage';

const mockResort = {
  id: 'alpine-peak',
  name: 'Alpine Peak',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  matchPercent: 92,
  description: 'A premier destination for skiers of all levels, offering breathtaking views and world-class amenities.',
  match: 92,
  conditions: { label: 'Powder', icon: '❄️' },
  skill: 'Intermediate',
  runs: 45,
  stats: {
    elevation: '2,500m',
    verticalDrop: '1,200m',
    lifts: 18,
    longestRun: '7km',
    pisteLength: '75 km',
    seasonLength: '18 km',
    rooms: 846,
    homes: 780,
  },
  amenities: ['Ski-in/Ski-out', 'Spa', 'Heated Pool', 'Kids Club', 'Night Skiing'],
  reviews: [
    { user: 'Anna', rating: 5, comment: 'Amazing snow and great service!', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { user: 'Ben', rating: 4, comment: 'Loved the variety of runs.', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
  ],
  weather: {
    today: { temp: '-3°C', condition: 'Snow', icon: '🌨️' },
    tomorrow: { temp: '-5°C', condition: 'Cloudy', icon: '☁️' },
    snowDepth: '60 cm',
  },
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export function ResortDetailPage({ resortId }: { resortId: string }) {
  const Image = useImage()
  const resort = mockResort;
  // Optionally use resortId for fetching real data in the future

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-2 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Row 1: Hero + Description (full width) */}
        <div className="md:col-span-3 flex flex-col gap-8 relative">
          <CloseButton />
          <div className="rounded-xl overflow-hidden w-full aspect-[3/1.1] bg-gray-200">
            <Image src={resort.image} alt={resort.name} className="w-full h-full object-cover" width={600} height={400} />
          </div>
          <div className="flex flex-col gap-2 px-1">
            <div className="font-semibold text-xl md:text-2xl">{resort.name}</div>
            <div className="text-gray-500 text-sm mt-1">{resort.description}</div>
            <span className="text-primary text-base font-semibold mt-2">{resort.matchPercent}% match</span>
          </div>
        </div>
        {/* Row 2: Left col (Amenities + Conditions & Weather), Right col (Stats) */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Amenities */}
          <div className="bg-gray-50 rounded-xl p-6 shadow border border-gray-100 mt-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">Feature</span>
              <span className="font-semibold text-base">Available Amenities</span>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {resort.amenities.map((a) => (
                <li key={a} className="bg-white border border-gray-200 rounded px-3 py-1 text-xs font-medium shadow-sm">{a}</li>
              ))}
            </ul>
          </div>
          {/* Conditions & Weather */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col gap-4">
            <div className="font-semibold text-base mb-2">Conditions & Weather</div>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{resort.conditions.icon}</span>
                <span className="text-xs text-gray-500">{resort.conditions.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Snow Depth:</span>
                <span className="font-semibold text-xs">{resort.weather.snowDepth}</span>
              </div>
            </div>
            <div className="flex gap-6 mb-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl">{resort.weather.today.icon}</span>
                <span className="text-sm font-medium">Today</span>
                <span className="text-xs">{resort.weather.today.temp}, {resort.weather.today.condition}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">{resort.weather.tomorrow.icon}</span>
                <span className="text-sm font-medium">Tomorrow</span>
                <span className="text-xs">{resort.weather.tomorrow.temp}, {resort.weather.tomorrow.condition}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Stats (right col, row 2) */}
        <div className="md:col-span-1 flex flex-col gap-8">
          <div className="bg-gray-50 rounded-xl shadow border border-gray-100 p-6 flex flex-col gap-4">
            <div className="font-semibold text-base mb-2">Stats</div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold">{resort.stats.rooms}</div>
                <div className="text-xs text-gray-500 mt-1">Rooms</div>
              </div>
              <div>
                <div className="text-lg font-bold">{resort.stats.homes}</div>
                <div className="text-xs text-gray-500 mt-1">Homes</div>
              </div>
            </div>
            <div className="divide-y divide-gray-200 mt-4">
              <div className="flex justify-between py-2 text-sm">
                <span>Piste Length</span>
                <span className="font-semibold">{resort.stats.pisteLength}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span>Season Length</span>
                <span className="font-semibold">{resort.stats.seasonLength}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span>Elevation</span>
                <span className="font-semibold">{resort.stats.elevation}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span>Vertical Drop</span>
                <span className="font-semibold">{resort.stats.verticalDrop}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span>Lifts</span>
                <span className="font-semibold">{resort.stats.lifts}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span>Longest Run</span>
                <span className="font-semibold">{resort.stats.longestRun}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Row 3: Reviews (full width) */}
        <div className="font-semibold text-base mb-2 md:col-span-3">Reviews</div>
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {resort.reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-xl shadow border border-gray-100 flex flex-col">
              {/* <img src={r.image} alt={r.user} className="w-full h-40 object-cover rounded-t-xl" /> */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{r.user}</span>
                  <span className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <div className="text-xs text-gray-700">{r.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
