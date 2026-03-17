import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthUser {
  name: string;
  email: string;
  initials: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user accounts
const MOCK_USERS: Record<string, { password: string; name: string }> = {
  'andrew@caims.com': { password: 'password123', name: 'Andrewbackend' },
  'admin@caims.com': { password: 'admin123', name: 'Admin User' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('caims_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('caims_user');
      }
    }
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 900));

    const account = MOCK_USERS[email.toLowerCase()];
    if (!account || account.password !== password) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const initials = account.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const authUser: AuthUser = { name: account.name, email, initials };
    setUser(authUser);
    localStorage.setItem('caims_user', JSON.stringify(authUser));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('caims_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
