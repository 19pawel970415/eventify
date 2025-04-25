import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [msg, setMsg] = useState('Ładuję...');

  useEffect(() => {
    fetch('/api/welcome')
      .then(res => res.text())
      .then(text => setMsg(text))
      .catch(() => setMsg('Błąd połączenia'));
  }, []);

  return (
    <div className="App">
      <h1>{msg}</h1>
    </div>
  );
}

export default App;