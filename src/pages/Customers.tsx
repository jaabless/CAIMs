import { useState, useMemo } from 'react';
import { Search, Download, RotateCcw, MoreHorizontal } from 'lucide-react';
import { customers, customerStats } from '../data/mockData';
import { allRegionNames, getDistrictsForRegions } from '../data/ghana';
import FilterDropdown from '../components/FilterDropdown';
import type { Customer } from '../types';

function StatusBadge({ status }: { status: Customer['status'] }) {
  const colors: Record<Customer['status'], string> = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-red-100 text-red-600',
    Pending: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function TagBadge({ tag }: { tag: Customer['tag'] }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8f5f0] text-[#1a6b4a]">
      {tag}
    </span>
  );
}

const statCards = [
  { label: 'Total', value: customerStats.total, highlight: true },
  { label: 'Existing', value: customerStats.existing, highlight: false },
  { label: 'New', value: customerStats.newCustomers, highlight: false },
  { label: 'Onboarded Customers', value: customerStats.onboarded, highlight: false },
  { label: 'Unvalidated', value: customerStats.unvalidated, highlight: false },
];

const STATUS_OPTIONS = ['Pending', 'Active', 'Inactive'];
const TAG_OPTIONS = ['New entry', 'Existing'];

export default function Customers() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('Newest');

  const [regionFilter, setRegionFilter] = useState<Set<string>>(new Set());
  const [districtFilter, setDistrictFilter] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [tagFilter, setTagFilter] = useState<Set<string>>(new Set());

  const availableDistricts = useMemo(
    () => getDistrictsForRegions(Array.from(regionFilter)),
    [regionFilter]
  );

  function handleRegionChange(updated: Set<string>) {
    setRegionFilter(updated);
    const validDistricts = getDistrictsForRegions(Array.from(updated));
    setDistrictFilter((prev) => new Set([...prev].filter((d) => validDistricts.includes(d))));
  }

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.slrn.toLowerCase().includes(search.toLowerCase()) ||
        c.buildingOwner.toLowerCase().includes(search.toLowerCase()) ||
        c.address.toLowerCase().includes(search.toLowerCase()) ||
        c.region.toLowerCase().includes(search.toLowerCase());

      const matchRegion =
        regionFilter.size === 0 ||
        [...regionFilter].some((r) => c.region.toUpperCase().includes(r.toUpperCase()));

      const matchDistrict =
        districtFilter.size === 0 ||
        [...districtFilter].some((d) => c.district.toLowerCase().includes(d.toLowerCase()));

      const matchStatus = statusFilter.size === 0 || statusFilter.has(c.status);

      const matchTag = tagFilter.size === 0 || tagFilter.has(c.tag);

      return matchSearch && matchRegion && matchDistrict && matchStatus && matchTag;
    });
  }, [search, regionFilter, districtFilter, statusFilter, tagFilter]);

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
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((c) => c.id)));
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
          <div className="flex items-center gap-2 flex-1 max-w-xs border border-gray-200 rounded-lg px-3 py-2">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              className="text-sm outline-none flex-1 text-gray-600 placeholder:text-gray-300"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 ml-auto">
            <Download size={14} />
            Download
          </button>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 flex-wrap">
          <span className="text-sm text-gray-500 font-medium">Filter</span>

          <FilterDropdown
            label="Regions"
            options={allRegionNames}
            selected={regionFilter}
            onChange={handleRegionChange}
          />
          <FilterDropdown
            label="Districts"
            options={availableDistricts}
            selected={districtFilter}
            onChange={setDistrictFilter}
          />
          <FilterDropdown
            label="Status"
            options={STATUS_OPTIONS}
            selected={statusFilter}
            onChange={setStatusFilter}
          />
          <FilterDropdown
            label="Tag"
            options={TAG_OPTIONS}
            selected={tagFilter}
            onChange={setTagFilter}
          />

          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="ml-1 text-xs text-red-500 hover:text-red-600 underline underline-offset-2"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 py-2 border-b border-gray-100">
            {[...regionFilter].map((v) => (
              <Chip key={`r-${v}`} label={v} onRemove={() => {
                const next = new Set(regionFilter);
                next.delete(v);
                handleRegionChange(next);
              }} />
            ))}
            {[...districtFilter].map((v) => (
              <Chip key={`d-${v}`} label={v} onRemove={() => {
                const next = new Set(districtFilter);
                next.delete(v);
                setDistrictFilter(next);
              }} />
            ))}
            {[...statusFilter].map((v) => (
              <Chip key={`s-${v}`} label={v} onRemove={() => {
                const next = new Set(statusFilter);
                next.delete(v);
                setStatusFilter(next);
              }} />
            ))}
            {[...tagFilter].map((v) => (
              <Chip key={`t-${v}`} label={v} onRemove={() => {
                const next = new Set(tagFilter);
                next.delete(v);
                setTagFilter(next);
              }} />
            ))}
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
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                {[
                  'SLRN', 'BUILDING OWNER', 'ACCT. NO.', 'METER NO.', 'DT NAME',
                  'ADDRESS.', 'REGION', 'DISTRICT', 'TARIFF', 'STATUS', 'TAG', '', '',
                ].map((col, i) => (
                  <th
                    key={`${col}-${i}`}
                    className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selected.has(customer.id)}
                      onChange={() => toggleSelect(customer.id)}
                    />
                  </td>
                  <td className="px-3 py-3 font-medium text-gray-700 whitespace-nowrap">{customer.slrn}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{customer.buildingOwner}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{customer.acctNo}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{customer.meterNo}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{customer.dtName}</td>
                  <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{customer.address}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{customer.region}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{customer.district}</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap text-xs">{customer.tariff}</td>
                  <td className="px-3 py-3"><StatusBadge status={customer.status} /></td>
                  <td className="px-3 py-3"><TagBadge tag={customer.tag} /></td>
                  <td className="px-3 py-3">
                    <button className="p-1 rounded hover:bg-gray-100" title="History">
                      <RotateCcw size={15} className="text-gray-400" />
                    </button>
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
              No customers match the selected filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-400">
          <span>Showing {filtered.length} of {customers.length} results</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 10].map((p, i) => (
              <button
                key={i}
                className={`w-7 h-7 rounded text-xs font-medium ${
                  p === 1 ? 'bg-[#1a6b4a] text-white' : 'text-gray-500 hover:bg-gray-100'
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

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 bg-[#e8f5f0] text-[#1a6b4a] text-xs font-medium px-2 py-0.5 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-red-500 transition-colors">
        ×
      </button>
    </span>
  );
}
