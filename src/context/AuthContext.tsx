import { createContext, useContext, useMemo, useState } from 'react';
import type { Role, User } from '../types';
import { load, save, remove } from '../store/localStorage';

type AuthCtx = {
  user: User | null;
  login: (fullName: string, role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(
    load<User | null>('user', null)
  );

  const value = useMemo(
    () => ({
      user,
      login: (fullName: string, role: Role) => {
        const u: User = { id: crypto.randomUUID(), fullName, role };
        setUser(u);
        save('user', u);
      },
      logout: () => {
        setUser(null);
        remove('user');
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
