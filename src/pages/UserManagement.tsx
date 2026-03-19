import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, X, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { appUsers as initialUsers } from '../data/mockData';
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

function RowMenu({
  user,
  onEdit,
  onDelete,
}: {
  user: AppUser;
  onEdit: (u: AppUser) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1 rounded hover:bg-gray-100"
      >
        <MoreHorizontal size={16} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
          <button
            onClick={() => { setOpen(false); onEdit(user); }}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Pencil size={14} className="text-gray-400" />
            Edit
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(user.id); }}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function UserManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<AppUser[]>(initialUsers);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        `${u.firstName} ${u.middleName} ${u.lastName}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [search, users]);

  function handleEdit(user: AppUser) {
    navigate(`/user-management/edit/${user.id}`, { state: { user } });
  }

  function handleDelete(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Users', value: users.length },
          { label: 'Active', value: users.filter((u) => u.status === 'Active').length },
          { label: 'Inactive', value: users.filter((u) => u.status === 'Inactive').length },
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
                      <RowMenu user={user} onEdit={handleEdit} onDelete={handleDelete} />
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
