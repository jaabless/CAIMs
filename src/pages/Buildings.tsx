import { useState, useMemo, useEffect } from 'react';
import { Search, Download, Plus, MoreHorizontal, X } from 'lucide-react';
import { buildings, buildingStats } from '../data/mockData';
import { allRegionNames, getDistrictsForRegions } from '../data/ghana';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/Pagination';
import type { Building } from '../types';

const PAGE_SIZE = 10;

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

const STATUS_OPTIONS = ['Complete', 'Incomplete', 'Pending'];
const TAG_OPTIONS = ['New entry', 'Existing'];

export default function Buildings() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);

  const [regionFilter, setRegionFilter] = useState<Set<string>>(new Set());
  const [districtFilter, setDistrictFilter] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [tagFilter, setTagFilter] = useState<Set<string>>(new Set());

  const availableDistricts = useMemo(
    () => getDistrictsForRegions(Array.from(regionFilter)),
    [regionFilter]
  );

  // Reset to page 1 whenever filters or search change
  useEffect(() => { setCurrentPage(1); }, [search, regionFilter, districtFilter, statusFilter, tagFilter]);

  function handleRegionChange(updated: Set<string>) {
    setRegionFilter(updated);
    const validDistricts = getDistrictsForRegions(Array.from(updated));
    setDistrictFilter((prev) => new Set([...prev].filter((d) => validDistricts.includes(d))));
  }

  const filtered = useMemo(() => {
    return buildings.filter((b) => {
      const matchSearch =
        b.slrn.toLowerCase().includes(search.toLowerCase()) ||
        b.address.toLowerCase().includes(search.toLowerCase()) ||
        b.region.toLowerCase().includes(search.toLowerCase());
      const matchRegion =
        regionFilter.size === 0 ||
        [...regionFilter].some((r) => b.region.toUpperCase().includes(r.toUpperCase()));
      const matchDistrict =
        districtFilter.size === 0 ||
        [...districtFilter].some((d) => b.district.toLowerCase().includes(d.toLowerCase()));
      const matchStatus = statusFilter.size === 0 || statusFilter.has(b.status);
      const matchTag = tagFilter.size === 0 || tagFilter.has(b.tag);
      return matchSearch && matchRegion && matchDistrict && matchStatus && matchTag;
    });
  }, [search, regionFilter, districtFilter, statusFilter, tagFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const activeFilterCount =
    regionFilter.size + districtFilter.size + statusFilter.size + tagFilter.size;

  function clearAllFilters() {
    setRegionFilter(new Set());
    setDistrictFilter(new Set());
    setStatusFilter(new Set());
    setTagFilter(new Set());
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((b) => b.id)));
    }
  }

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl p-4 border bg-white ${
              card.highlight ? 'border-[#1a6b4a]' : 'border-gray-100'
            }`}
          >
            <p className="text-xs text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">
              {card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Search + actions */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 flex-wrap">
          {/* Search with clear button */}
          <div className="flex items-center gap-2 flex-1 max-w-xs border border-gray-200 rounded-lg px-3 py-2">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              className="text-sm outline-none flex-1 text-gray-600 placeholder:text-gray-300"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-300 hover:text-gray-500">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>From:</span>
            <input type="date" className="border border-gray-200 rounded px-2 py-1 text-xs" />
            <span>To:</span>
            <input type="date" className="border border-gray-200 rounded px-2 py-1 text-xs" />
          </div>

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
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 flex-wrap">
          <span className="text-sm text-gray-500 font-medium">Filter</span>
          <FilterDropdown label="Regions" options={allRegionNames} selected={regionFilter} onChange={handleRegionChange} />
          <FilterDropdown label="Districts" options={availableDistricts} selected={districtFilter} onChange={setDistrictFilter} />
          <FilterDropdown label="Status" options={STATUS_OPTIONS} selected={statusFilter} onChange={setStatusFilter} />
          <FilterDropdown label="Tag" options={TAG_OPTIONS} selected={tagFilter} onChange={setTagFilter} />
          {activeFilterCount > 0 && (
            <button onClick={clearAllFilters} className="ml-1 text-xs text-red-500 hover:text-red-600 underline underline-offset-2">
              Clear all filters
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 py-2 border-b border-gray-100">
            {[...regionFilter].map((v) => (<Chip key={`r-${v}`} label={v} onRemove={() => { const n = new Set(regionFilter); n.delete(v); handleRegionChange(n); }} />))}
            {[...districtFilter].map((v) => (<Chip key={`d-${v}`} label={v} onRemove={() => { const n = new Set(districtFilter); n.delete(v); setDistrictFilter(n); }} />))}
            {[...statusFilter].map((v) => (<Chip key={`s-${v}`} label={v} onRemove={() => { const n = new Set(statusFilter); n.delete(v); setStatusFilter(n); }} />))}
            {[...tagFilter].map((v) => (<Chip key={`t-${v}`} label={v} onRemove={() => { const n = new Set(tagFilter); n.delete(v); setTagFilter(n); }} />))}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-10 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selected.size === paginated.length && paginated.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                {['BUILDING SLRN', 'ADDRESS', 'CONNECTED ACCOUNTS', 'REGION', 'DISTRICT', 'FEEDER NAME', 'DT NAME', 'STATUS', 'TAG', ''].map((col) => (
                  <th key={col} className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((building) => (
                <tr key={building.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded" checked={selected.has(building.id)} onChange={() => toggleSelect(building.id)} />
                  </td>
                  <td className="px-3 py-3 font-medium text-gray-700 whitespace-nowrap">{building.slrn}</td>
                  <td className="px-3 py-3 text-gray-500 max-w-[200px] truncate">{building.address}</td>
                  <td className="px-3 py-3 text-gray-700 text-center">{building.connectedAccounts}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{building.region}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{building.district}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{building.feederName}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{building.dtName}</td>
                  <td className="px-3 py-3"><StatusBadge status={building.status} /></td>
                  <td className="px-3 py-3"><TagBadge tag={building.tag} /></td>
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
              No buildings match the selected filters.
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 bg-[#e8f5f0] text-[#1a6b4a] text-xs font-medium px-2 py-0.5 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-red-500 transition-colors">×</button>
    </span>
  );
}
