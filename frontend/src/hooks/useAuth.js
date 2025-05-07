import { useState, useEffect } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('token')));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    alert('Nastąpiło wylogowanie z konta.');
  };

  return { isAuthenticated, logout };
}
