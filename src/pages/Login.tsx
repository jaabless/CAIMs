import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error ?? 'Login failed.');
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a6b4a] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/3 right-8 w-40 h-40 rounded-full bg-white/5" />

        <div className="relative z-10 text-center max-w-sm">
          {/* Logo mark */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#1a6b4a] font-bold text-lg">C</span>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">CAIMs</span>
          </div>

          <h2 className="text-white text-3xl font-bold leading-snug mb-4">
            Customer Asset<br />Information Management
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Manage buildings, customers, meters, and infrastructure across all regions of Ghana — from a single platform.
          </p>

          {/* Feature pills */}
          <div className="mt-10 flex flex-col gap-3 text-left">
            {[
              'Real-time asset tracking',
              'Region & district filtering',
              'Multi-user access control',
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2.5">
                <div className="w-2 h-2 rounded-full bg-green-300 shrink-0" />
                <span className="text-white/90 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-[#1a6b4a] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-gray-800 text-xl font-bold">CAIMs</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
              <p className="text-gray-400 text-sm mt-1">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@caims.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#1a6b4a] focus:ring-2 focus:ring-[#1a6b4a]/10 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#1a6b4a] focus:ring-2 focus:ring-[#1a6b4a]/10 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-3.5 py-2.5 rounded-lg">
                  <span className="shrink-0">⚠</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-[#1a6b4a] hover:bg-[#155c3e] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-lg transition"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {/* Demo hint */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-2">Demo credentials</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { email: 'andrew@caims.com', pass: 'password123', label: 'Andrew' },
                  { email: 'admin@caims.com', pass: 'admin123', label: 'Admin' },
                ].map((demo) => (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => { setEmail(demo.email); setPassword(demo.pass); setError(''); }}
                    className="text-xs text-[#1a6b4a] bg-[#e8f5f0] hover:bg-[#d0eddf] px-3 py-2 rounded-lg transition font-medium"
                  >
                    Use {demo.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
