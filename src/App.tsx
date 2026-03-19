import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Buildings from './pages/Buildings';
import Customers from './pages/Customers';
import Profile from './pages/Profile';
import UserManagement from './pages/UserManagement';
import CreateUser from './pages/CreateUser';

function ComingSoon({ page }: { page: string }) {
  return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
      {page} — coming soon
    </div>
  );
}

function ProtectedRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-6 h-6 border-2 border-[#1a6b4a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/buildings" element={<Buildings />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/feeder" element={<ComingSoon page="Feeder" />} />
        <Route path="/transformers" element={<ComingSoon page="Transformers" />} />
        <Route path="/lt-poles" element={<ComingSoon page="LT Poles" />} />
        <Route path="/meters" element={<ComingSoon page="Meters" />} />
        <Route path="/surveys" element={<ComingSoon page="Surveys" />} />
        <Route path="/installations" element={<ComingSoon page="Installations" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/user-management/create" element={<CreateUser />} />
        <Route path="/user-management/edit/:id" element={<CreateUser />} />
        <Route path="/role-management" element={<ComingSoon page="Role Management" />} />
        <Route path="/crud-settings" element={<ComingSoon page="CRUD Settings" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function PublicRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (user) return <Navigate to="/" replace />;
  return <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
