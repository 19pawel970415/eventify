import { useState, useEffect } from 'react';

function App() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8085/api/events/sample')
      .then(res => res.json())
      .then(data => {
        console.log('Odebrane dane:', data);
        setEvents(data);
      })
      .catch(() => setError('Błąd połączenia'));
  }, []);
  //bvhvbb

  if (error) {
    return <h1>{error}</h1>;
  }
  if (!events) {
    return <h1>Ładuję wydarzenia...</h1>;
  }

  return (
    <div className="App">
      <h1>Przykładowe wydarzenia</h1>
      <ul>
        {events.map(evt => (
          <li key={evt.id}>
            <strong>{evt.title}</strong> ({new Date(evt.eventDate).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
