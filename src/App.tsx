import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Buildings from './pages/Buildings';
import Customers from './pages/Customers';

function ComingSoon({ page }: { page: string }) {
  return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
      {page} — coming soon
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="/profile" element={<ComingSoon page="Profile" />} />
          <Route path="/user-management" element={<ComingSoon page="User Management" />} />
          <Route path="/role-management" element={<ComingSoon page="Role Management" />} />
          <Route path="/crud-settings" element={<ComingSoon page="CRUD Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
