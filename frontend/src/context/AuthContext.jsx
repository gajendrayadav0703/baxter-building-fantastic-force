import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { setUnauthorizedHandler, TOKEN_STORAGE_KEY } from '../api/apiClient';
import { getMeRequest, loginRequest, logoutRequest, registerRequest } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_STORAGE_KEY))
  );
  const [sessionNotice, setSessionNotice] = useState(null);

  const clearSession = useCallback((notice = null) => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
    if (notice) {
      setSessionNotice(notice);
    }
  }, []);

  useEffect(() => {
    setUnauthorizedHandler((message) => {
      clearSession(message || 'Your session has expired. Please sign in again.');
    });

    return () => setUnauthorizedHandler(null);
  }, [clearSession]);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      if (!token) {
        if (isMounted) setIsBootstrapping(false);
        return;
      }

      try {
        const data = await getMeRequest();
        if (isMounted) {
          setUser(data.user);
        }
      } catch {
        if (isMounted) {
          clearSession();
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    restoreSession();
    return () => {
      isMounted = false;
    };
  }, [token, clearSession]);

  const login = useCallback(async (credentials) => {
    const data = await loginRequest(credentials);
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    setSessionNotice(null);
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await registerRequest(payload);
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    setSessionNotice(null);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // Clear local session even if the server is unreachable
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isBootstrapping,
      sessionNotice,
      clearSessionNotice: () => setSessionNotice(null),
      login,
      register,
      logout,
    }),
    [user, token, isBootstrapping, sessionNotice, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
