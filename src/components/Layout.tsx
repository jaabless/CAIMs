import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/buildings': 'Buildings',
  '/customers': 'Customers',
  '/feeder': 'Feeder',
  '/transformers': 'Transformers',
  '/lt-poles': 'LT Poles',
  '/meters': 'Meters',
  '/surveys': 'Surveys',
  '/installations': 'Installations',
  '/profile': 'Profile',
  '/user-management': 'User Management',
  '/role-management': 'Role Management',
  '/crud-settings': 'CRUD Settings',
};

export default function Layout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'CAIMs';

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      <Sidebar />
      <div className="flex-1 ml-48 flex flex-col">
        <TopBar title={title} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
