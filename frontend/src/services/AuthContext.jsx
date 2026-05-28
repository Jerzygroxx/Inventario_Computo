import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

function getInitialState() {
  const token = localStorage.getItem('auth_token');
  const userStr = localStorage.getItem('auth_user');
  return {
    token: token || null,
    user: userStr ? JSON.parse(userStr) : null,
    loading: false
  };
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(getInitialState);

  const login = useCallback((token, user) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    setState({ token, user, loading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setState({ token: null, user: null, loading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
