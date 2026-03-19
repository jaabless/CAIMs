import { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface TopBarProps {
  title: string;
}

export default function TopBar({ title }: TopBarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  function handleProfile() {
    setOpen(false);
    navigate('/profile');
  }

  function handleLogout() {
    setOpen(false);
    logout();
  }

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-gray-50">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
        </button>

        {/* Avatar + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-8 h-8 rounded-full bg-[#1a6b4a] flex items-center justify-center text-white text-xs font-semibold hover:ring-2 hover:ring-[#1a6b4a]/30 transition"
          >
            {user?.initials ?? '?'}
          </button>

          {open && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
              {/* User name */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-400">Signed in as</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
              </div>

              <button
                onClick={handleProfile}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <User size={15} className="text-gray-400" />
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
