import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: Set<string>;
  onChange: (updated: Set<string>) => void;
}

export default function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function toggle(option: string) {
    const next = new Set(selected);
    if (next.has(option)) next.delete(option);
    else next.add(option);
    onChange(next);
  }

  function clearAll() {
    onChange(new Set());
  }

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  const count = selected.size;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors ${
          count > 0
            ? 'border-[#1a6b4a] bg-[#e8f5f0] text-[#1a6b4a] font-medium'
            : 'border-gray-200 text-gray-500 hover:bg-gray-50'
        }`}
      >
        {label}
        {count > 0 && (
          <span className="bg-[#1a6b4a] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {count}
          </span>
        )}
        <ChevronDown
          size={13}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg w-64">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-600">{label}</span>
            {count > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
              >
                <X size={12} />
                Clear
              </button>
            )}
          </div>

          {/* Search (only shown for longer lists) */}
          {options.length > 6 && (
            <div className="px-3 py-2 border-b border-gray-100">
              <input
                className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none placeholder:text-gray-300 focus:border-[#1a6b4a]"
                placeholder={`Search ${label.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {/* Options list */}
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-xs text-gray-400">No results</li>
            ) : (
              filtered.map((option) => {
                const isSelected = selected.has(option);
                return (
                  <li key={option}>
                    <button
                      onClick={() => toggle(option)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors hover:bg-gray-50 ${
                        isSelected ? 'text-[#1a6b4a]' : 'text-gray-600'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#1a6b4a] border-[#1a6b4a]'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Check size={10} className="text-white" strokeWidth={3} />}
                      </span>
                      {option}
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          {/* Footer count */}
          {count > 0 && (
            <div className="px-3 py-2 border-t border-gray-100 text-xs text-gray-400">
              {count} selected
            </div>
          )}
        </div>
      )}
    </div>
  );
}
