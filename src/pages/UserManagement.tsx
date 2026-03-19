import { useState, useMemo } from 'react';
import { Search, Plus, X, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { appUsers } from '../data/mockData';
import type { AppUser } from '../types';

function StatusBadge({ status }: { status: AppUser['status'] }) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {status}
    </span>
  );
}

export default function UserManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return appUsers.filter(
      (u) =>
        `${u.firstName} ${u.middleName} ${u.lastName}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Users', value: appUsers.length },
          { label: 'Active', value: appUsers.filter((u) => u.status === 'Active').length },
          { label: 'Inactive', value: appUsers.filter((u) => u.status === 'Inactive').length },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 max-w-xs border border-gray-200 rounded-lg px-3 py-2">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              className="text-sm outline-none flex-1 text-gray-600 placeholder:text-gray-300"
              placeholder="Search users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-300 hover:text-gray-500">
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={() => navigate('/user-management/create')}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a6b4a] text-white rounded-lg text-sm font-medium hover:bg-[#155c3e] ml-auto"
          >
            <Plus size={14} />
            Create User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {['Name', 'Email', 'Phone', 'Sex', 'Role', 'Status', ''].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user) => {
                const fullName = [user.firstName, user.middleName, user.lastName]
                  .filter(Boolean)
                  .join(' ');
                const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1a6b4a] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                          {initials}
                        </div>
                        <span className="font-medium text-gray-700 whitespace-nowrap">{fullName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{user.email}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{user.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{user.sex}</td>
                    <td className="px-4 py-3 text-gray-600">{user.role}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <MoreHorizontal size={16} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">No users match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
