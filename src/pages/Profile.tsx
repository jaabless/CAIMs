import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
        <p className="text-sm text-gray-400 mt-0.5">Your account information</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-[#1a6b4a] flex items-center justify-center text-white text-xl font-bold">
            {user?.initials}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
            <p className="text-sm text-gray-700">{user?.name}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
            <p className="text-sm text-gray-700">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Role</p>
            <p className="text-sm text-gray-700">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
