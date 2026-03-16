import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Zap,
  GitBranch,
  PlusSquare,
  Building2,
  Gauge,
  ClipboardList,
  Wrench,
  UserCircle,
  UserCog,
  Shield,
  Settings,
} from 'lucide-react';

const navSections = [
  {
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
      { label: 'Customers', icon: Users, to: '/customers' },
    ],
  },
  {
    title: 'ASSETS',
    items: [
      { label: 'Feeder', icon: Zap, to: '/feeder' },
      { label: 'Transformers', icon: GitBranch, to: '/transformers' },
      { label: 'LT Poles', icon: PlusSquare, to: '/lt-poles' },
      { label: 'Buildings', icon: Building2, to: '/buildings' },
      { label: 'Meters', icon: Gauge, to: '/meters' },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Surveys', icon: ClipboardList, to: '/surveys' },
      { label: 'Installations', icon: Wrench, to: '/installations' },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { label: 'Profile', icon: UserCircle, to: '/profile' },
      { label: 'User management', icon: UserCog, to: '/user-management' },
      { label: 'Role management', icon: Shield, to: '/role-management' },
      { label: 'CRUD settings', icon: Settings, to: '/crud-settings' },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-48 min-h-screen bg-white border-r border-gray-100 flex flex-col py-4 fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 mb-6">
        <div className="w-8 h-8 bg-[#1a6b4a] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">V</span>
        </div>
        <span className="font-bold text-gray-800 text-sm">CAIMs</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto">
        {navSections.map((section, i) => (
          <div key={i} className="mb-2">
            {section.title && (
              <div className="flex items-center justify-between px-4 py-1">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-[#e8f5f0] text-[#1a6b4a] font-medium'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
