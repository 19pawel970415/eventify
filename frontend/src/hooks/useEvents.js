import { useState, useEffect } from 'react';

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(setEvents)
      .catch(err => setError(err));
  }, []);

  return { events, error };
}
