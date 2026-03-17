import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TopBarProps {
  title: string;
}

export default function TopBar({ title }: TopBarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-gray-50">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
        </button>

        {/* User info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1a6b4a] flex items-center justify-center text-white text-xs font-semibold">
            {user?.initials ?? '?'}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user?.name ?? ''}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          title="Sign out"
          className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
