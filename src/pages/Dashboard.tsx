import { TrendingUp, ChevronDown, ChevronRight, MapPin, Search } from 'lucide-react';
import { analyticsStats, assetBreakdown } from '../data/mockData';

function formatNumber(n: number) {
  return n.toLocaleString();
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome, Andrewbackend</h2>
        <p className="text-gray-400 text-sm mt-0.5">Check out latest activities</p>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Show:</span>
        {['Assets', 'Regions', 'Districts'].map((label) => (
          <button
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50"
          >
            {label}
            <ChevronDown size={14} />
          </button>
        ))}
      </div>

      {/* Analytics Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-5">Analytics Overview</h3>
        <div className="grid grid-cols-4 gap-4">
          {analyticsStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col gap-2"
            >
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-3xl font-bold text-gray-800">
                {formatNumber(stat.value)}
              </span>
              <span className="text-xs text-gray-400">
                ({formatNumber(stat.lastMonth)} last month)
              </span>
              <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                <TrendingUp size={14} />
                {stat.percentChange.toFixed(2)} %
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: Asset summary + Map */}
      <div className="grid grid-cols-2 gap-6">
        {/* Asset breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-gray-800">1,586,854</p>
              <p className="text-xs text-gray-400 mt-0.5">Total no. of assets</p>
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
              <TrendingUp size={14} />
              45.24 %
            </div>
          </div>

          <div className="space-y-3 mt-4">
            {assetBreakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {formatNumber(item.value)}
                  </span>
                  <button className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                    <ChevronDown size={12} className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
          {/* Map background simulation */}
          <div className="w-full h-full min-h-[280px] bg-gradient-to-br from-[#e8f0e4] via-[#d4e8c8] to-[#c8ddb8] relative">
            {/* Search bar */}
            <div className="absolute top-3 right-3 flex items-center bg-white rounded-md shadow px-3 py-1.5 gap-2 z-10">
              <input
                className="text-xs text-gray-500 outline-none w-36"
                placeholder="Search for Location"
              />
              <Search size={14} className="text-gray-400" />
            </div>

            {/* Simulated map labels */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <span className="absolute top-8 left-1/4 text-xs font-semibold text-gray-600 opacity-70">Zaria</span>
                <span className="absolute top-16 left-1/3 text-xs font-semibold text-gray-600 opacity-70">Kaduna</span>
                <span className="absolute top-24 right-1/4 text-xs font-semibold text-gray-600 opacity-70">Bauchi</span>
                <span className="absolute top-28 right-1/3 text-xs font-semibold text-gray-600 opacity-70">Gombe</span>
                <span className="absolute bottom-1/3 left-1/4 text-sm font-bold text-gray-700 opacity-80">Benin</span>
                <span className="absolute top-1/3 left-1/2 text-base font-bold text-gray-700 opacity-80">Nigeria</span>
                <span className="absolute bottom-1/4 left-1/3 text-xs font-semibold text-gray-600 opacity-70">Ilorin</span>
                <span className="absolute bottom-1/4 left-1/2 text-sm font-bold text-gray-700 opacity-70">Abuja</span>
                <span className="absolute bottom-1/3 left-6 text-sm font-bold text-gray-700 opacity-80">Togo</span>
                <span className="absolute bottom-6 left-6 text-xs font-semibold text-gray-600 opacity-70">Lomé</span>

                {/* Map pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin size={24} className="text-[#1a6b4a]" fill="#1a6b4a" fillOpacity={0.3} />
                </div>
              </div>
            </div>

            {/* Roads simulation */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
              <line x1="0" y1="150" x2="400" y2="150" stroke="#b0b0a0" strokeWidth="1.5" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="#b0b0a0" strokeWidth="1.5" />
              <line x1="0" y1="80" x2="400" y2="220" stroke="#b0b0a0" strokeWidth="1" />
              <line x1="0" y1="220" x2="400" y2="80" stroke="#b0b0a0" strokeWidth="1" />
              <line x1="50" y1="0" x2="350" y2="300" stroke="#c8c8b0" strokeWidth="0.8" />
              <line x1="100" y1="0" x2="100" y2="300" stroke="#c8c8b0" strokeWidth="0.8" />
              <line x1="300" y1="0" x2="300" y2="300" stroke="#c8c8b0" strokeWidth="0.8" />
              <circle cx="200" cy="150" r="5" fill="#1a6b4a" opacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
