// hooks/useAuthRedirect.js
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthRedirect(setIsAuthenticated) {
  const navigate = useNavigate();
  const alerted = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuth = Boolean(token);
    setIsAuthenticated(isAuth);

    if (!isAuth && !alerted.current) {
      alerted.current = true;
      alert('Zaloguj się, aby kontynuować zakup biletu.');
      navigate('/Login', { replace: true });
    }
  }, [navigate, setIsAuthenticated]);
}
