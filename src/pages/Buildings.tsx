import { useState } from 'react';
import { Search, Download, Plus, ChevronDown, MoreHorizontal } from 'lucide-react';
import { buildings, buildingStats } from '../data/mockData';
import type { Building } from '../types';

function StatusBadge({ status }: { status: Building['status'] }) {
  const colors: Record<Building['status'], string> = {
    Complete: 'bg-green-100 text-green-700',
    Incomplete: 'bg-red-100 text-red-600',
    Pending: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8f5f0] text-[#1a6b4a]">
      {tag}
    </span>
  );
}

const statCards = [
  { label: 'Total', value: buildingStats.total, highlight: true },
  { label: 'Existing', value: buildingStats.existing, highlight: false },
  { label: 'New', value: buildingStats.newBuildings, highlight: false },
  { label: 'Inaccessible', value: buildingStats.inaccessible, highlight: false },
  { label: 'Total number of meters', value: buildingStats.totalMeters, highlight: false },
];

export default function Buildings() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('Newest');

  const filtered = buildings.filter(
    (b) =>
      b.slrn.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase()) ||
      b.region.toLowerCase().includes(search.toLowerCase())
  );

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((b) => b.id)));
    }
  }

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl p-4 border ${
              card.highlight
                ? 'border-[#1a6b4a] bg-white'
                : 'border-gray-100 bg-white'
            }`}
          >
            <p className="text-xs text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">
              {card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Search + actions */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-1 max-w-xs border border-gray-200 rounded-lg px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input
              className="text-sm outline-none flex-1 text-gray-600 placeholder:text-gray-300"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>From:</span>
            <input type="date" className="border border-gray-200 rounded px-2 py-1 text-xs" />
            <span>To:</span>
            <input type="date" className="border border-gray-200 rounded px-2 py-1 text-xs" />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <select
              className="outline-none text-sm bg-transparent font-medium"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>A–Z</option>
            </select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Download size={14} />
              Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a6b4a] text-white rounded-lg text-sm font-medium hover:bg-[#155c3e]">
              <Plus size={14} />
              New Building
            </button>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <span className="text-sm text-gray-500 font-medium">Filter</span>
          {['Regions', 'Districts', 'Status', 'Tag'].map((f) => (
            <button
              key={f}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
            >
              {f}
              <ChevronDown size={13} />
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-10 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                {[
                  'BUILDING SLRN',
                  'ADDRESS',
                  'CONNECTED ACCOUNTS',
                  'REGION',
                  'DISTRICT',
                  'FEEDER NAME',
                  'DT NAME',
                  'STATUS',
                  'TAG',
                  '',
                ].map((col) => (
                  <th
                    key={col}
                    className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((building) => (
                <tr
                  key={building.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selected.has(building.id)}
                      onChange={() => toggleSelect(building.id)}
                    />
                  </td>
                  <td className="px-3 py-3 font-medium text-gray-700 whitespace-nowrap">
                    {building.slrn}
                  </td>
                  <td className="px-3 py-3 text-gray-500 max-w-[200px] truncate">
                    {building.address}
                  </td>
                  <td className="px-3 py-3 text-gray-700 text-center">
                    {building.connectedAccounts}
                  </td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                    {building.region}
                  </td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                    {building.district}
                  </td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                    {building.feederName}
                  </td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                    {building.dtName}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={building.status} />
                  </td>
                  <td className="px-3 py-3">
                    <TagBadge tag={building.tag} />
                  </td>
                  <td className="px-3 py-3">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">
              No buildings match your search.
            </div>
          )}
        </div>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-400">
          <span>Showing {filtered.length} of {buildings.length} results</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 10].map((p, i) => (
              <button
                key={i}
                className={`w-7 h-7 rounded text-xs font-medium ${
                  p === 1
                    ? 'bg-[#1a6b4a] text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
